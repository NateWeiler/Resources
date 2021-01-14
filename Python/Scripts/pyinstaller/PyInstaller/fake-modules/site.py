U
    ��_�K  �                   @   s`   d Z ddlmZmZ ddlmZ ddlmZ G dd� de�Z	G dd� de�Z
G d	d
� d
e�ZdS )a�  
Classes facilitating communication between PyInstaller and import hooks.

PyInstaller passes instances of classes defined by this module to corresponding
functions defined by external import hooks, which commonly modify the contents
of these instances before returning. PyInstaller then detects and converts these
modifications into appropriate operations on the current `PyiModuleGraph`
instance, thus modifying which modules will be frozen into the executable.
�   )�RuntimeModule�RuntimePackage)�TOC)�format_binaries_and_datasc                   @   sP   e Zd ZdZdd� Zedd� �Zedd� �Zdd	� Zd
d� Z	dd� Z
dd� ZdS )�PreSafeImportModuleAPIaR	  
    Metadata communicating changes made by the current **pre-safe import module
    hook** (i.e., hook run immediately _before_ a call to
    `ModuleGraph._safe_import_module()` recursively adding the hooked module,
    package, or C extension and all transitive imports thereof to the module
    graph) back to PyInstaller.

    Pre-safe import module hooks _must_ define a `pre_safe_import_module()`
    function accepting an instance of this class, whose attributes describe the
    subsequent `ModuleGraph._safe_import_module()` call creating the hooked
    module's graph node.

    Each pre-safe import module hook is run _only_ on the first attempt to
    create the hooked module's graph node and then subsequently ignored. If this
    hook successfully creates that graph node, the subsequent
    `ModuleGraph._safe_import_module()` call will observe this fact and silently
    return without attempting to recreate that graph node.

    Pre-safe import module hooks are typically used to create graph nodes for
    **runtime modules** (i.e., modules dynamically defined at runtime). Most
    modules are physically defined in external `.py`-suffixed scripts. Some
    modules, however, are dynamically defined at runtime (e.g., `six.moves`,
    dynamically defined by the physically defined `six.py` module). However,
    `ModuleGraph` only parses `import` statements residing in external scripts.
    `ModuleGraph` is _not_ a full-fledged, Turing-complete Python interpreter
    and hence has no means of parsing `import` statements performed by runtime
    modules existing only in-memory.

    'With great power comes great responsibility.'


    Attributes (Immutable)
    ----------------------------
    The following attributes are **immutable** (i.e., read-only). For
    safety, any attempts to change these attributes _will_ result in a
    raised exception:

    module_graph : PyiModuleGraph
        Current module graph.
    parent_package : Package
        Graph node for the package providing this module _or_ `None` if this
        module is a top-level module.

    Attributes (Mutable)
    -----------------------------
    The following attributes are editable.

    module_basename : str
        Unqualified name of the module to be imported (e.g., `text`).
    module_name : str
        Fully-qualified name of this module (e.g., `email.mime.text`).
    c                 C   s   || _ || _|| _|| _d S �N)�_module_graph�module_basename�module_name�_parent_package)�self�module_graphr	   r
   �parent_package� r   �G/storage/emulated/0/python/pyinstaller/PyInstaller/depend/imphookapi.py�__init__R   s    zPreSafeImportModuleAPI.__init__c                 C   s   | j S )zCurrent module graph�r   �r   r   r   r   r   [   s    z#PreSafeImportModuleAPI.module_graphc                 C   s   | j S )zParent Package of this node)r   r   r   r   r   r   `   s    z%PreSafeImportModuleAPI.parent_packagec                 C   s   | j �t|�� dS )a�  
        Add a graph node representing a non-package Python module with the
        passed name dynamically defined at runtime.

        Most modules are statically defined on-disk as standard Python files.
        Some modules, however, are dynamically defined in-memory at runtime
        (e.g., `gi.repository.Gst`, dynamically defined by the statically
        defined `gi.repository.__init__` module).

        This method adds a graph node representing such a runtime module. Since
        this module is _not_ a package, all attempts to import submodules from
        this module in `from`-style import statements (e.g., the `queue`
        submodule in `from six.moves import queue`) will be silently ignored. To
        circumvent this, simply call `add_runtime_package()` instead.

        Parameters
        ----------
        module_name : str
            Fully-qualified name of this module (e.g., `gi.repository.Gst`).

        Examples
        ----------
        This method is typically called by `pre_safe_import_module()` hooks:
        e.g.,

            def pre_safe_import_module(api):
                api.add_runtime_module(api.module_name)
        N)r   �
add_moduler   )r   r
   r   r   r   �add_runtime_modulef   s    z)PreSafeImportModuleAPI.add_runtime_modulec                 C   s   | j �t|�� dS )aR  
        Add a graph node representing a non-namespace Python package with the
        passed name dynamically defined at runtime.

        Most packages are statically defined on-disk as standard subdirectories
        containing `__init__.py` files. Some packages, however, are dynamically
        defined in-memory at runtime (e.g., `six.moves`, dynamically defined by
        the statically defined `six` module).

        This method adds a graph node representing such a runtime package. All
        attributes imported from this package in `from`-style import statements
        that are submodules of this package (e.g., the `queue` submodule in
        `from six.moves import queue`) will be imported rather than ignored.

        Parameters
        ----------
        package_name : str
            Fully-qualified name of this package (e.g., `six.moves`).

        Examples
        ----------
        This method is typically called by `pre_safe_import_module()` hooks:
        e.g.,

            def pre_safe_import_module(api):
                api.add_runtime_package(api.module_name)
        N)r   r   r   )r   �package_namer   r   r   �add_runtime_package�   s    z*PreSafeImportModuleAPI.add_runtime_packagec                 C   s   | j �||� dS )a�  
        Alias the source module to the target module with the passed names.

        This method ensures that the next call to findNode() given the target
        module name will resolve this alias. This includes importing and adding
        a graph node for the source module if needed as well as adding a
        reference from the target to the source module.

        Parameters
        ----------
        real_module_name : str
            Fully-qualified name of the **existing module** (i.e., the
            module being aliased).
        alias_module_name : str
            Fully-qualified name of the **non-existent module** (i.e.,
            the alias to be created).
        N)r   �alias_module)r   Zreal_module_nameZalias_module_namer   r   r   �add_alias_module�   s    z'PreSafeImportModuleAPI.add_alias_modulec                 C   s   | j �| j|� dS )a�  
        Modulegraph does a good job at simulating Python's, but it cannot
        handle packagepath `__path__` modifications packages make at runtime.

        Therefore there is a mechanism whereby you can register extra paths
        in this map for a package, and it will be honored.

        Parameters
        ----------
        directory : str
            Absolute or relative path of the directory to be appended to this
            package's `__path__` attribute.
        N)r   �append_package_pathr
   )r   �	directoryr   r   r   r   �   s    z*PreSafeImportModuleAPI.append_package_pathN)�__name__�
__module__�__qualname__�__doc__r   �propertyr   r   r   r   r   r   r   r   r   r   r      s   5	

! r   c                   @   s0   e Zd ZdZdd� Zedd� �Zedd� �ZdS )	�PreFindModulePathAPIa�  
    Metadata communicating changes made by the current **pre-find module
    path hook** (i.e., hook run immediately _before_ a call to
    `ModuleGraph._find_module_path()` finding the hooked module's absolute
    path) back to PyInstaller.

    Pre-find module path hooks _must_ define a `pre_find_module_path()`
    function accepting an instance of this class, whose attributes describe the
    subsequent `ModuleGraph._find_module_path()` call to be performed.

    Pre-find module path hooks are typically used to change the absolute
    path from which a module will be subsequently imported and thus frozen into
    the executable. To do so, hooks may overwrite the default `search_dirs` list
    of the absolute paths of all directories to be searched for that module:
    e.g.,

        def pre_find_module_path(api):
            api.search_dirs = ['/the/one/true/package/providing/this/module']

    Each pre-find module path hook is run _only_ on the first call to
    `ModuleGraph._find_module_path()` for the corresponding module.

    Attributes
    ----------
    The following attributes are **mutable** (i.e., modifiable). All changes to
    these attributes will be immediately respected by PyInstaller:

    search_dirs : list
        List of the absolute paths of all directories to be searched for this
        module (in order). Searching will halt at the first directory containing
        this module.

    Attributes (Immutable)
    ----------
    The following attributes are **immutable** (i.e., read-only). For safety,
    any attempts to change these attributes _will_ result in a raised exception:

    module_name : str
        Fully-qualified name of this module.
    module_graph : PyiModuleGraph
        Current module graph. For efficiency, this attribute is technically
        mutable. To preserve graph integrity, this attribute should nonetheless
        _never_ be modified. While read-only `PyiModuleGraph` methods (e.g.,
        `findNode()`) are safely callable from within pre-find module path
        hooks, methods modifying the graph are _not_. If graph modifications are
        required, consider an alternative type of hook (e.g., pre-import module
        hooks).
    c                 C   s   || _ || _|| _d S r   )�search_dirsr   �_module_name)r   r   r
   r"   r   r   r   r     s    zPreFindModulePathAPI.__init__c                 C   s   | j S )z&
        Current module graph
        r   r   r   r   r   r     s    z!PreFindModulePathAPI.module_graphc                 C   s   | j S )z6
        Fully-qualified name of this module.
        )r#   r   r   r   r   r
     s    z PreFindModulePathAPI.module_nameN)r   r   r   r   r   r    r   r
   r   r   r   r   r!   �   s   1
r!   c                   @   s�   e Zd ZdZdd� Zedd� �Zedd� �Zedd	� �Z ed
d� �Zedd� �Z	edd� �Z
edd� �Zedd� �Zdd� Zdd� Zdd� Zdd� ZdS )�PostGraphAPIa�  
    Metadata communicating changes made by the current **post-graph hook**
    (i.e., hook run for a specific module transitively imported by the current
    application _after_ the module graph of all `import` statements performed by
    this application has been constructed) back to PyInstaller.

    Post-graph hooks may optionally define a `post_graph()` function accepting
    an instance of this class, whose attributes describe the current state of
    the module graph and the hooked module's graph node.

    Attributes (Mutable)
    ----------
    The following attributes are **mutable** (i.e., modifiable). All changes to
    these attributes will be immediately respected by PyInstaller:

    module_graph : PyiModuleGraph
        Current module graph.
    module : Node
        Graph node for the currently hooked module.

    'With great power comes great responsibility.'

    Attributes (Immutable)
    ----------
    The following attributes are **immutable** (i.e., read-only). For safety,
    any attempts to change these attributes _will_ result in a raised exception:

    __name__ : str
        Fully-qualified name of this module (e.g., `six.moves.tkinter`).
    __file__ : str
        Absolute path of this module. If this module is:
        * A standard (rather than namespace) package, this is the absolute path
          of this package's directory.
        * A namespace (rather than standard) package, this is the abstract
          placeholder `-`. (Don't ask. Don't tell.)
        * A non-package module or C extension, this is the absolute path of the
          corresponding file.
    __path__ : list
        List of the absolute paths of all directories comprising this package
        if this module is a package _or_ `None` otherwise. If this module is a
        standard (rather than namespace) package, this list contains only the
        absolute path of this package's directory.
    co : code
        Code object compiled from the contents of `__file__` (e.g., via the
        `compile()` builtin).

    Attributes (Private)
    ----------
    The following attributes are technically mutable but private, and hence
    should _never_ be externally accessed or modified by hooks. Call the
    corresponding public methods instead:

    _added_datas : list
        List of the `(name, path)` 2-tuples or TOC objects of all
        external data files required by the current hook, defaulting to the
        empty list. This is equivalent to the global `datas` hook attribute.
    _added_imports : list
        List of the fully-qualified names of all modules imported by the current
        hook, defaulting to the empty list. This is equivalent to the global
        `hiddenimports` hook attribute.
    _added_binaries : list
        List of the `(name, path)` 2-tuples or TOC objects of all
        external C extensions imported by the current hook, defaulting to the
        empty list. This is equivalent to the global
        `binaries` hook attribute.
    c                 C   st   || _ |�|�| _| jd k	s t�|| _| jj| _| jj| _| jj	d k	rRt
| jj	�nd | _g | _g | _g | _g | _d S r   )r   �findNode�module�AssertionError�	___name__�filename�	___file__�code�_co�packagepath�tuple�	___path__�_added_binaries�_added_datas�_added_imports�_deleted_imports)r   r
   r   r   r   r   r   b  s    


��zPostGraphAPI.__init__c                 C   s   | j S )z6
        Absolute path of this module's file.
        )r*   r   r   r   r   �__file__}  s    zPostGraphAPI.__file__c                 C   s   | j S )a'  
        List of the absolute paths of all directories comprising this package
        if this module is a package _or_ `None` otherwise. If this module is a
        standard (rather than namespace) package, this list contains only the
        absolute path of this package's directory.
        )r/   r   r   r   r   �__path__�  s    zPostGraphAPI.__path__c                 C   s   | j S )zR
        Fully-qualified name of this module (e.g., `six.moves.tkinter`).
        �r(   r   r   r   r   r   �  s    zPostGraphAPI.__name__c                 C   s   | j S )zs
        Code object compiled from the contents of `__file__` (e.g., via the
        `compile()` builtin).
        )r,   r   r   r   r   �co�  s    zPostGraphAPI.coc                 C   s   | j S )z�
        Fully-qualified name of this module (e.g., `six.moves.tkinter`).

        **This property has been deprecated by the `__name__` property.**
        r6   r   r   r   r   �name�  s    zPostGraphAPI.namec                 C   s   | j S )zv
        Current module graph.

        **This property has been deprecated by the `module_graph` property.**
        )r   r   r   r   r   �graph�  s    zPostGraphAPI.graphc                 C   s   | j S )z�
        Graph node for the currently hooked module.

        **This property has been deprecated by the `module` property.**
        )r&   r   r   r   r   �node�  s    zPostGraphAPI.nodec                 C   s   | j j| jd�S )zZ
        List of the graph nodes of all modules directly imported by this module.
        )�start)r   �flattenr&   r   r   r   r   �imports�  s    zPostGraphAPI.importsc                 G   s   | j �|� dS )a
  
        Add all Python modules whose fully-qualified names are in the passed
        list as "hidden imports" upon which the current module depends.

        This is equivalent to appending such names to the hook-specific
        `hiddenimports` attribute.
        N)r2   �extend�r   �module_namesr   r   r   �add_imports�  s    	zPostGraphAPI.add_importsc                 G   s   | j �|� dS )a  
        Remove the named fully-qualified modules from the set of
        imports (either hidden or visible) upon which the current
        module depends.

        This is equivalent to appending such names to the hook-specific
        `excludedimports` attribute.

        N)r3   r>   r?   r   r   r   �del_imports�  s    
zPostGraphAPI.del_importsc                 C   s6   t |t�r"| j�dd� |D �� n| j�t|�� dS )aI  
        Add all external dynamic libraries in the passed list of
        `(name, path)` 2-tuples as dependencies of the current module.
        This is equivalent to adding to the global `binaries` hook
        attribute.

        For convenience, the `list_of_tuples` may also be a single TOC
        or TREE instance.
        c                 s   s   | ]}|d d� V  qd S �Nr   r   ��.0�ir   r   r   �	<genexpr>�  s     z,PostGraphAPI.add_binaries.<locals>.<genexpr>N)�
isinstancer   r0   r>   r   �r   Zlist_of_tuplesr   r   r   �add_binaries�  s    

zPostGraphAPI.add_binariesc                 C   s6   t |t�r"| j�dd� |D �� n| j�t|�� dS )a7  
        Add all external data files in the passed list of `(name,
        path)` 2-tuples as dependencies of the current module. This is
        equivalent to adding to the global `datas` hook attribute.

        For convenience, the `list_of_tuples` may also be a single TOC
        or TREE instance.
        c                 s   s   | ]}|d d� V  qd S rC   r   rD   r   r   r   rG   �  s     z)PostGraphAPI.add_datas.<locals>.<genexpr>N)rH   r   r1   r>   r   rI   r   r   r   �	add_datas�  s    	
zPostGraphAPI.add_datasN)r   r   r   r   r   r    r4   r5   r7   r8   r9   r:   r=   rA   rB   rJ   rK   r   r   r   r   r$     s,   C

	





r$   N)r   �lib.modulegraph.modulegraphr   r   �building.datastructr   �building.utilsr   �objectr   r!   r$   r   r   r   r   �<module>   s   
 4O