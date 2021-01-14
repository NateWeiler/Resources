'''
67-Detect usb drives on Windows Machine
Nicked from this post:
https://stackoverflow.com/questions/4273252/detect-inserted-usb-on-windows

pip install pywin32
'''
import win32file

def locate_usb():

    drive_list = []
    drivebits=win32file.GetLogicalDrives()
    for d in range(1,26):
        mask=1 << d
        if drivebits & mask:
            drname='%c:\\' % chr(ord('A')+d)
            t=win32file.GetDriveType(drname)
            if t == win32file.DRIVE_REMOVABLE:
                drive_list.append(drname)
    print(drive_list)
    return drive_list

locate_usb()
