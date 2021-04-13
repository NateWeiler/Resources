# fsm.py - Implements a basic finite state machine for simple AI control.
#
# Copyright (C) 2009, Peter Rogers
#
# This file is part of Fallen Spire.
#
# Fallen Spire is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Fallen Spire is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Fallen Spire.  If not, see <http://www.gnu.org/licenses/>.
#

###########
# Imports #
###########

import fsglobals

#############
# Functions #
#############

def state(func):
    args = func()
    return StateProperty(*args)
fsm_state = state

###########
# Classes #
###########

class Timer(object):
    nextTimeout = 0
    running = False
    timeout = False

    def __init__(this):
        pass

    def start(this, duration):
        this.running = True
        this.timeout = False
        this.nextTimeout = fsglobals.time()+duration

    def stop(this):
        this.running = False
        this.timeout = False

    def update(this):
        # Check if the timer has triggered
        if (this.running and fsglobals.time() > this.nextTimeout):
            this.timeout = True
            return True
        return False

class StateProperty(object):
    def __init__(this, *args):
        this.args = args

    def __get__(this, inst, type=None):
        return inst.get_state(this, this.args)

    def __set__(this, inst, value):
        raise AttributeError, "cannot assign a state variable"

class State(object):
    def __init__(this, obj, startFunc, checkFunc, endFunc=None):
        this.startFunc = startFunc
        this.checkFunc = checkFunc
        this.endFunc = endFunc
        this.obj = obj

    def start(this):
        return this.startFunc(this.obj)

    def check(this):
        return this.checkFunc(this.obj)

    def end(this):
        if (this.endFunc):
            return this.endFunc(this.obj)

class StateMachine(object):
    # A cache of state instances
    stateCache = None
    # The general-purpose timer
    timer = None
    # The current state
    state = None
    # The initial state
    startState = "idle"

    def __init__(this):
        this.stateCache = {}
        this.timer = Timer()

    def get_state(this, wrapper, args):
        try:
            return this.stateCache[wrapper]
        except KeyError:
            state = State(this, *args)
            this.stateCache[wrapper] = state
            return state

    def set_state(this, state):
        if (state and this.state != state):
            # Move into the new state, and call the state's start function
            this.state = state
            st = getattr(this, state+"_state")
            st.start()

    # Update the state of the FSM. If it transitions to another state this
    # function returns true, otherwise it returns false.
    def set_variables(this, **args):
        this.changed = False
        for (name, value) in args.iteritems():
            if (getattr(this, name) != value):
                this.changed = True
                setattr(this, name, value)

    def update(this):
        if (this.timer.update()):
            this.changed = True
        #if (this.changed):
        #    this.changed = False

        # Try to advance to the next state
        if (not this.state):
            assert(this.startState)
            this.set_state(this.startState)

        state = getattr(this, this.state+"_state")
        next = state.check()
        if (next):
            state.end()
            this.set_state(next)
            return True
        return False

    @fsm_state
    def idle():
        def start(this):
            pass
        def check(this):
            pass
        return (start, check)

