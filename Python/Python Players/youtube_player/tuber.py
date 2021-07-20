from __future__ import unicode_literals
from selenium.webdriver import Firefox
from selenium.webdriver import Chrome
from selenium.webdriver.common.keys import Keys
import sys, os
import youtube_dl



#change for a headless connection
URL = "https://www.youtube.com/"
FF_PATH = "./drivers/geckodriver.exe"
CHR_PATH = "./drivers/chromedriver.exe"
QUERY = "results?search_query="
DRIVER = None

print('setting up!')
browser = sys.argv[1].lower()
if browser == "firefox":
    from selenium.webdriver.firefox.options import Options
    options = Options()
    options.headless = True
    DRIVER = Firefox(executable_path=FF_PATH, options=options)
elif browser == "chrome":
    from selenium.webdriver.chrome.options import Options
    options = Options()
    options.headless = True
    DRIVER = Chrome(executable_path=CHR_PATH,options=options)
else :
    print(f"unsupported {browser} browser")
    exit(1)

## change dir
if not os.access('./downloads', os.R_OK):
    os.system('mkdir downloads')
os.chdir('./downloads')

print('Opening site...')
DRIVER.get(URL)
print("Site opened!")

#states
videos= {}
streaming = False

def search(title):
    global DRIVER, streaming
    search = DRIVER.find_element_by_id('search-form').find_element_by_id('search')
    search.send_keys(title)
    search.send_keys(Keys.RETURN)
    streaming = False

def getVideos():
    global videos
    rst = DRIVER.find_elements_by_id('video-title')
    videos = {v.text: v for v in rst} 
    return videos

def listvideos():
    global videos
    return videos.keys()

def play(title,show=False):
    global videos
    if show:
        print("Song sent => ",title)
    if title in videos.keys():
        videos[title].click()
    else:
        print(f"{title} not in playlist")

def toggle():
    DRIVER.find_element_by_class_name('video-stream').click()

def back():
    DRIVER.back()

def current():
    return DRIVER.title

def playindex(i):
    global videos
    list(videos.values())[i].click()

def download(url, options={}):
    # ydl_options = options # more options to come
    # with youtube_dl.YoutubeDL(ydl_options) as ydl:
    #     ydl.download(url)
    os.system(f"youtube-dl {url}")


HELP =  f"""
                            Commands List
            {'-'*20}
            help                    to show commands list

            search [title]          to search for a video
            play [title]            to play a video
            playindex [index]       to play by list index
            toggle                  pause/play

            list                    to list available videos
            current                 current window title

            download                download playing video
            back                    one page back
            exit                    to exit
            {'-'*20}
        """


###MAIN
print(HELP)
while True:
    try:
        commands = input('>>')
        command_parts = commands.split(' ')

        if 'help' in command_parts:
            print(HELP)
        elif 'search' in command_parts:
            search(' '.join(command_parts[1:]))
        elif "play" in command_parts:
                play(' '.join(command_parts[1:]))
        elif "exit" in command_parts:
            print('bye!')
            DRIVER.close()
            break
        elif 'toggle' in command_parts:
            toggle()
        elif "list" in command_parts:
            getVideos()
            print(listvideos())
        elif "videos" in command_parts: #DEBUG
            print(getVideos())
        elif 'back' in command_parts:
            back()
        elif 'current' in command_parts:
            print(current())
        elif 'playp' in command_parts:
            play(' '.join(command_parts[1:]), show=True)
        elif 'playindex' in command_parts:
            playindex(int(command_parts[-1]))
        elif 'download' in command_parts:
            download(DRIVER.current_url)

    except Exception as e:
        print("Error\n",e,"`\nError") 
        #DRIVER.close()
        #break