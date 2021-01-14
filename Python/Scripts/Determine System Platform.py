''' 19-determine system platform '''
import sys

if sys.platform.startswith('win'):
    PLAT = 'windows'
elif sys.platform.startswith('linux'):
    PLAT = 'Linux'
elif sys.platform.startswith('darwin'):
    PLAT = 'Mac'
else:
    print('This platform is not supported.')
    sys.exit(1)

print(PLAT)
