'''
   69-Get version of Windows used
   pip install wmi

   From:http://timgolden.me.uk/python/wmi/cookbook.html
'''

import wmi
c = wmi.WMI()
for os in c.Win32_OperatingSystem():
  print (os.Caption)
