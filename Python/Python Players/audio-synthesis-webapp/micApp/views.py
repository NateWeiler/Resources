from django.shortcuts import render
import os
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage

from utils import audio2audio
import subprocess

import datetime
import pdb
import numpy as np

# Create your views here.



def index(request):

	images_name = os.listdir('micApp/static/micApp/images')
	context = {
		'images' : images_name
	}

	return render(request, 'micApp/home.html', context)

def about(request):
	return render(request, 'micApp/about.html')

@csrf_exempt
def uploads(request):
	# pdb.set_trace()
	file = request.FILES['file']

	# pdb.set_trace()

	# wav_path = os.path.join(file.temporary_file_path(), file.name)
	# wav_path = file.temporary_file_path()
	name = datetime.datetime.now().strftime("%Y%m%d%H%M%S%f")+str(np.random.randint(0,100))+'.wav'
	fs = FileSystemStorage()
	fs.save(name, file)

	# command = "ffmpeg -i {} -ab 160k -ac 2 -ar 44100 -vn audio.wav".format(wav_path)

	# subprocess.call(command, shell=True)

	model = file.name

	# pdb.set_trace()
	# Storing file
	# fs = FileSystemStorage()
	# fs.save(file.name, file)

	# in_video = file
	wav_path = os.path.join('/home/apushkar/audio-synthesis-webapp/media', name)
	in_video = audio2audio.main(wav_path, model)

	# pdb.set_trace()

	# x = backend.convert(in_video)
	

	# Name = request.FILES['file'].name

	response = HttpResponse(in_video, content_type="video/webm")
	response['Content-Disposition'] = 'attachment'
	# pdb.set_trace()
	return response
	