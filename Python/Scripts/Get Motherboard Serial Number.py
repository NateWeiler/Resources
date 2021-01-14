"""
Python code snippets vol 36:
176-Get motherboard serial number multi-platform.
stevepython.wordpress.com

source:
https://gist.github.com/angeloped/3febaaf71ac083bc2cd5d99d775921d0
"""
import os
import sys

def getMachine_addr():
    """ Find OS and run appropriate read mobo serial num command"""
    os_type = sys.platform.lower()

    if "win" in os_type:
        command = "wmic bios get serialnumber"

    elif "linux" in os_type:
        command = "hal-get-property --udi /org/freedesktop/"  \
        "Hal/devices/computer --key system.hardware.uuid"

    elif "darwin" in os_type:
        command = "ioreg -l | grep IOPlatformSerialNumber"
    return os.popen(command).read().replace("\n", "").replace("  ", "").replace(" ", "")

print("Your motherboard", getMachine_addr())
