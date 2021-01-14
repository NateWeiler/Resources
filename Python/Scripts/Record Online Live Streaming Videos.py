import time
import requests

print("Recording video...")
filename = time.strftime("/tmp/" + "%Y%m%d%H%M%S",time.localtime())+".avi"
file_handle = open(filename, 'wb')
chunk_size = 1024

start_time_in_seconds = time.time()

time_limit = 10 # time in seconds, for recording
time_elapsed = 0
url = "http://demo.codesamplez.com/html5/video/sample"
with requests.Session() as session:
    response = session.get(url, stream=True)
    for chunk in response.iter_content(chunk_size=chunk_size):
        if time_elapsed > time_limit:
            break
        # to print time elapsed   
        if int(time.time() - start_time_in_seconds)- time_elapsed > 0 :
            time_elapsed = int(time.time() - start_time_in_seconds)
            print(time_elapsed, end='\r', flush=True)
        if chunk:
            file_handle.write(chunk)

    file_handle.close()