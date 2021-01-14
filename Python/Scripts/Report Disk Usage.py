"""
Python code snippets vol 34:
169-Report on Disk Usage
stevepython.wordpress.com

this does a similar job to snippet 75 but lot more info

Tested on: Win 7\Linux Mint 19.1

pip3 install psutil

source:
https://github.com/giampaolo/psutil/blob/master/scripts/disk_usage.py
"""

import sys
import os
import psutil
from psutil._common import bytes2human

def main():
    '''Report on Disk Usage'''
    templ = "%-17s %8s %8s %8s %5s%% %9s  %s"
    print(templ % ("Device", "Total", "Used", "Free", "Use ", "Type",
                   "Mount"))
    for part in psutil.disk_partitions(all=False):
        if os.name == 'nt':
            if 'cdrom' in part.opts or part.fstype == '':
                # skip cd-rom drives with no disk in it; they may raise
                # ENOENT, pop-up a Windows GUI error for a non-ready
                # partition or just hang.
                continue
        usage = psutil.disk_usage(part.mountpoint)
        print(templ % (
            part.device,
            bytes2human(usage.total),
            bytes2human(usage.used),
            bytes2human(usage.free),
            int(usage.percent),
            part.fstype,
            part.mountpoint))


if __name__ == '__main__':
    sys.exit(main())
