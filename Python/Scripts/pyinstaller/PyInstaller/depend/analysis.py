U
    ��_�n  �                   @   sd  d dl Z d dlZd dlZd dlZd dlZd dlZd dlZd dlZd dlZd dl	m
Z
 ddlmZ ddlmZmZmZmZmZmZ ddlmZ ddlmZ ddlmZ dd	lmZmZ dd
lmZ er�ddlmZm Z  e�!e"�Z#dd� Z$d+dd�Z%d,dd�Z&dd� Z'dd� Z(d-dd�Z)dd� Z*dd� Z+dd� Z,dd � Z-d.d!d"�Z.d#d$� Z/d%d&� Z0d/d'd(�Z1d)d*� Z2dS )0�    N��CONF�   )�compat)�	is_darwin�is_win�EXTENSION_SUFFIXES�	open_file�is_py37�	is_cygwin)�dylib)�match_binding_redirect)�misc)�load_py_data_struct�save_py_data_struct)�log)�winmanifest�winresourcec                 C   s   ||krt �d| � dS dS )z.
    rebuild is required if values differ
    �Building because %s changedTF)�logger�info)�attr�old�new�
last_build� r   �D/storage/emulated/0/python/pyinstaller/PyInstaller/building/utils.py�_check_guts_eq1   s    r   c                 C   sh   |D ]^\}}}t �|�|kr.t�d|�  dS |rt �|dd� �|krt�d|dd� �  dS qdS )z�
    rebuild is required if mtimes of files listed in old toc are newer
    than last_build

    if pyc=1, check for .py files, too

    Use this for calculated/analysed values read from cache.
    r   TN�����F)r   �mtimer   r   )r   r   �tocr   �pyc�nm�fnm�typr   r   r   �_check_guts_toc_mtime;   s    	r%   c                 C   s    t | |||�pt| ||||d�S )z�
    rebuild is required if either toc content changed or mtimes of
    files listed in old toc are newer than last_build

    if pyc=1, check for .py files, too

    Use this for input parameters.
    )r!   )r   r%   )r   r   r    r   r!   r   r   r   �_check_guts_tocN   s    	�r&   c                 C   s�   ddl m} |� }| D ]�\}}}|dkr�|�dtj�}tj�|�d tkr�tj�|�}d|ksbt	�|tj�|�t
|�d�  }n4|dkr�tj�|�d }tj�|�d |ks�|| }|�|||f� q|S )zK
    Returns a new TOC with proper library suffix for EXTENSION items.
    �   )�TOC�	EXTENSION�.NZ
DEPENDENCY)�
datastructr(   �replace�os�sep�path�splitextr   �basename�AssertionError�len�append)r    r(   �new_tocZinmr#   r$   �	base_nameZbinextr   r   r   �add_suffix_to_extensions]   s    r7   c                 C   sJ   d}|D ]<}| j D ]0}t||�rt�d|j|j|j� |j|_d}qq|S )z�
    Apply the binding redirects specified by 'redirects' to the dependent assemblies
    of 'manifest'.

    :param manifest:
    :type manifest:
    :param redirects:
    :type redirects:
    :return:
    :rtype:
    FzRedirecting %s version %s -> %sT)�dependentAssembliesr   r   r   �name�version�
newVersion)�manifest�	redirects�redirectingZbinding�depr   r   r   �applyRedirects~   s    

  �r@   Fc                 C   s�  ddl m} |s |s ts ts | S |dk	r4d|kr4| S |r>d}nd}|pHg }|oltsVtoltj�tj�| ��|k}dt	j
d t	j
d	 f }t�� d }tj�|d
 d||||f �}tj�|�s�t�|� tj�|d�}	tj�|	��r"zt|	�}
W n0 tk
�r } zt�d� � W 5 d}~X Y nX ni }
|�r:tj�|�}ntj�tj�| ��}|�dg �}t| |�}tj�||�}d}||
k�r�||
| k�r�t�|� nt�r�t�||� |S | �� �d��rZt�� }| |_t| d��}|�|� � � W 5 Q R X |�dd��rB|j!�rt�"dtj�| �� d|_!|j#D ]}|j$dk�r(d|_!�q(t%||� |�&|� |S |�r�|�rtt'| ddd�} d}|d dk�r�tj$dk�r�d}d}|�d��r�tj�|d |�}||d|g}n&|�r�g }t�r�dg}dg| |g }tj�tj�(|���st�tj�(|�� t)�*| |� t+td��rTzt�,|d� W n t-k
�rR   Y nX t�.|d � tj�/| �� �d	 d!k�rzzt�0tj�1|��}W nR t2j3j4k
�r� } z,|j5d t2j6k�r�nt�4tj�1|�� � W 5 d}~X Y �n�X tj7|k�rzt8|tj7 ��rz|tj7 D �]l}|tj7 | D �]T}zHt�� }d�|t9tj7�t9|�t9|�g�|_|�|tj7 | | d� W nB tk
�r� } z"t�4d"||� tj4d#|d	d$� W 5 d}~X Y n�X |�dd�}|�r|j!�r�t�"d%tj�| �� d|_!|j#D ]}|j$dk�r�d|_!�q�t%||�}|�s|�rz|�:tj�1|�|g|g� W n8 tk
�rp } zt�4tj�1|�� � W 5 d}~X Y nX �q�q
|�r�t�"d&d'�|� � t;j<|�  ||
|< t=|	|
� t�r�t�||� |S )(a  
    Cache prevents preprocessing binary files again and again.

    'dist_nm'  Filename relative to dist directory. We need it on Mac
               to determine level of paths for @loader_path like
               '@loader_path/../../' for qt4 plugins.
    r   r   N�:TFzpy%d%sr   r'   �cachedirzbincache%d%d_%s_%sz	index.datzEpyinstaller bincache may be corrupted; use pyinstaller --clean to fix�binding_redirectsz	.manifest�rb�win_private_assembliesz!Changing %s into private assemblyz!Microsoft.Windows.Common-Controls)�strip�upxz--best�hasUPX)�   �ntz--lzmarG   �upx_dirz-qz-SrF   �chflagsi�  )z.pydz.dllz%Cannot parse manifest resource %s, %szFrom file %s)�exc_infoz#Changing %s into a private assemblyzExecuting - � )>�configr   r   r   r   r-   r/   �normcaser1   �sys�version_info�platform�architecture�join�exists�makedirsr   �	Exceptionr   �warn�get�cacheDigest�remover   �mac_set_relative_dylib_deps�lower�endswithr   �Manifest�filename�open�parse_string�read�publicKeyTokenr   r8   r9   r@   �writeprettyxml�
checkCache�dirname�shutil�copy�hasattrrL   �OSError�chmodr0   �GetManifestResources�abspathr   �
pywintypes�error�args�ERROR_BAD_EXE_FORMAT�RT_MANIFESTr3   �strZupdate_resourcesr   �exec_commandr   )r#   rF   rG   �upx_excludeZdist_nmr   �pyver�archrB   ZcacheindexfnZcache_index�eZbasenmr=   �digestZ
cachedfile�cmdr<   �fr?   ZbestoptZupx_executableZstrip_options�resr9   �language�excZprivater>   r   r   r   rg   �   s   �







�� �"
�


�

rg   c              	      sl   t �� }t| d��(� t� fdd�d�D ]}|�|� q&W 5 Q R X |r\t|��d�}|�|� t|�� �}|S )NrD   c                      s
   � � d�S )Ni @  )rd   r   �r}   r   r   �<lambda>g  �    zcacheDigest.<locals>.<lambda>r�   zutf-8)	�hashlib�md5rb   �iter�updateru   �encode�	bytearrayr{   )r#   r=   Zhasher�chunkr{   r   r�   r   r[   d  s    
r[   c                 C   sx   ddl m} d}|d �| �r8t�d| |d � |d7 }|d �| �r`t�d| |d � |d7 }|rttd	|d
  ��dS )z�
    Check that path does not overlap with WORKPATH or SPECPATH (i.e.
    WORKPATH and SPECPATH may not start with path, which could be
    caused by a faulty hand-edited specfile)

    Raise SystemExit if there is overlap, return True otherwise
    r   r   r   �workpathz;Specfile error: The output path "%s" contains WORKPATH (%s)r'   �specpathz;Specfile error: The output path "%s" contains SPECPATH (%s)z\Error: Please edit/recreate the specfile (%s) and set a different output name (e.g. "dist").�specT)rO   r   �
startswithr   rq   �
SystemExit)r/   r   Zspecerrr   r   r   �_check_path_overlapp  s&     � ��r�   c                 C   sZ   t | �rVtj�| �s tj�| �rLzt�| � W n tk
rJ   t| � Y nX t�| � dS )z@
    Create a clean directory from the given directory name
    N)	r�   r-   r/   �isdir�isfiler\   rl   �_rmtreerW   )r/   r   r   r   �_make_clean_directory�  s    r�   c                 C   s�   ddl m} |d rd}n&tj�� r4t�d|  �}ntd|  ��|�� �	� dkrx|d s`t
d� t�d| � t�| � ntd	��d
S )zq
    Remove directory and all its contents, but only after user confirmation,
    or if the -y option is set
    r   r   �	noconfirm�yzXWARNING: The output directory "%s" and ALL ITS CONTENTS will be REMOVED! Continue? (y/N)z�Error: The output directory "%s" is not empty. Please remove all its contents or use the -y option (remove output directory without confirmation).zSOn your own risk, you can use the option `--noconfirm` to get rid of this question.zRemoving dir %szUser abortedN)rO   r   rQ   �stdout�isattyr   �stdin_inputr�   rF   r^   �printr   r   ri   �rmtree)r/   r   �choicer   r   r   r�   �  s     
��r�   c                 C   s�  t � }| D �]v\}}|s*tdtj|f ��|rHtj�|�sHtj�||�}tj�|�}tj�|�rh|g}n
t	�	|�}|s�d| }|�
d�r�|d7 }t|��|D ]�}tj�|�r�|�tj�tj�|tj�|���tj�|�f� q�tj�|�r�t�|�D ]�\}}	}
|�|��st�tj�tj�|tj�||���}|
D ]J}tj�||�}tj�|��r2|�tj�tj�||��tj�|�f� �q2q�q�q
|S )a�  
    Convert the passed list of hook-style 2-tuples into a returned set of
    `TOC`-style 2-tuples.

    Elements of the passed list are 2-tuples `(source_dir_or_glob, target_dir)`.
    Elements of the returned set are 2-tuples `(target_file, source_file)`.
    For backwards compatibility, the order of elements in the former tuples are
    the reverse of the order of elements in the latter tuples!

    Parameters
    ----------
    binaries_or_datas : list
        List of hook-style 2-tuples (e.g., the top-level `binaries` and `datas`
        attributes defined by hooks) whose:
        * The first element is either:
          * A glob matching only the absolute or relative paths of source
            non-Python data files.
          * The absolute or relative path of a source directory containing only
            source non-Python data files.
        * The second element ist he relative path of the target directory
          into which these source files will be recursively copied.

        If the optional `workingdir` parameter is passed, source paths may be
        either absolute or relative; else, source paths _must_ be absolute.
    workingdir : str
        Optional absolute path of the directory to which all relative source
        paths in the `binaries_or_datas` parameter will be prepended by (and
        hence converted into absolute paths) _or_ `None` if these paths are to
        be preserved as relative. Defaults to `None`.

    Returns
    ----------
    set
        Set of `TOC`-style 2-tuples whose:
        * First element is the absolute or relative path of a target file.
        * Second element is the absolute or relative path of the corresponding
          source file to be copied to this target file.
    zbEmpty DEST not allowed when adding binary and data files. Maybe you want to used %r.
Caused by %r.z6Unable to find "%s" when adding binary and data files.z
pyconfig.ha�  This would mean your Python installation doesn't
come with proper library files. This usually happens by missing development
package, or unsuitable build parameters of Python installation.
* On Debian/Ubuntu, you would need to install Python development packages
  * apt-get install python3-dev
  * apt-get install python-dev
* If you're building Python by yourself, please rebuild your Python with
`--enable-shared` (or, `--enable-framework` on Darwin)
)�setr�   r-   �curdirr/   �isabsrU   �normpathr�   �globr_   �addr1   r�   �walkr�   r2   �relpath)Zbinaries_or_datas�
workingdirZ	toc_datasZsrc_root_path_or_globZtrg_root_dirZsrc_root_paths�msgZsrc_root_pathZsrc_dirZsrc_subdir_basenamesZsrc_file_basenamesZtrg_dirZsrc_file_basenameZsrc_filer   r   r   �format_binaries_and_datas�  sb    '� �
�
	 
�
��
��
�r�   c           
   	   C   s�   t j�|�}t j�|��d�r*t j�|�}t j�|�dkrFt j�|�}t�|�}| �d�\}}} t|d�rz|�	| �\}}n
|�
| �}t�d|� |r�t|d�r�|�| �S t|d��}|�� }	W 5 Q R X t|	|d�S d S )	Nz__init__.py�__pycache__r*   �find_loader�Compiling %s�get_coderD   �exec)r-   r/   rh   r1   r�   �pkgutil�get_importer�
rpartitionrk   r�   �find_moduler   �debugr�   r	   rd   �compile)
�modnamera   �	path_item�importer�package�_�loader�portionsr}   �sourcer   r   r   �
_load_code3  s     



r�   c              
   C   s�   zV|dkr(t �d| � d}t||d�W S t �d|� t| |�}|sNtd| ��|W S W n8 tk
r� } ztd|� t|j� � W 5 d}~X Y nX dS )	z�
    Get the code-object for a module.

    This is a extra-simple version for compiling a module. It's
    not worth spending more effort here, as it is only used in the
    rare case if outXX-Analysis.toc exists, but outXX-PYZ.toc does
    not.
    )�-NzCompiling namespace package %sz#
r�   r�   zModule file %s is missingzSyntax error in N)r   r�   r�   r�   �
ValueError�SyntaxErrorr�   rr   )r�   ra   �txt�corz   r   r   r   �get_code_objectW  s    




r�   c                    s(  t jtd  }tdd� |D �tdd�}�d krhtj�| j�}|D ]"}|�|�r@|t|�d � � qhq@| S t	| �� t
� �fdd�| jD ��}t| d�r�| j|�d�S t| d	�r� | j| j| j| j| j| j|| j| j�| j| j| j| j| j�S � | j| j| j| j| j|| j| j�| j| j| j| j| j�S d S )
N�pathexc                 s   s   | ]}t j�|d �V  qdS )� N)r-   r/   rU   )�.0r}   r   r   r   �	<genexpr>z  s     z&strip_paths_in_code.<locals>.<genexpr>T)�key�reversec                 3   s&   | ]}t |� �rt|��n|V  qd S )N)�
isinstance�strip_paths_in_code)r�   Zconst_co��	code_func�new_filenamer   r   r�   �  s   ��r,   )�	co_consts�co_filename�co_kwonlyargcount)rQ   r/   r   �sortedr3   r-   r�   r�   r�   �type�tupler�   rk   r,   �co_argcountr�   �
co_nlocals�co_stacksize�co_flags�co_code�co_names�co_varnames�co_name�co_firstlineno�	co_lnotab�co_freevars�co_cellvars)r�   r�   �replace_paths�original_filenamer}   �constsr   r�   r   r�   u  sZ     �
�

       �       �r�   c                 C   s�   | dd� t jks,td�t j| dd� ���d\}}trtt�d| d�\}|d@ rlt�d|dA �| dd�< | S d	\}}d
}| d|� | | |d�  S )a  
    Reset the timestamp from a .pyc-file header to a fixed value.

    This enables deterministic builds without having to set pyinstaller
    source metadata (mtime) since that changes the pyc-file contents.

    _buf_ must at least contain the full pyc-file header.
    N�   zExpected pyc magic {}, got {})r�   �   z>Ir'   r   r�   )r�   �   s   pyi0)r   �BYTECODE_MAGICr2   �formatr
   �struct�unpack_from�pack)�buf�start�end�flags�tsr   r   r   �fake_pyc_timestamp�  s    	�r�   )r   )r   )FFNN)N)N)3r�   r�   r-   Zos.pathr�   rS   ri   rQ   r�   ZPyInstaller.configr   r�   r   r   r   r   r	   r
   r   �dependr   �depend.bindependr   �utilsr   �
utils.miscr   r   r   �logging�utils.win32r   r   �	getLogger�__name__r   r   r%   r&   r7   r@   rg   r[   r�   r�   r�   r�   r�   r�   r�   r�   r   r   r   r   �<module>   sF    



!
 P$
x$
+