# player.py

###########
# Imports #
###########

import fsm

#############
# Constants #
#############

JUMPING_SPEED = 330
SLOW_DOWN_ACCEL = 20
WALK_SPEED = 180

CLIMBING_SPEED = 100

FAST_FALL_THRESHOLD = 500

# How far into the tile a character needs to stand to properly climb a 
# ladder from the bottom.
LADDER_X_OFFSET = 38

# The offset to add to the character's position when going from the
# ClimbDone animation to Crouch (or the other way around), when facing 
# east.
LADDER_DONE_OFFSET = (66, -120)

###########
# Classes #
###########

class PlayerFSM(fsm.StateMachine):
#    # Whether the character is falling, and moving in the upwards
#    # direction (on the screen).
#    fallingUp = False
#    # Whether the character is falling in the downwards direction
#    fallingDown = False
    # ...
    castSpellTimer = None
    castSpell = None
    # The list of spells to cast
    spellQueue = None
    # The player input control
    gameInput = None

    def __init__(this, gameInput):
        fsm.StateMachine.__init__(this)
        this.gameInput = gameInput
        this.spellQueue = []
        this.castSpellTimer = fsm.Timer()

    def queue_spell(this, spell):
        this.spellQueue.insert(0, spell)
        #if (this.state == "idle"):
        #    this.castSpellTimer.start(0.2)
        #    this.castSpell = spell

    @property
    def gravity(this):
        return (not this.state.startswith("climb"))

    ########
    # Idle #
    ########

    @fsm.state
    def idle_state():
        def start(this):
            this.obj.app.set_action("Idle")
            this.obj.vel_x = 0
        def check(this):
            if (not this.obj.supported):
                return "jump_fall"
            elif (len(this.spellQueue) > 0):
                return "start_cast"
            elif (this.gameInput.left): 
                if (this.obj.app.direction == "east"):
                    return "turn_left"
                return "walk_left"
            elif (this.gameInput.right): 
                if (this.obj.app.direction == "west"):
                    return "turn_right"
                return "walk_right"
            elif (this.gameInput.down): 
                return "crouch_down"
            elif (this.gameInput.jump):
                return "jump_up"
            elif (this.gameInput.up and this.obj.get_nearby_up_ladder()):
                return "climb_mount_bottom"
        return (start, check)

    #############
    # Crouching #
    #############

    @fsm.state
    def crouch_down_state():
        def start(this):
            # Start playing the crouch animation
            this.obj.app.set_action("Crouch")
        def check(this):
            if (this.obj.is_action_done()): return "crouch_hold"
        return (start, check)

    @fsm.state
    def crouch_hold_state():
        def start(this):
            pass
        def check(this):
            if (not this.gameInput.down): return "crouch_up"
            elif (this.obj.get_nearby_down_ladder()):
                return "climb_mount_top"
        return (start, check)

    @fsm.state
    def crouch_up_state():
        def start(this):
            # Play crouch animation backwards
            this.obj.app.set_action("Crouch", -1)
        def check(this):
            if (this.obj.is_action_done()): return "idle"
        return (start, check)

    ############
    # Climbing #
    ############

    @fsm.state
    def climb_mount_top_state():
        def start(this):
            char = this.obj
            (w, h) = char.level.tileSet.tileSize
            # Move the character onto the ladder and start the climb down
            # animation.
            xp = char.gridPos[0]*w + LADDER_X_OFFSET
            char.pos = (xp-char.get_facing()*LADDER_DONE_OFFSET[0], 
                        char.pos[1]-LADDER_DONE_OFFSET[1]-4)
            char.app.set_action("ClimbDone", -1)
        def check(this):
            if (this.obj.is_action_done()): return "climb_down"
        return (start, check)

    @fsm.state
    def climb_mount_bottom_state():
        def start(this):
            char = this.obj
            (w, h) = char.level.tileSet.tileSize
            char.pos = (char.gridPos[0]*w + LADDER_X_OFFSET, 
                        char.pos[1])
            char.app.set_action("ClimbStart")
        def check(this):
            if (this.obj.is_action_done()): return "climb_up"
        return (start, check)

    @fsm.state
    def climb_up_state():
        def start(this):
            this.obj.vel_y = -CLIMBING_SPEED
            this.obj.app.set_action("Climb")
            this.obj.app.frameDir = 1
        def check(this):
            if (not this.gameInput.up): 
                return "climb_idle"
            char = this.obj
            h = 2*char.level.tileSet.tileSize[1]-6
            (x, y) = char.pos
            tile = char.level.get_tile_at((x, y-h))[0]
            if (tile.name == "nothing"):
                return "climb_dismount_top"
        return (start, check)

    @fsm.state
    def climb_down_state():
        def start(this):
            this.obj.vel_y = CLIMBING_SPEED
            this.obj.app.set_action("Climb")
            this.obj.app.frameDir = -1
        def check(this):
            if (not this.gameInput.down): 
                return "climb_idle"
            char = this.obj
            (x, y) = char.pos
            tile = char.level.get_tile_at((x, y+10))[0]
            if (tile.name == "nothing"):
                return "jump_fall"
            if (tile.name != "ladder"):
                return "climb_dismount_bottom"
        return (start, check)

    @fsm.state
    def climb_idle_state():
        def start(this):
            this.obj.vel_y = 0
            this.obj.app.frameDir = 0
        def check(this):
            if (this.gameInput.up): return "climb_up"
            elif (this.gameInput.down): return "climb_down"
        return (start, check)

    @fsm.state
    def climb_dismount_top_state():
        def start(this):
            this.obj.vel_y = 0
            this.obj.app.set_action("ClimbDone")
        def check(this):
            if (this.obj.is_action_done()):
                return "crouch_up"
        def end(this):
            char = this.obj
            xdir = char.get_facing()
            char.pos = (char.pos[0]+xdir*LADDER_DONE_OFFSET[0],
                        char.pos[1]+LADDER_DONE_OFFSET[1])
            #char.app.set_action("Crouch", -1)
        return (start, check, end)

    @fsm.state
    def climb_dismount_bottom_state():
        def start(this):
            this.obj.vel_y = 0
            this.obj.app.set_action("ClimbStart", -1)
        def check(this):
            if (this.obj.is_action_done()):
                return "idle"
        return (start, check)

    ###########
    # Walking #
    ###########

    @fsm.state
    def walk_left_state():
        def start(this):
            # Set vel_x to walking speed
            this.obj.vel_x = -WALK_SPEED
            this.obj.app.direction = "west"
            this.obj.app.set_action("Walk")
        def check(this):
            if (not this.obj.supported): return "jump_fall"
            elif (not this.gameInput.left): return "idle"
            elif (this.gameInput.jump): return "jump"
        return (start, check)

    @fsm.state
    def turn_right_state():
        def start(this):
            # Play right turn animation
            this.obj.app.set_action("TurnAround")
        def check(this):
            if (this.obj.is_action_done()): return "walk_right"
        return (start, check)

    @fsm.state
    def turn_left_state():
        def start(this):
            # Play left turn animation
            this.obj.app.set_action("TurnAround")
        def check(this):
            if (this.obj.is_action_done()): return "walk_left"
        return (start, check)

    @fsm.state
    def walk_right_state():
        def start(this):
            # Set vel_x to neg walking speed
            this.obj.vel_x = WALK_SPEED
            this.obj.app.direction = "east"
            this.obj.app.set_action("Walk")
        def check(this):
            if (not this.obj.supported): return "jump_fall"
            elif (not this.gameInput.right): return "idle"
            elif (this.gameInput.jump): return "jump"
        return (start, check)

    ###########
    # Jumping #
    ###########

    @fsm.state
    def jump_up_state():
        def start(this):
            this.obj.app.set_action("JumpUp")
        def check(this):
            if (this.obj.is_action_done()): return "jump_up_hold"
        return (start, check)

    @fsm.state
    def jump_up_hold_state():
        def start(this):
            this.obj.vel_y = -JUMPING_SPEED
        def check(this):
            if (this.obj.supported): 
                return "jump_up_land"
        return (start, check)

    @fsm.state
    def jump_up_land_state():
        def start(this):
            this.obj.app.set_action("JumpUp", -1)
        def check(this):
            if (this.obj.is_action_done()): 
                return "idle"
        return (start, check)

    @fsm.state
    def jump_state():
        def start(this):
            this.obj.app.set_action("Jump")
            this.obj.vel_x *= 1.5
            this.obj.vel_y = -JUMPING_SPEED/1.1
        def check(this):
            if (this.obj.supported): return "jump_land_run"
            elif (this.obj.vel_y > FAST_FALL_THRESHOLD): 
                return "jump_fall"
        return (start, check)

    @fsm.state
    def jump_land_run_state():
        def start(this):
            this.obj.vel_x = this.obj.get_facing()*100
            this.obj.app.set_action("JumpLandRun")
        def check(this):
            if (this.obj.is_action_done()): 
                return "idle"
        return (start, check)

    @fsm.state
    def jump_fall_state():
        def start(this):
            this.obj.app.set_action("JumpFall")
        def check(this):
            if (this.obj.supported): 
                return "jump_land"
        return (start, check)

    @fsm.state
    def jump_land_state():
        def start(this):
            this.obj.app.set_action("JumpLand")
        def check(this):
            if (this.obj.is_action_done()): 
                return "jump_land_hold"
        return (start, check)

    @fsm.state
    def jump_land_hold_state():
        def start(this):
            this.timer.start(0.2)
        def check(this):
            if (this.timer.timeout): 
                return "crouch_up"
        return (start, check)

    #################
    # Spell Casting #
    #################

    @fsm.state
    def start_cast_state():
        def start(this):
            pass
        def check(this):
            char = this.obj
            this.castSpell = this.spellQueue.pop()
            (x, y) = this.castSpell.target
            if (x > char.pos[0] and char.app.direction == "west"):
                # The character needs to face east first
                return "cast_turn_right"
            elif (x < char.pos[0] and char.app.direction == "east"):
                return "cast_turn_left"
            return "cast"
        return (start, check)

    @fsm.state
    def cast_turn_right_state():
        def start(this):
            # Play right turn animation
            this.obj.app.set_action("TurnAround")
        def check(this):
            if (this.obj.is_action_done()): 
                return "cast"
        def end(this):
            this.obj.app.direction = "east"
        return (start, check, end)

    @fsm.state
    def cast_turn_left_state():
        def start(this):
            # Play left turn animation
            this.obj.app.set_action("TurnAround")
        def check(this):
            if (this.obj.is_action_done()): 
                return "cast"
        def end(this):
            this.obj.app.direction = "west"
        return (start, check, end)

    @fsm.state
    def cast_state():
        def start(this):
            this.castSpellTimer.stop()
            this.obj.app.set_action("Cast", speed=2)
        def check(this):
            if (this.obj.is_action_done()):
                return "cast_hold"
        def end(this):
            pass
        return (start, check, end)

    @fsm.state
    def cast_hold_state():
        def start(this):
            this.castSpell.start_casting()
        def check(this):
            if (this.castSpell.done):
                if (len(this.spellQueue) > 0):
                    return "start_cast"
                return "cast_finish"
        def end(this):
            this.castSpell = None
        return (start, check)

    @fsm.state
    def cast_finish_state():
        def start(this):
            this.obj.app.set_action("Cast", -1)
        def check(this):
            if (this.obj.is_action_done()):
                return "idle"
        return (start, check)

