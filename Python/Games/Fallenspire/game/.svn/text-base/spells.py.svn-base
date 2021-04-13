# spells.py

###########
# Imports #
###########

import effects

###########
# Classes #
###########

class Spell(object):
    target = None
    done = False
    casting = False

    def __init__(this, caster, target):
        this.target = target
        this.caster = caster

    def start_casting(this):
        def done(*args):
            this.done = True
        this.casting = True

        # Get the position of the left hand (outstretched)
        char = this.caster
        (x, y) = char.app.get_track_pos("lhand")
        x += char.pos[0] + 4*char.get_facing()
        y += char.pos[1] - 3

        obj = effects.Lightning((x, y), this.target, 3, openend=True)
        obj.expires = 1
        obj.connect("removed", done)
        char.level.add_to_grid(obj, 0)

