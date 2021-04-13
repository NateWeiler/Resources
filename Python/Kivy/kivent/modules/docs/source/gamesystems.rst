Game Systems
************
**Most of these Classes have cdefed functions that cannot be read by 
Sphinx. Read the source if you want to find out more about using them.**


Python GameSystems
==================

.. automodule:: kivent_core.systems.gamesystem

.. autoclass:: kivent_core.systems.gamesystem.GameSystem
    :members:

.. autoclass:: kivent_core.systems.gamesystem.Component
    :members:

Cython GameSystems
==================

.. automodule:: kivent_core.systems.staticmemgamesystem

.. autoclass:: kivent_core.systems.staticmemgamesystem.StaticMemGameSystem
    :members:

.. autoclass:: kivent_core.systems.staticmemgamesystem.MemComponent
    :members:

Aggregators
===========

The Aggregator classes make it easier to write the logic for a GameSystem's
update loop. Rather than having to fetch the components yourself from each 
GameSystem MemoryBlock, you can instead expend a little more memory and 
store an array of pointers to the appropriate components for your processing.

This expends a little more memory, and adds a layer of indirection but 
makes it significantly easier to write the update loop in cython. 

.. autoclass:: kivent_core.systems.staticmemgamesystem.ZonedAggregator
    :members:

.. autoclass:: kivent_core.systems.staticmemgamesystem.ComponentPointerAggregator
    :members:

Position Systems
================

.. autoclass:: kivent_core.systems.position_systems.PositionComponent2D
    :members:

.. autoclass:: kivent_core.systems.position_systems.PositionSystem2D
    :members:

Rotate Systems
==============

.. autoclass:: kivent_core.systems.rotate_systems.RotateComponent2D
    :members:

.. autoclass:: kivent_core.systems.rotate_systems.RotateSystem2D
    :members:

Scale Systems
=============

.. autoclass:: kivent_core.systems.scale_systems.ScaleComponent2D
    :members:

.. autoclass:: kivent_core.systems.scale_systems.ScaleSystem2D
    :members:

Color Systems
=============

.. autoclass:: kivent_core.systems.color_systems.ColorComponent
    :members:

.. autoclass:: kivent_core.systems.color_systems.ColorSystem
    :members:

Rendering Systems
=================

.. autoclass:: kivent_core.systems.renderers.RenderComponent   
    :members:

.. autoclass:: kivent_core.systems.renderers.Renderer
    :members:

.. autoclass:: kivent_core.systems.renderers.RotateRenderer
    :members:

.. autoclass:: kivent_core.systems.renderers.ColorRenderer
    :members:

.. autoclass:: kivent_core.systems.renderers.RotateColorRenderer
    :members:

.. autoclass:: kivent_core.systems.renderers.PolyRenderer
    :members:

.. autoclass:: kivent_core.systems.renderers.ColorPolyRenderer
    :members:

.. autoclass:: kivent_core.systems.renderers.ScaledPolyRenderer
    :members:

Controlling the Viewing Area
============================

.. autoclass:: kivent_core.systems.gameview.GameView
    :members:

.. autoclass:: kivent_core.systems.gamemap.GameMap
