
var player_input;


$(document).ready(function(){
  var options_player_input = {
      controls: true,
      fluid: false,
      width: 320,
      height: 240,
      plugins: {
          wavesurfer: {
              src: 'live',
              waveColor: '#36393b',
              progressColor: 'black',
              debug: true,
              cursorWidth: 1,
              msDisplayMax: 20,
              hideScrollbar: true
          },
          record: {
              audio: true,
              video: false,
              maxLength: 20,
              debug: true
          }
      }
  };



  // apply some workarounds for certain browsers
  applyAudioWorkaround();

  // create player_input
  player_input = videojs('myAudio_recorded', options_player_input, function() {
      // print version information at startup
      var msg = 'Using video.js ' + videojs.VERSION +
          ' with videojs-record ' + videojs.getPluginVersion('record') +
          ', videojs-wavesurfer ' + videojs.getPluginVersion('wavesurfer') +
          ', wavesurfer.js ' + WaveSurfer.VERSION + ' and recordrtc ' +
          RecordRTC.version;
      videojs.log(msg);
  });

  // error handling
  player_input.on('deviceError', function() {
      console.log('device error:', player_input.deviceErrorCode);
  });

  player_input.on('error', function(element, error) {
      console.error(error);
  });

  // user clicked the record button and started recording
  player_input.on('startRecord', function() {
      console.log('started recording!');
  });

  // user completed recording and stream is available
  player_input.on('finishRecord', function() {
      // the blob object contains the recorded data that
      // can be downloaded by the user, stored on server etc.
      console.log('finished recording: ', player_input.recordedData);
  });
});