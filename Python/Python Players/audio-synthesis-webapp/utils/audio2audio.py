import argparse

from utils.model_vc import Generator
import torch
from utils.audioUtils import audio
from utils.audioUtils.hparams import hparams
import librosa
from pathlib import Path
import numpy as np
from math import ceil
import glob
import numpy as np

import tempfile
import pdb
import os
import datetime

device = "cuda:0"

def pad_seq(x, base=32):
    len_out = int(base * ceil(float(x.shape[0]) / base))
    len_pad = len_out - x.shape[0]
    assert len_pad >= 0
    return np.pad(x, ((0, len_pad), (0, 0)), 'constant'), len_pad


mel_basis = librosa.filters.mel(hparams.sample_rate, hparams.n_fft, n_mels=80)

def voice_conversion(G, input_wavfile, model, parallel=True):
    source_path = input_wavfile
    wav, sr = librosa.load(source_path, hparams.sample_rate)
    linear_spec = np.abs(
        librosa.stft(wav, n_fft=hparams.n_fft, hop_length=hparams.hop_size, win_length=hparams.win_size))
    mel_spec = mel_basis.dot(linear_spec)
    mel_db = 20 * np.log10(mel_spec)
    source_spec = np.clip((mel_db + 120) / 125, 0, 1)
    source_embed = torch.from_numpy(np.array([0, 1])).float()

    source_spec, _ = pad_seq(source_spec.T, hparams.freq)

    with torch.no_grad():
        s2t_spec = G.conversion(torch.Tensor(source_embed).unsqueeze(0), torch.Tensor(source_embed).unsqueeze(0),
                                   torch.Tensor(source_spec).unsqueeze(0), device).cpu()

    if parallel:
        s2t_wav = G.vocoder.generate(s2t_spec.transpose(1, 2), True, 8000, 800, mu_law=True)
    else:
        s2t_wav = G.vocoder.generate(s2t_spec.transpose(1, 2), False, None, None, mu_law=True)




    root = '/home/apushkar/audio-synthesis-webapp'
    name = datetime.datetime.now().strftime("%Y%m%d%H%M%S%f")+str(np.random.randint(0,100))
    
    # with open(datetime.datetime.now().strftime("%Y%m%d%H%M%S%f")+str(np.random.randint(0,100))+'.wav', 'w+') as fp:
        # pdb.set_trace()
    librosa.output.write_wav(os.path.join(root, 'media/wav', name+'.wav'), s2t_wav.astype(np.float32), hparams.sample_rate)
    # librosa.output.write_wav(fp.name, s2t_wav.astype(np.float32), hparams.sample_rate)
    # returnFile, _ = librosa.load("result1.wav", hparams.sample_rate)
    # pdb.set_trace()
    # print("here")
        
    os.system('ffmpeg -i {} -i {} {}'.format(os.path.join('/home/apushkar/audio-synthesis-webapp/micApp/static/micApp/images/',str(model)+'.jpg'),
                                             os.path.join(root, 'media/wav', name+'.wav'), os.path.join(root, 'media/webm', name+'.webm')))
   
    with open(os.path.join(root, 'media/webm', name+'.webm'), 'rb') as  wp:
    # File1 = open('a.webm','rb')
        Axel  = wp.read()
    
    return Axel



def main(wav_path, model, parallel=True):
#    parser = argparse.ArgumentParser()
#    parser.add_argument('--wav_path')
#    parser.add_argument('--model')
#    parser.add_argument('--parallel', dest='parallel', default=False, action='store_true')
#    args = parser.parse_args()
#    

    # device = "cuda:0"

    model_path = "/home/apushkar/audio-synthesis-webapp/utils/models/" # please change it to the trained models' path

    G = Generator(hparams.dim_neck, hparams.speaker_embedding_size, 512, hparams.freq, is_train=False,
                  encoder_type="single",
                  discriminator=True,
                  use_lsgan=True,
                  train_wavenet=True).to(device)

    model_list = glob.glob(model_path + "*.pkl")


    name_list = [x.split('/')[-1].split('.')[0] for x in model_list]


    # print(name_list)
    # pdb.set_trace()
    if model in name_list:
        print("Loading autovc model...", end='\t')
        load_model = "/home/apushkar/audio-synthesis-webapp/utils/models/%s.pkl" % model
        d = torch.load(load_model)
        newdict = d.copy()
        for key, value in d.items():
            newkey = key
            if 'wavenet' in key:
                newdict[key.replace('wavenet', 'vocoder')] = newdict.pop(key)
                newkey = key.replace('wavenet', 'vocoder')
            if 'module' in key:
                newdict[newkey.replace('module.','',1)] = newdict.pop(newkey)
                newkey = newkey.replace('module.', '', 1)
            if newkey not in G.state_dict():
                #print(newkey)
                newdict.pop(newkey)
        print("Load " + str(len(newdict)) + " parameters!")
        G.load_state_dict(newdict, strict=False)
        print("Done.")

        return voice_conversion(G, wav_path, model, parallel)
    else:
        print("Unknown Examplar!")
