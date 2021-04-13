#
# Makefile
#

MAKEAPP_SCRIPT = utils/pygapp/makeapp.py
MAKELEVEL_SCRIPT = utils/pygapp/makelevel.py

BLENDER_BIN = /usr/bin/blender

DATA_DIR = media

# Variables that define where things are found
LEVELS_SRC_DIR = rawdata
LEVELS_OUT_DIR = $(DATA_DIR)/levels

APPS_SRC_DIR = rawdata
APPS_OUT_DIR = $(DATA_DIR)/appearances

TILES_SRC_DIR = rawdata
TILES_OUT_DIR = $(DATA_DIR)/tiles

RENDER_IMAGE = \
   rm -fR output && \
   $(BLENDER_BIN) $(1) -P $(MAKEAPP_SCRIPT) $(BLENDER_ARGS) --camera=$(3) && \
   cp output/Idle/south/frames.png $(2)

# The arguments to pass to the blender rendering script
BLENDER_ARGS = --osa=5

# The arguments to pass to the blender script when rendering a tile
# from above (normal state) and below.
TILE_ARGS = --pad=0 --object=Lamp --rot=30,25,320 --energy=1.3
TILE_BELOW_ARGS = --object=Camera --rot=110,0,0

# The levels (blender files found under "rawdata")
LEVELS = entrancelvl

# Appearances
APPS = wizard torch chest mushrooms bookshelf bookshelf2 alchemy fire \
       dust flame stars wraith fireball plant_scrub plant_scrub2 door \
       doorway niche_statue blob naga

TILES = brickwall brickwall2 brickwall3 brickwall4 brickwall5 \
	bridge bridge2 column bridge3 brickwall6 bridge4 brickwall7 brickwall8 \
	ladder ladderw stalagmite brickwall3_moss brickwall3_moss2 \
	brickwall3_moss3 brickwall_moss brickwall2_moss brickwall4_moss \
	brickwall5_moss stonewall stonewall2 stonewall3 stonewall4 \
	stonewall5 stonewall6

# Useful macros
make_targets = $(patsubst %,$($(1)_OUT_DIR)/%/definition.xml,$($(1)))
make_tile_targets = $(patsubst %,$(TILES_OUT_DIR)/%.png,$(TILES))
make_level_targets = $(patsubst %,$(LEVELS_OUT_DIR)/%.xml,$(LEVELS))

TARGETS = $(call make_targets,APPS) \
	  $(call make_tile_targets) \
          $(call make_level_targets)

#          media/images/bottle-front.png \
#          media/images/bottle-back.png \
#          media/images/bottle-liquid.png \
#          media/images/bottle2-front.png \
#          media/images/bottle2-back.png \
#          media/images/bottle2-liquid.png

#	 $(call make_targets,LEVELS) \
#	  $(call make_tile_btm_targets)

all: $(TARGETS)

#clean:
#	for i in $(LEVELS); do \
#		rm -f $(LEVELS_OUT_DIR)/$$i/* ; \
#	done
#	rm -f $(LIBS_OUT_DIR)

$(LEVELS_OUT_DIR)/%.xml: $(LEVELS_SRC_DIR)/%.blend
	@echo '###' Building $*
	rm -fR output
	$(BLENDER_BIN) $(PWD)/$^ -P $(MAKELEVEL_SCRIPT)

	mv output/level.xml $(LEVELS_OUT_DIR)/$*.xml

$(APPS_OUT_DIR)/%/definition.xml: $(APPS_SRC_DIR)/%.blend
	@echo '###' Building $*
	rm -fR output
	$(BLENDER_BIN) $(PWD)/$^ -P $(MAKEAPP_SCRIPT) $(BLENDER_ARGS)
	rm -fR $(APPS_OUT_DIR)/$*
	mv output/ $(APPS_OUT_DIR)/$*

# Render the tile in the "normal" position
$(TILES_OUT_DIR)/%.png: $(TILES_SRC_DIR)/%.blend
	@echo '###' Building $*
	rm -fR output
	$(BLENDER_BIN) $(PWD)/$^ -P $(MAKEAPP_SCRIPT) $(TILE_ARGS) $(BLENDER_ARGS)
	cp output/Idle/south/frames.png $(TILES_OUT_DIR)/$*.png

# Render the tile while looking from below
$(TILES_OUT_DIR)/%-btm.png: $(TILES_SRC_DIR)/%.blend
	@echo '###' Building $*
	rm -fR output
	$(BLENDER_BIN) $(PWD)/$^ -P $(MAKEAPP_SCRIPT) $(TILE_ARGS) $(TILE_BELOW_ARGS) $(BLENDER_ARGS)
	cp output/Idle/south/frames.png $(TILES_OUT_DIR)/$*-btm.png

#media/images/bottle-front.png: rawdata/bottle.blend
#	$(call RENDER_IMAGE,"$(PWD)/$^",$@,CameraFront)
#
#media/images/bottle-back.png: rawdata/bottle.blend
#	$(call RENDER_IMAGE,"$(PWD)/$^",$@,CameraBack)
#
#media/images/bottle-liquid.png: rawdata/bottle.blend
#	$(call RENDER_IMAGE,"$(PWD)/$^",$@,CameraLiquid)
#
#media/images/bottle2-front.png: rawdata/bottle2.blend
#	$(call RENDER_IMAGE,"$(PWD)/$^",$@,CameraFront)
#
#media/images/bottle2-back.png: rawdata/bottle2.blend
#	$(call RENDER_IMAGE,"$(PWD)/$^",$@,CameraBack)
#
#media/images/bottle2-liquid.png: rawdata/bottle2.blend
#	$(call RENDER_IMAGE,"$(PWD)/$^",$@,CameraLiquid)

