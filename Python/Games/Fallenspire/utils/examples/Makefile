#
# Makefile
#

BLENDER_BIN = /usr/bin/blender

# The arguments to pass to the blender rendering script
BLENDER_ARGS = --osa=5

all: levels/map.xml

levels/map.xml: blender/map.blend
	@echo '###' Building level
	rm -fR output
	$(BLENDER_BIN) $(PWD)/blender/map.blend -P $(PWD)/../pygapp/makelevel.py
	mv output/level.xml levels/map.xml

