"""
Python code snippets vol 34:
170-Get CPU speed.
stevepython.wordpress.com

Tested on: Win 7

source
https://programtalk.com/python-examples/winreg.HKEY_LOCAL_MACHINE/?ipage=3
"""
import platform
import subprocess

def get_procspeed():
    """get CPU speed of computer"""
    osname = platform.system()
    speed = ""

    if osname == "Darwin":
        proc = subprocess.Popen(["system_profiler SPHardwareDataType | grep \"Processor Speed\" | cut -d \":\" -f2"], shell=True, stdout=subprocess.PIPE)
        output = proc.communicate()[0]
        speed = output.lstrip().rstrip('\n')

    if osname == "Linux":
        for line in fileinput.input('/proc/cpuinfo'):
            if 'MHz' in line:
                speed = line.split(':')[1].strip() + " MHz"

    if osname in ["Windows", "Win32"]:
        import winreg
        key = winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, r"HARDWARE\DESCRIPTION\System\CentralProcessor\0")
        speed, type = winreg.QueryValueEx(key, "~MHz")
        speed = str(speed) + " MHz"


    return speed


print(get_procspeed())
