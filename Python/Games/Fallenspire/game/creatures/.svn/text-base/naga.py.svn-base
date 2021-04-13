# naga.py

###########
# Imports #
###########

import random

import fsm

#############
# Constants #
#############

###########
# Classes #
###########

class NagaFSM(fsm.StateMachine):

    crawlSpeed = 110
    turnAroundDist = 110

    ########
    # Idle #
    ########

    @fsm.state
    def idle_state():
        def start(this):
            this.obj.vel_x = 0
            this.obj.set_action("Idle")
        def check(this):
            if (this.obj.supported):
                r = random.random()
                if (r < 0.5):
                    return "growl"
                return "go_left"
        return (start, check)

    #################
    # Movement left #
    #################

    @fsm.state
    def go_left_state():
        def start(this):
            pass
        def check(this):
            if (this.obj.app.direction == "east"):
                # Turn left first
                return "turn_left"
            return "move_left"
        return (start, check)

    @fsm.state
    def move_left_state():
        def start(this):
            this.obj.set_action("Crawl", direction="west")
            this.timer.start(2)
            this.obj.vel_x = -this.crawlSpeed
        def check(this):
            if (this.timer.timeout):
                if (random.random() < 0.5): return "idle"
                return "turn_right"
        return (start, check)

    @fsm.state
    def turn_left_state():
        def start(this):
            this.obj.set_action("TurnAround")
            this.obj.vel_x = 0
        def check(this):
            if (this.obj.is_action_done()):
                return "move_left"
        def end(this):
            this.obj.move((-this.turnAroundDist, 0))
        return (start, check, end)

    ##################
    # Movement right #
    ##################

    @fsm.state
    def go_right_state():
        def start(this):
            pass
        def check(this):
            if (this.obj.app.direction == "west"):
                # Turn left first
                return "turn_right"
            return "move_right"
        return (start, check)

    @fsm.state
    def move_right_state():
        def start(this):
            this.obj.set_action("Crawl", direction="east")
            this.timer.start(2)
            this.obj.vel_x = this.crawlSpeed
        def check(this):
            if (this.timer.timeout):
                return "turn_left"
        return (start, check)

    @fsm.state
    def turn_right_state():
        def start(this):
            this.obj.set_action("TurnAround")
            this.obj.vel_x = 0
        def check(this):
            if (this.obj.is_action_done()):
                return "move_right"
        def end(this):
            this.obj.move((this.turnAroundDist, 0))
        return (start, check, end)

    ############
    # Growling #
    ############

    @fsm.state
    def growl_state():
        def start(this):
            this.obj.set_action("Breathe")
        def check(this):
            if (this.obj.is_action_done()):
                return "growl_hold"
        return (start, check)

    @fsm.state
    def growl_hold_state():
        def start(this):
            this.timer.start(0.2)
        def check(this):
            if (this.timer.timeout):
                return "growl_done"
        return (start, check)

    @fsm.state
    def growl_done_state():
        def start(this):
            this.obj.set_action("BreatheDone")
        def check(this):
            if (this.obj.is_action_done()):
                return "idle"
        return (start, check)

