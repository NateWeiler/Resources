'''
    56-Windows Pop-Up Notification
    Use Windows pop up notification to show a desktop message.
    Tested on Windows 7 and works great.
    You may need to "pip install win10toast"
'''

from win10toast import ToastNotifier as toast

pop_up = toast()

pop_up.show_toast("Smeg Alert",  \
"Don't forget to turn your underwear inside out, to double "  \
"wear time, and save the planet too.", duration=8)
