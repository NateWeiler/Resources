<CsoundSynthesizer>
<CsOptions>
-o no-answer.wav
</CsOptions>
<CsInstruments>
sr		=		44100
ksmps=10
nchnls	=		2

		instr 2
kelev line 20, p3, 0
kampenv 	expseg 	.0001, .01, p4, .04, .01
asig 	rand 	kampenv
afilt 	reson 	asig, 1000, 100
aout 	balance 	afilt, asig
aleft,aright hrtfmove2 8*aout, 45,kelev, "hrtf-44100-left.dat","hrtf-44100-right.dat"
		outs 	aleft, aright
		endin
</CsInstruments>
<CsScore>
 i2 0 0.4 8000 
i2 0.25 0.5 8000 
</CsScore>
</CsoundSynthesizer>
