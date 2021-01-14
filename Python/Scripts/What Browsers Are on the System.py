"""
Python code snippets vol 34:
Windows only
168-What browsers are installed
stevepython.wordpress.com

Source:
https://programtalk.com/python-examples/winreg.HKEY_LOCAL_MACHINE/?ipage=3
"""
import winreg

def find_windows_browsers():
    """ Access the windows registry to determine
    what browsers are on the system.
    """
    HKLM = winreg.HKEY_LOCAL_MACHINE
    subkey = r'Software\Clients\StartMenuInternet'
    read32 = winreg.KEY_READ | winreg.KEY_WOW64_32KEY
    read64 = winreg.KEY_READ | winreg.KEY_WOW64_64KEY
    key32 = winreg.OpenKey(HKLM, subkey, access=read32)
    key64 = winreg.OpenKey(HKLM, subkey, access=read64)

    # Return a list of browsers found in the registry
    # Check if there are any different browsers in the
    # 32 bit location instead of the 64 bit location.
    browsers = []
    i = 0
    while True:
        try:
            browsers.append(winreg.EnumKey(key32, i))
        except EnvironmentError:
            break
        i += 1

    i = 0
    while True:
        try:
            browsers.append(winreg.EnumKey(key64, i))
        except EnvironmentError:
            break
        i += 1

    winreg.CloseKey(key32)
    winreg.CloseKey(key64)
    print(browsers)
    return browsers

find_windows_browsers()
