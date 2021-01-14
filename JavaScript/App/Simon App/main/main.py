# import os
# os.environ["KIVY_WINDOW"] = "sdl2"
# uncomment the above lines to run on raspberrypi like it runs on windows.
import kivy
kivy.require('1.9.1')
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.clock import Clock
from time import sleep, time
from random import randint
from functools import partial
import threading


class SimonBoxLayout(BoxLayout):
    """ Game logic goes inside this class."""

    # when game is launched, start blinking new game button
    def __init__(self):
        super().__init__()
        self.set_game_variables(init=True)
        self.custom_animate_button(self.restart_button, "blink_loop")

    # binded to newgame button
    def start(self, *args):
        ''' start a new game thread '''
        threading.Thread(target=self.setup, args=args).start()

    # setup a new game
    def setup(self, r, b, g, y):
        ''' Receives colored buttons objects.
            Sets up all variables and starts game loop.'''

        # blink once animation for start game button after clicked
        self.custom_animate_button(self.restart_button, "down")

        # handle player clicking "new game" before game is over
        if not self.players_turn:
            return
        elif self.game_on:
            self.aborted = True
        else:
            self.aborted = False

        # init/reset variables for new game
        self.set_game_variables(r, b, g, y)

        # game starting animation
        self.game_starting()

        # setup game screen
        self.update_current()

        # start game loop
        self.game_on = True
        self.newgame()

    # init/reset all game variables
    def set_game_variables(self, *args, init=False):
        ''' information about the game is stored in these variables '''

        # used to continue looping game
        self.game_on = False

        # kivy button objects for the colored squares
        self.objcs = [i for i in args]

        # starting lenght of the sequence
        self.starting_size = 1

        # random new sequence that player will try replicate
        self.rand_list = [randint(0, 3) for i in range(self.starting_size - 1)]

        # player current attempt to replicate sequence
        self.player_moves = []

        # current biggest successful sequence replicate
        self.current_streak = 0

        # current longest registered sequence replicate
        self.longest_streak = self.load_record()

        # in seconds, how long before next blinking square
        self.speed = 1

        # used to lock player input while showing sequence
        self.players_turn = init

        # if this game broke previous record
        self.new_record_flag = False

        # kill_thread_flag is used to kill python loops after game closes
        self.kill_thread_flag = threading.Event()

    # game loop
    def newgame(self):
        while self.game_on:
            # check if program was closed
            if self.kill_thread_flag.is_set():
                # if yes kill loop
                return
            self.output_pattern()
            self.intake_pattern()
            self.update_current()
        self.announce_gameover()

    # schedule the sequence
    def output_pattern(self):

        # lock player input while sequence being shown
        self.change_turn(turn="computer")

        # add new value to sequence
        self.rand_list.append(randint(0, 3))

        # time buffer between events in order to not move too fast for humans:
        buff = self.update_self_speed()
        sleep(5 * buff)

        # list of functions to blink (dim/turnon) each button in sequence
        dim_list = []
        turnon_list = []
        for i in self.rand_list:
            obj = self.objcs[i]
            partial_func1 = partial(self.showpattern_dim, obj)
            partial_func2 = partial(self.showpattern_high, obj)
            dim_list.append(partial_func1)
            turnon_list.append(partial_func2)

        # scheduling the time of execution of each function,
        # in order to create the sequence flow.
        # the buffer is used to create the blink effect
        for i in range(len(dim_list)):
            # schedule turning button off
            Clock.schedule_once(dim_list[i], i * (self.speed) + buff)
            # schedule turning button back on
            Clock.schedule_once(turnon_list[i], (i + 1) * (self.speed))

        # allow player's input after entire sequence was shown
        unlock_player = partial(self.change_turn, **{"turn": "player"})
        Clock.schedule_once(unlock_player, (i + 1) * (self.speed))

    # get player's input
    def intake_pattern(self, *args):

        # reset the players input from previous round
        self.player_moves = []

        # wait for players turn
        while not self.players_turn:

            # check if program was closed
            if self.kill_thread_flag.is_set() or not self.game_on:
                # if yes kill loop
                return

            # sleep and wait to check again
            sleep(0.3)

        # Player button clicks will append values to self.player_moves.
        # This loop will check and make sure every click matches sequence.
        # Will exit when player number of inputs equals the lenght of the
        # sequence.
        while True:

            # check if program was closed or new game was pressed
            if self.kill_thread_flag.is_set() or not self.game_on:
                # if yes kill loop
                return

            # check if lists are equal
            counter = 0

            for x, y in zip(self.player_moves, self.rand_list):

                if x != y:
                    # if different, declare game over
                    self.game_on = False
                    self.aborted = False
                    return
                counter += 1

            # return when player has reproduced the entire sequence
            if counter == len(self.rand_list):
                return

            # wait a little before continuing loop
            sleep(0.1)

    # update screen after every turn
    def update_current(self):

        # define current streak
        if not self.game_on:
            self.current_streak = (len(self.rand_list) - 1 if
                                   len(self.rand_list) > 0 else 0)
        else:
            self.current_streak = len(self.rand_list)

        # if your streak is bigger than your record, update record
        if self.current_streak > self.longest_streak:
            self.new_record_flag = True
            self.longest_streak = self.current_streak

        # update the screen with your total streak and record
        streak = 'Current streak: ' + str(self.current_streak)
        record = 'All time best: ' + str(self.longest_streak)
        self.streak.text = streak
        self.record.text = record

    # if game is over, announce it
    def announce_gameover(self):

        # if game was aborted skip announcing
        if self.aborted:
            return

        # if there was a new record, update file, and congratulate
        if self.new_record_flag:
            with open("kivy.dll", mode="w") as f:
                f.write(str(hex(self.current_streak)))

            announce = "GAMEOVER\nCongratz!\nYour new record is "
            announce += str(self.current_streak) + " repetitions."
        else:
            announce = "GAMEOVER\nYour record remains "
            announce += str(self.longest_streak) + " repetitions."

        self.turn.color = [1, 0, 0, 1]
        self.turn.text = (announce)

    # dim button (recieves *args because scheduling passes extra arg "dt")
    def showpattern_dim(self, obj, *args):
        obj.background_color[-1] = 0.2

    # brighten button
    def showpattern_high(self, obj, *args):
        obj.background_color[-1] = 1

    # update if it's player turn to play or not
    def change_turn(self, *args, turn, **kwargs):
        # make output message yellow
        self.turn.color = [1, 1, 0, 1]

        if turn == "player":
            self.players_turn = True
            self.turn.text = "YOUR TURN!"

        elif turn == "computer":
            self.players_turn = False
            self.turn.text = ("REPEAT THIS SEQUENCE")

        else:
            raise ValueError("change turn error")

    # load record from storage file
    def load_record(self):
        try:
            with open("kivy.dll") as f:
                data = f.readline()
                return int(data, 16)
        except FileNotFoundError:
            with open("kivy.dll", mode="w") as f:
                f.write("0")
                return 0

    # bound to colored buttons
    def click_append(self, color_number):
        # if its player turn, append to list else don't.
        if self.players_turn and self.game_on:
            self.player_moves.append(color_number)
        elif not self.players_turn:
            self.turn.color = [0 / 255, 95 / 255, 249 / 255, 1]
            self.turn.text = "Not your turn yet!"
        else:
            pass

    # increment speed with every move
    def update_self_speed(self):
        ''' Updates the speed of the game in order to go faster as sequences get longer
            Outputs the appropriate time buffer between blinks and other events
        '''

        self.speed = round(self.speed - self.speed / 10, 2)
        self.speed = 0.4 if self.speed < 0.4 else self.speed

        return round(self.speed / 10, 2)

    # animate button so the user knows it was clicked
    def custom_animate_button(self, button, high_or_low):

        # turn button red when pressed
        if high_or_low == "down":
            button.color = [0 / 255, 95 / 255, 249 / 255, 1]

        # turn yellow when released
        elif high_or_low == "up":
            def unpress(*args):
                button.color = [1, 1, 0, 1]
            Clock.schedule_once(unpress, 1)

        # blinking effect when waiting for player to click
        elif high_or_low == "blink_loop":
            def blink(*args):
                if self.game_on:
                    button.color = [1, 1, 0, 1]
                elif button.color == [1, 1, 0, 1]:
                    button.color = [1, 0, 0, 1]
                elif button.color == [1, 0, 0, 1]:
                    button.color = [1, 1, 0, 1]
            for i in range(3600):
                Clock.schedule_once(blink, i * 0.5)

        else:
            raise ValueError("Button state not recognized")

    # game starting animation
    def game_starting(self):

        msg = "Starting game "
        self.turn.color = [0 / 255, 95 / 255, 249 / 255, 1]
        for i in range(5):
            self.turn.text = msg
            msg += ". "
            sleep(0.2)


# .kv file must be <same name of this class without "App">.kv all lowercase
class SimonGameApp(App):

    def on_stop(self):
        self.root.kill_thread_flag.set()

    def build(self):
        return SimonBoxLayout()


myapp = SimonGameApp()
myapp.run()
