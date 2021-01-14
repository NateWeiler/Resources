#!G:\Code\GitHub\WeilerWebServices\Resources\Python\Scripts\Scripts\python.exe
# EASY-INSTALL-ENTRY-SCRIPT: 'yapyutils==0.1.38','console_scripts','prettyenv'
__requires__ = 'yapyutils==0.1.38'
import re
import sys
from pkg_resources import load_entry_point

if __name__ == '__main__':
    sys.argv[0] = re.sub(r'(-script\.pyw?|\.exe)?$', '', sys.argv[0])
    sys.exit(
        load_entry_point('yapyutils==0.1.38', 'console_scripts', 'prettyenv')()
    )
