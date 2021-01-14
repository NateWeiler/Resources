'''
    58-List all running processes.

    Code borrowed with thanks from a great site:
    https://thispointer.com

    You may need to 'pip install psutil.
'''

import psutil
# Iterate over all running processes

for proc in psutil.process_iter():
    try:
        # Get process name & pid from process object.
        processName = proc.name()
        processID = proc.pid
        print(processName , ' ::: ', processID)
    except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
        pass
