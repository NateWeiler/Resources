#!python3

# Uploading the audio file for transcription

import argparse
import os
import requests


API_URL = "https://api.assemblyai.com/v2/"


def upload_file_to_api(filename):
    """Checks for a valid file and then uploads it to AssemblyAI
    so it can be saved to a secure URL that only that service can access.
    When the upload is complete we can then initiate the transcription
    API call.
    Returns the API JSON if successful, or None if file does not exist.
    """
    if not os.path.exists(filename):
        return None

    def read_file(filename, chunk_size=5242880):
        with open(filename, 'rb') as _file:
            while True:
                data = _file.read(chunk_size)
                if not data:
                    break
                yield data

    headers = {'authorization': os.getenv("ASSEMBLYAI_KEY")}
    response = requests.post("".join([API_URL, "upload"]), headers=headers,
                             data=read_file(filename))
    return response.json()
