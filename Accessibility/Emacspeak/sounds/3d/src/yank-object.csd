<CsoundSynthesizer>
<CsOptions>
-o      yank-object.wav
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 10
nchnls = 2
0dbfs  = 1

instr 1

imaxshake = p4
ifreq     = p5
ifreq1    = p6
ifreq2    = p7
kaz linseg -90, p3, 90
kelev linseg 90, p3, -40
;low amplitude
adrp dripwater .1, 0.09, 10, .9, imaxshake, ifreq, ifreq1, ifreq2 
asig clip adrp, 2, 0.9	; avoid drips that drip too loud
aleft,aright hrtfmove2 asig, kaz,kelev, "hrtf-44100-left.dat","hrtf-44100-right.dat"
     outs aleft, aright

endin
</CsInstruments>
<CsScore>
i 1 0 0.25   .75 1800 1900  2000 
i 1 0.1  0.25   .75 1800 1900 2000 



e
</CsScore>
</CsoundSynthesizer>
