# blob.py

###########
# Imports #
###########

import fsm

#############
# Constants #
#############

###########
# Classes #
###########

class BlobFSM(fsm.StateMachine):

    ########
    # Idle #
    ########

    @fsm.state
    def idle_state():
        def start(this):
            this.obj.set_action("Idle")
        def check(this):
            if (this.obj.supported):
                pass
        return (start, check)

    @fsm.state
    def move_left_state():
        def start(this):
            this.obj.set_action("Crawl")
        def check(this):
            pass
        return (start, check)

    @fsm.state
    def attack_state():
        def start(this):
            this.obj.set_action("Attack")
        def check(this):
            if (this.obj.is_action_done()): return "attack_hold"
        return (start, check)

    @fsm.state
    def attack_hold_state():
        def start(this):
            this.timer.start(0.1)
        def check(this):
            if (this.timer.timeout): return "attack_rev"
        return (start, check)

    @fsm.state
    def attack_rev_state():
        def start(this):
            this.obj.set_action("Attack", frameDir=-1)
        def check(this):
            return "attack"
        return (start, check)

