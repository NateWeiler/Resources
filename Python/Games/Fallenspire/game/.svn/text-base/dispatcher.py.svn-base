# dispatcher.py

###########
# Imports #
###########

###########
# Classes #
###########

raise "old"

class SignalHandler(object):
    # The function to call
    func = None
    # The additional arguments to supply to the function
    args = None

    def deliver(this, args):
        this.func(*(args+this.args))

# This represents an object that can send events to listeners
class Dispatcher(object):
    # A list of signal handlers for this object, hashed by signal name
    signals = None

    #def __init__(this):
    #    this.signals = {}

    def connect(this, name, func, *args):
        if (this.signals == None):
            this.signals = {}
        # Create a new signal handler instance
        sig = SignalHandler()
        sig.func = func
        sig.args = args
        # Add the signal handler to the list
        lst = this.signals.get(name, [])
        lst.append(sig)
        this.signals[name] = lst

    # Triggers the delivery of a signal
    def dispatch(this, name, *args):
        if (not this.signals):
            return
        lst = this.signals.get(name)
        if (lst):
            for sig in lst[:]:
                ret = sig.deliver(args)
                if (not ret):
                    # Remove the signal handler
                    lst.remove(sig)
