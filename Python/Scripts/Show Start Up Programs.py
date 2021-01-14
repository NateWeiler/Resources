'''
72-Show start-up programs
Windows only
pip install wmi
'''
import wmi
c = wmi.WMI ()

for s in c.Win32_StartupCommand ():
  print ("%s" % (s.Caption))

# Use the line below instead of the print line above
# if you want more detail.

#print "[%s] %s <%s>" % (s.Location, s.Caption, s.Command)
