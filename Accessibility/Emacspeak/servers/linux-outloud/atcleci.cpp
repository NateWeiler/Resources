/*
 * $Id$
 */
//<copyright info

/*
 * Tcl ViaVoiceOutloud Interface program (c) Copyright 1999 by
 * Paige Phault
 *
 * The author hereby grants permission to use, copy, modify,
 * distribute, and license this software for any purpose,
 * provided that existing copyright notices are retained in all
 * copies and that this notice is included verbatim in any
 * distributions. No written agreement, license, or royalty fee
 * is required for any of the authorized uses.  Modifications to
 * this software may be copyrighted by their authors and need
 * not follow the licensing terms described here, provided that
 * the new terms are clearly indicated on the first page of each
 * file where they apply.
 *
 * IN NO EVENT SHALL THE AUTHORS OR DISTRIBUTORS BE LIABLE TO ANY
 * PARTY FOR DIRECT, INDIRECT, SPECIAL, INCIDENTAL, OR
 * CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OF THIS SOFTWARE,
 * ITS DOCUMENTATION, OR ANY DERIVATIVES THEREOF, EVEN IF THE
 * AUTHORS HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * THE AUTHORS AND DISTRIBUTORS SPECIFICALLY DISCLAIM ANY
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE, AND NON-INFRINGEMENT.  THIS SOFTWARE IS PROVIDED ON
 * AN "AS IS" BASIS, AND THE AUTHORS AND DISTRIBUTORS HAVE NO
 * OBLIGATION TO PROVIDE MAINTENANCE, SUPPORT, UPDATES,
 * ENHANCEMENTS, OR MODIFICATIONS.
 *
 * dynamic loading of eci library contributed by Jeffrey Sorensen
 * --this allows a compiled version of this speech server to be
 * distributed without violating the IBM Viavoice license. This
 * means that end-users only need install the Viavoice RTK
 * (Runtime toolkit) to use Emacspeak with the ViaVoice TTS
 * engine.
 *
 * February 2005 TVR: Updating to use alsalib output routines
 */

//>
//<Usage:

/*
 * TCL usage package require tts
 *
 * proc index x { puts "I just played index $x" }
 *
 * synth "Hello world" synth -index 0 "This is some" -index 1
 * "really wierd" say -index 2 "text" say -reset
 *
 * The only difference bewtween say and synth is that synth
 * calls eciSynthesize and say doesn't.  You can put as many
 * text blocks as you like after a command.
 */

//>
//<includes

#include <alloca.h>
#include <dlfcn.h>
#include <sys/time.h>
#define ALSA_PCM_NEW_HW_PARAMS_API
#define ALSA_PCM_NEW_SW_PARAMS_API
#include <alsa/asoundlib.h>

#include <tcl.h>
#include "langswitch.h"

#define PACKAGENAME "tts"
#define PACKAGEVERSION "1.0"
#define ECILIBRARYNAME "libibmeci.so"

//>
//< alsa: globals and defines

#define DEFAULT_FORMAT SND_PCM_FORMAT_S16
#define DEFAULT_SPEED 11025

/*
 * globals
 */
static snd_pcm_t *AHandle = NULL;
static snd_output_t *Log = NULL;
short *waveBuffer = NULL;
int waveBufferBytes = 0;

//>
//<decls and function prototypes

/*
 * The following declarations are derived from the publically
 * available documentation for ViaVoice TTS outloud. --they are
 * placed here to obviate the need for having the ViaVoice SDK
 * installed.
 */

typedef enum { eciDataNotProcessed, eciDataProcessed } ECICallbackReturn;

typedef enum {
  eciWaveformBuffer,
  eciPhonemeBuffer,
  eciIndexReply,
  eciPhonemeIndexReply
} ECIMessage;

typedef enum {
  eciSynthMode,
  eciInputType,
  eciTextMode,
  eciDictionary,
  eciSampleRate = 5,
  eciWantPhonemeIndices = 7,
  eciRealWorldUnits,
  eciLanguageDialect,
  eciNumberMode,
  eciPhrasePrediction,
  eciNumParams
} ECIParam;

static void (*_eciVersion)(char *);
static void *(*_eciNewEx)(enum ECILanguageDialect);
static int (*_eciGetAvailableLanguages)(enum ECILanguageDialect *, int *);
static void (*_eciDelete)(void *);
static int (*_eciReset)(void *);
static int (*_eciStop)(void *);
static int (*_eciClearInput)(void *);
static int (*_eciPause)(void *, int);
static int (*_eciSynthesize)(void *);
static int (*_eciSynchronize)(void *);
static int (*_eciSpeaking)(void *);
static int (*_eciAddText)(void *, char *);
static int (*_eciInsertIndex)(void *, int);
static int (*_eciSetParam)(void *, int, int);
static int (*_eciGetVoiceParam)(void *, int, int);
static int (*_eciSetVoiceParam)(void *, int, int, int);
static int (*_eciSetOutputBuffer)(void *, int, short *);
static int (*_eciSetOutputDevice)(void *, int);
static void (*_eciRegisterCallback)(void *, int (*)(void *, int, long, void *),
                                    void *);
static size_t alsa_init();
static void alsa_reset();  // drop handle and reset
static size_t alsa_configure(void);

extern "C" int Atcleci_Init(Tcl_Interp *interp);

int SetRate(ClientData, Tcl_Interp *, int, Tcl_Obj *CONST[]);
int GetRate(ClientData, Tcl_Interp *, int, Tcl_Obj *CONST[]);
int getTTSVersion(ClientData, Tcl_Interp *, int, Tcl_Obj *CONST[]);
int showAlsaState(ClientData, Tcl_Interp *, int, Tcl_Obj *CONST[]);
int Say(ClientData, Tcl_Interp *, int, Tcl_Obj *CONST[]);
int Stop(ClientData, Tcl_Interp *, int, Tcl_Obj *CONST[]);
int SpeakingP(ClientData, Tcl_Interp *, int, Tcl_Obj *CONST[]);
int Synchronize(ClientData, Tcl_Interp *, int, Tcl_Obj *CONST[]);
int Pause(ClientData, Tcl_Interp *, int, Tcl_Obj *CONST[]);
int Resume(ClientData, Tcl_Interp *, int, Tcl_Obj *CONST[]);
int SetLanguage(ClientData, Tcl_Interp *, int, Tcl_Obj *CONST[]);
int alsa_close();
int alsa_retry();
int eciCallback(void * /*eciHandle*/, int /*msg*/, long /*lparam*/,
                void * /*data*/);

//>
//<alsa: set hw and sw params

static size_t alsa_configure(void) {
  //<init:
  size_t chunk_bytes;
  size_t bits_per_sample;
  size_t bits_per_frame = 0;
  snd_pcm_uframes_t period_size;
  snd_pcm_uframes_t buffer_size = 0;
  snd_pcm_hw_params_t *params;
  unsigned int rate = DEFAULT_SPEED;
  int err;
  snd_pcm_hw_params_alloca(&params);
  //>
  //<defaults:

  err = snd_pcm_hw_params_any(AHandle, params);
  if (err < 0) {
    fprintf(stderr, "PCM: Broken configuration: no configurations available");
    exit(EXIT_FAILURE);
  }
  //>
  //<Format:

  err = snd_pcm_hw_params_set_format(AHandle, params, DEFAULT_FORMAT);
  if (err < 0) {
    fprintf(stderr, "Sample format non available");
    exit(EXIT_FAILURE);
  }
  //>
  //<Channels:

  err = snd_pcm_hw_params_set_channels(AHandle, params, 1);
  if (err < 0) {
    fprintf(stderr, "Channels count non available");
    exit(EXIT_FAILURE);
  }
  //>
  //<Rate:
  err = snd_pcm_hw_params_set_rate_resample(AHandle, params, 1);
  assert(err >= 0);
  err = snd_pcm_hw_params_set_rate(AHandle, params, rate, 0);
  assert(err >= 0);

  //>
  //<Access Mode:
  err = snd_pcm_hw_params_set_access(AHandle, params,
                                     SND_PCM_ACCESS_RW_INTERLEAVED);
  if (err < 0) {
    fprintf(stderr, "Access type not available");
    exit(EXIT_FAILURE);
  }
  //>
  //<Commit hw params:
  err = snd_pcm_hw_params(AHandle, params);
  if (err < 0) {
    fprintf(stderr, "Unable to install hw params:");
    exit(EXIT_FAILURE);
  }
  //>
  //<finalize period_size and buffer_size:

  snd_pcm_hw_params_get_period_size(params, &period_size, 0);
  snd_pcm_hw_params_get_buffer_size(params, &buffer_size);
  if (period_size == buffer_size) {
    fprintf(stderr, "Can't use period equal to buffer size (%lu == %lu)",
            period_size, buffer_size);
    exit(EXIT_FAILURE);
  }
  //>
  bits_per_sample = snd_pcm_format_physical_width(DEFAULT_FORMAT);
  bits_per_frame = bits_per_sample * 1;  // mono
  chunk_bytes = period_size * bits_per_frame / 8;
  return chunk_bytes;
}

//>
//<xrun and suspend

#ifndef timersub

#define timersub(a, b, result)                       \
  do {                                               \
    (result)->tv_sec = (a)->tv_sec - (b)->tv_sec;    \
    (result)->tv_usec = (a)->tv_usec - (b)->tv_usec; \
    if ((result)->tv_usec < 0) {                     \
      --(result)->tv_sec;                            \
      (result)->tv_usec += 1000000;                  \
    }                                                \
  } while (0)
#endif

// static void xrun(void) {
//   snd_pcm_status_t *status;
//   int res;

//   snd_pcm_status_alloca(&status);
//   if ((res = snd_pcm_status(AHandle, status)) < 0) {
//     fprintf(stderr, "status error: %s", snd_strerror(res));
//     alsa_close();
//     exit(EXIT_FAILURE);
//   }
//   if (snd_pcm_status_get_state(status) == SND_PCM_STATE_RUNNING) {
//     // DMIX appears to be in a confused state, attempt to restore sanity.
//     if ((res = snd_pcm_prepare(AHandle)) < 0) {
//       // Attempt to fix failed!
//       fprintf(stderr, "XRUN: prepare error: %s", snd_strerror(res));
//       alsa_close();
//       exit(EXIT_FAILURE);
//     }
//     return; // ready to continue
//   }
//   if (snd_pcm_status_get_state(status) == SND_PCM_STATE_XRUN) {
//     struct timeval now, diff, tstamp;
//     gettimeofday(&now, 0);
//     snd_pcm_status_get_trigger_tstamp(status, &tstamp);
//     timersub(&now, &tstamp, &diff);
//     fprintf(stderr, "Underrun!!! (at least %.3f ms long)\n",
//             diff.tv_sec * 1000 + diff.tv_usec / 1000.0);
//     if ((res = snd_pcm_prepare(AHandle)) < 0) {
//       fprintf(stderr, "xrun: prepare error: %s", snd_strerror(res));
//       alsa_close();
//       exit(EXIT_FAILURE);
//     }
//     return;  // ok, data should be accepted again
//   }
//   fprintf(stderr, "read/write error, state = %s\n",
//           snd_pcm_state_name(snd_pcm_status_get_state(status)));
//   // DMIX leaves device in a strange state, so retry.
//   alsa_retry();
// }

static void suspend(void) {
  int res;

  fprintf(stderr, "Suspended. Trying resume. ");
  fflush(stderr);
  while ((res = snd_pcm_resume(AHandle)) == -EAGAIN) {
    sleep(1); /* wait until suspend flag is  released */
  }
  if (res < 0) {
    fprintf(stderr, "Failed. Restarting stream. ");
    fflush(stderr);
    if ((res = snd_pcm_prepare(AHandle)) < 0) {
      fprintf(stderr, "suspend: prepare error: %s", snd_strerror(res));
      alsa_close();
      exit(EXIT_FAILURE);
    }
  }

  fprintf(stderr, "Done.\n");
}

//>
//<alsa: pcm_write

static ssize_t pcm_write(short *data, size_t count) {
  ssize_t r;
  ssize_t result = 0;
  int res;
  while (count > 0) {
    r = snd_pcm_writei(AHandle, data, count);
    if (r == -EAGAIN || (r >= 0 && (size_t)r < count)) {
      snd_pcm_wait(AHandle, 100);
    } else if (r == -EPIPE) {
      if ((res = snd_pcm_prepare(AHandle)) < 0) {
        fprintf(stderr, "Write/Retry: prepare error: %s", snd_strerror(res));
        alsa_close();
        exit(EXIT_FAILURE);
      }
    } else if (r == -ESTRPIPE) {
      suspend();
    } else if (r < 0) {
      fprintf(stderr, "write error: %s", snd_strerror(r));
      alsa_close();
      exit(EXIT_FAILURE);
    }
    if (r > 0) {
      result += r;
      count -= r;
      data += r;
    }
  }
  return result;
}

//>
//<alsa_reset

void alsa_reset() {
  snd_pcm_drop(AHandle);  // flush all frames
  snd_pcm_prepare(AHandle);
}

//>
//<alsa_init

static size_t alsa_init() {
  int err;
  const char *device = getenv("ALSA_DEFAULT");
  if (device == NULL) {
    device = "default";
  }
  size_t chunk_bytes = 0;
  if ((err = snd_pcm_open(&AHandle, device, SND_PCM_STREAM_PLAYBACK,
                          0 /* blocking */)) < 0) {
    fprintf(stderr, "Playback open error: %s\n", snd_strerror(err));
    exit(1);
  }
  err = snd_output_stdio_attach(&Log, stderr, 0);
  assert(err >= 0);
  chunk_bytes = alsa_configure();
  return chunk_bytes;
}

//>
//<alsa_close

int alsa_close() {
  // shut down alsa
  if (AHandle) {
    snd_pcm_close(AHandle);
  }
  free(waveBuffer);
  return TCL_OK;
}

int alsa_retry() {
  fprintf(stderr, "re-initializing ALSA\n");
  int res;
  if ((res = snd_pcm_prepare(AHandle)) < 0) {
    fprintf(stderr, "Retry: prepare error: %s", snd_strerror(res));
    alsa_close();
    exit(EXIT_FAILURE);
  }
  return TCL_OK;
}

//>
//<eciFree

void TclEciFree(ClientData eciHandle) { _eciDelete(eciHandle); }

//>
//<tcleci_init

int Atcleci_Init(Tcl_Interp *interp) {
  int rc;
  size_t chunk_bytes = 0;
  void *eciHandle;
  void *eciLib;
  //< configure shared library symbols

  eciLib = dlopen(ECILIBRARYNAME, RTLD_LAZY);
  if (eciLib == NULL) {
    Tcl_AppendResult(interp, "Could not load ", ECILIBRARYNAME, "\n", dlerror(),
                     "\nPlease install the IBM ViaVoice Outloud RTK", NULL);
    return TCL_ERROR;
  }

  _eciVersion = (void (*)(char *))(unsigned long)dlsym(eciLib, "eciVersion");
  _eciGetAvailableLanguages = (int (*)(enum ECILanguageDialect *, int *))(
      unsigned long)dlsym(eciLib, "eciGetAvailableLanguages");
  _eciNewEx = (void *(*)(enum ECILanguageDialect))(unsigned long)dlsym(
      eciLib, "eciNewEx");
  _eciDelete = (void (*)(void *))(unsigned long)dlsym(eciLib, "eciDelete");
  _eciReset = (int (*)(void *))(unsigned long)dlsym(eciLib, "eciReset");
  _eciStop = (int (*)(void *))(unsigned long)dlsym(eciLib, "eciStop");
  _eciClearInput =
      (int (*)(void *))(unsigned long)dlsym(eciLib, "eciClearInput");
  _eciPause = (int (*)(void *, int))(unsigned long)dlsym(eciLib, "eciPause");
  _eciSynthesize =
      (int (*)(void *))(unsigned long)dlsym(eciLib, "eciSynthesize");
  _eciSynchronize =
      (int (*)(void *))(unsigned long)dlsym(eciLib, "eciSynchronize");
  _eciSpeaking = (int (*)(void *))(unsigned long)dlsym(eciLib, "eciSpeaking");
  _eciInsertIndex =
      (int (*)(void *, int))(unsigned long)dlsym(eciLib, "eciInsertIndex");
  _eciAddText =
      (int (*)(void *, char *))(unsigned long)dlsym(eciLib, "eciAddText");
  _eciSetParam =
      (int (*)(void *, int, int))(unsigned long)dlsym(eciLib, "eciSetParam");
  _eciGetVoiceParam = (int (*)(void *, int, int))(unsigned long)dlsym(
      eciLib, "eciGetVoiceParam");
  _eciSetVoiceParam = (int (*)(void *, int, int, int))(unsigned long)dlsym(
      eciLib, "eciSetVoiceParam");
  _eciRegisterCallback =
      (void (*)(void *, int (*)(void *, int, long, void *), void *))(
          unsigned long)dlsym(eciLib, "eciRegisterCallback");
  _eciSetOutputBuffer = (int (*)(void *, int, short *))(unsigned long)dlsym(
      eciLib, "eciSetOutputBuffer");
  _eciSetOutputDevice =
      (int (*)(void *, int))(unsigned long)dlsym(eciLib, "eciSetOutputDevice");

  //>
  //< check for needed symbols

  int okay = 1;
  if (!_eciNewEx) {
    okay = 0;
    Tcl_AppendResult(interp, "eciNewEx undef\n", NULL);
  }
  if (!_eciDelete) {
    okay = 0;
    Tcl_AppendResult(interp, "eciDelete undef\n", NULL);
  }
  if (!_eciReset) {
    okay = 0;
    Tcl_AppendResult(interp, "eciReset undef\n", NULL);
  }
  if (!_eciStop) {
    okay = 0;
    Tcl_AppendResult(interp, "eciStop undef\n", NULL);
  }
  if (!_eciClearInput) {
    okay = 0;
    Tcl_AppendResult(interp, "eciClearInput undef\n", NULL);
  }
  if (!_eciPause) {
    okay = 0;
    Tcl_AppendResult(interp, "eciPause undef\n", NULL);
  }
  if (!_eciSynthesize) {
    okay = 0;
    Tcl_AppendResult(interp, "eciSynthesize undef\n", NULL);
  }
  if (!_eciSpeaking) {
    okay = 0;
    Tcl_AppendResult(interp, "eciSpeaking undef\n", NULL);
  }
  if (!_eciInsertIndex) {
    okay = 0;
    Tcl_AppendResult(interp, "eciInsertIndex undef\n", NULL);
  }
  if (!_eciAddText) {
    okay = 0;
    Tcl_AppendResult(interp, "eciAddText undef\n", NULL);
  }
  if (!_eciSetParam) {
    okay = 0;
    Tcl_AppendResult(interp, "eciSetParam undef\n", NULL);
  }
  if (!_eciSetParam) {
    okay = 0;
    Tcl_AppendResult(interp, "eciSetParam undef\n", NULL);
  }
  if (!_eciGetVoiceParam) {
    okay = 0;
    Tcl_AppendResult(interp, "eciGetVoiceParam undef\n", NULL);
  }
  if (!_eciSetVoiceParam) {
    okay = 0;
    Tcl_AppendResult(interp, "eciSetVoiceParam undef\n", NULL);
  }
  if (!_eciRegisterCallback) {
    okay = 0;
    Tcl_AppendResult(interp, "eciRegisterCallback undef\n", NULL);
  }
  if (!_eciSetOutputBuffer) {
    okay = 0;
    Tcl_AppendResult(interp, "eciSetOutputBuffer undef\n", NULL);
  }
  if (!_eciSetOutputDevice) {
    okay = 0;
    Tcl_AppendResult(interp, "eciSetOutputDevice undef\n", NULL);
  }
  if (!_eciGetAvailableLanguages) {
    okay = 0;
    Tcl_AppendResult(interp, "_eciGetAvailableLanguages undef\n", NULL);
  }
  if (!okay) {
    Tcl_AppendResult(interp, "Missing symbols from ", ECILIBRARYNAME, NULL);
    return TCL_ERROR;
  }
  //>
  //<setup package, create tts handle

  if (Tcl_PkgProvide(interp, PACKAGENAME, PACKAGEVERSION) != TCL_OK) {
    Tcl_AppendResult(interp, "Error loading ", PACKAGENAME, NULL);
    return TCL_ERROR;
  }

  static enum ECILanguageDialect aLanguages[LANG_INFO_MAX];
  int nLanguages = LANG_INFO_MAX;
  _eciGetAvailableLanguages(aLanguages, &nLanguages);

  enum ECILanguageDialect aDefaultLanguage =
      initLanguage(interp, aLanguages, nLanguages);
  if (aDefaultLanguage == NODEFINEDCODESET) {
    Tcl_AppendResult(interp, "No language found", PACKAGENAME, NULL);
    return TCL_ERROR;
  }
  fprintf(stderr, "Found %d languages.\n", nLanguages);
  eciHandle = _eciNewEx(aDefaultLanguage);
  if (eciHandle == 0) {
    Tcl_AppendResult(interp, "Could not open text-to-speech engine", NULL);
    return TCL_ERROR;
  }
  //>
  //<initialize alsa
  chunk_bytes = alsa_init();
  //<Finally, allocate waveBuffer

  fprintf(stderr, "allocating %d 16 bit samples, %f seconds of audio.\n",
          (int)chunk_bytes, (chunk_bytes / (float)DEFAULT_SPEED));
  waveBuffer = (short *)calloc(chunk_bytes, sizeof(short));
  waveBufferBytes = (chunk_bytes * sizeof(short));
  if (waveBuffer == NULL) {
    fprintf(stderr, "not enough memory");
    alsa_close();
    exit(EXIT_FAILURE);
  }
  //>
  //>
  //<initialize TTS

  if ((_eciSetParam(eciHandle, eciInputType, 1) == -1) ||
      (_eciSetParam(eciHandle, eciSynthMode, 1) == -1) ||
      (_eciSetParam(eciHandle, eciSampleRate, 1) == -1)) {
    Tcl_AppendResult(interp, "Could not initialized tts", NULL);
    _eciDelete(eciHandle);
    return TCL_ERROR;
  }
  _eciRegisterCallback(eciHandle, eciCallback, interp);

  //>
  //<set output to buffer

  rc = _eciSynchronize(eciHandle);
  if (!rc) {
    Tcl_AppendResult(interp, "Error  resetting TTS engine.\n", NULL);
    return TCL_ERROR;
  }
  rc = _eciSetOutputBuffer(eciHandle, chunk_bytes, waveBuffer);
  if (!rc) {
    Tcl_AppendResult(interp, "Error setting output buffer.\n", NULL);
    return TCL_ERROR;
  }
  fprintf(stderr, "output buffered to waveBuffer with size %d\n",
          (int)chunk_bytes);

  //>
  //<register tcl commands

  Tcl_CreateObjCommand(interp, "setRate", SetRate, (ClientData)eciHandle,
                       TclEciFree);
  Tcl_CreateObjCommand(interp, "getRate", GetRate, (ClientData)eciHandle,
                       TclEciFree);
  Tcl_CreateObjCommand(interp, "ttsVersion", getTTSVersion,
                       (ClientData)eciHandle, TclEciFree);
  Tcl_CreateObjCommand(interp, "alsaState", showAlsaState, (ClientData)NULL,
                       TclEciFree);
  Tcl_CreateObjCommand(interp, "say", Say, (ClientData)eciHandle, TclEciFree);
  Tcl_CreateObjCommand(interp, "synth", Say, (ClientData)eciHandle, NULL);
  Tcl_CreateObjCommand(interp, "synchronize", Synchronize,
                       (ClientData)eciHandle, TclEciFree);
  Tcl_CreateObjCommand(interp, "stop", Stop, (ClientData)eciHandle, TclEciFree);
  Tcl_CreateObjCommand(interp, "speakingP", SpeakingP, (ClientData)eciHandle,
                       TclEciFree);
  Tcl_CreateObjCommand(interp, "pause", Pause, (ClientData)eciHandle,
                       TclEciFree);
  Tcl_CreateObjCommand(interp, "resume", Resume, (ClientData)eciHandle,
                       TclEciFree);
  Tcl_CreateObjCommand(interp, "setLanguage", SetLanguage,
                       (ClientData)eciHandle, TclEciFree);
  //>
  //<set up index processing

  rc = Tcl_Eval(interp,
                "proc index x {global tts; \
set tts(last_index) $x}");
  if (rc == -1) {
    Tcl_AppendResult(interp, "Could not set index", TCL_STATIC);
    return TCL_ERROR;
  }
  //>
  return TCL_OK;
}

//>
//<playTTS

int playTTS(size_t count) {
  pcm_write(waveBuffer, count);
  return eciDataProcessed;
}

//>
//<eciCallBack

int eciCallback(void *eciHandle, int msg, long lparam, void *data) {
  Tcl_Interp *interp = (Tcl_Interp *)data;
  if (msg == eciIndexReply) {
    char buffer[128];
    snprintf(buffer, 128, "index %ld", lparam);
    int rc = Tcl_Eval(interp, buffer);
    if (rc != TCL_OK) Tcl_BackgroundError(interp);
  } else if ((msg == eciWaveformBuffer) && (lparam > 0)) {
    playTTS(lparam);
  }
  return 1;
}

//>
//<getRate, setRate

int GetRate(ClientData eciHandle, Tcl_Interp *interp, int objc,
            Tcl_Obj *CONST objv[]) {
  int rc;
  int rate;
  int voice;
  if (objc != 2) {
    Tcl_AppendResult(interp, "Usage: getRate voiceCode  ", TCL_STATIC);
    return TCL_ERROR;
  }
  rc = Tcl_GetIntFromObj(interp, objv[1], &voice);
  if (rc != TCL_OK) return rc;
  rate = _eciGetVoiceParam(eciHandle, voice, 6 /* eciSpeed */);
  Tcl_SetObjResult(interp, Tcl_NewIntObj(rate));
  return TCL_OK;
}

int SetRate(ClientData eciHandle, Tcl_Interp *interp, int objc,
            Tcl_Obj *CONST objv[]) {
  int rc;
  int rate;
  int voice;
  if (objc != 3) {
    Tcl_AppendResult(interp, "Usage: setRate voiceCode speechRate ",
                     TCL_STATIC);
    return TCL_ERROR;
  }
  rc = Tcl_GetIntFromObj(interp, objv[1], &voice);
  if (rc != TCL_OK) return rc;
  rc = Tcl_GetIntFromObj(interp, objv[2], &rate);
  if (rc != TCL_OK) return rc;
  rc = _eciSetVoiceParam(eciHandle, voice, 6 /* eciSpeed */, rate);
  if (rc == -1) {
    Tcl_AppendResult(interp, "Could not set rate", TCL_STATIC);
    return TCL_ERROR;
  }
  // fprintf(stderr, "setRate returned %d\n", rc);
  rate = _eciGetVoiceParam(eciHandle, voice, 6 /* eciSpeed */);
  fprintf(stderr, "eciGetVoiceParam returned %d for voice %d \n", rate, voice);
  return TCL_OK;
}

//>
//<say

int Say(ClientData eciHandle, Tcl_Interp *interp, int objc,
        Tcl_Obj *CONST objv[]) {
  int i;
  int rc;
  int index;
  int length;
  for (i = 1; i < objc; i++) {
    // if string begins with -, assume it is an index value
    char *txt = Tcl_GetStringFromObj(objv[i], &length);
    if (Tcl_StringMatch(txt, "-reset")) {
      _eciReset(eciHandle);
      if ((_eciSetParam(eciHandle, eciInputType, 1) == -1) ||
          (_eciSetParam(eciHandle, eciSynthMode, 1) == -1) ||
          (_eciSetParam(eciHandle, eciSampleRate, 1) == -1)) {
        Tcl_AppendResult(interp, "Could not re-initialized tts", NULL);
        return TCL_ERROR;
      }
    } else if (Tcl_StringMatch(txt, "-index")) {
      i++;
      if (i == objc) {
        Tcl_AppendResult(interp, "missing index parameter", TCL_STATIC);
        return TCL_ERROR;
      }
      rc = Tcl_GetIntFromObj(interp, objv[i], &index);
      if (rc != TCL_OK) return rc;
      rc = _eciInsertIndex(eciHandle, index);
      if (!rc) {
        Tcl_AppendResult(interp, "Could not insert index", TCL_STATIC);
        return TCL_ERROR;
      }
    } else {
      char *dest = convertFromUTF8(interp, Tcl_GetStringFromObj(objv[i], NULL));
      if (dest) {
        rc = _eciAddText(eciHandle, dest);
        free(dest);
        if (!rc) {
          Tcl_SetResult(interp, const_cast<char *>("Internal tts error"),
                        TCL_STATIC);
          return TCL_ERROR;
        }
      }
    }
  }
  if (Tcl_StringMatch(Tcl_GetStringFromObj(objv[0], NULL), "synth")) {
    rc = _eciSynthesize(eciHandle);
    if (!rc) {
      Tcl_SetResult(interp, const_cast<char *>("Internal tts synth error"),
                    TCL_STATIC);
      return TCL_ERROR;
    }
  }
  return TCL_OK;
}

//>
//<stop, pause, resume

//<synchronize, stop

int Synchronize(ClientData eciHandle, Tcl_Interp *interp, int objc,
                Tcl_Obj *CONST objv[]) {
  int rc = _eciSynchronize(eciHandle);
  if (!rc) {
    Tcl_SetResult(interp, const_cast<char *>("Internal tts synth error"),
                  TCL_STATIC);
    return TCL_ERROR;
  }
  return TCL_OK;
}

int Stop(ClientData eciHandle, Tcl_Interp *interp, int objc,
         Tcl_Obj *CONST objv[]) {
  if (_eciStop(eciHandle)) {
    alsa_reset();
    memset(waveBuffer, 0, waveBufferBytes);
    usleep(10);
    return TCL_OK;
  }
  Tcl_SetResult(interp, const_cast<char *>("Could not stop synthesis"),
                TCL_STATIC);
  return TCL_ERROR;
}

//>

int SpeakingP(ClientData eciHandle, Tcl_Interp *interp, int objc,
              Tcl_Obj *CONST objv[]) {
  if (_eciSpeaking(eciHandle)) {
    Tcl_SetObjResult(interp, Tcl_NewIntObj(1));
  } else {
    Tcl_SetObjResult(interp, Tcl_NewIntObj(0));
  }
  return TCL_OK;
}

int Pause(ClientData eciHandle, Tcl_Interp *interp, int objc,
          Tcl_Obj *CONST objv[]) {
  if (_eciPause(eciHandle, 1)) return TCL_OK;
  Tcl_SetResult(interp, const_cast<char *>("Could not pause synthesis"),
                TCL_STATIC);
  return TCL_ERROR;
}

int Resume(ClientData eciHandle, Tcl_Interp *interp, int objc,
           Tcl_Obj *CONST objv[]) {
  if (_eciPause(eciHandle, 0)) return TCL_OK;
  Tcl_SetResult(interp, const_cast<char *>("Could not resume synthesis"),
                TCL_STATIC);
  return TCL_ERROR;
}

//>
//<getVersion

int getTTSVersion(ClientData eciHandle, Tcl_Interp *interp, int objc,
                  Tcl_Obj *CONST objv[]) {
  if (objc != 1) {
    Tcl_AppendResult(interp, "Usage: ttsVersion   ", TCL_STATIC);
    return TCL_ERROR;
  }
  char *version = (char *)alloca(16);
  _eciVersion(version);
  Tcl_SetResult(interp, version, TCL_STATIC);
  return TCL_OK;
}

//>
//<show alsa state

int showAlsaState(ClientData eciHandle, Tcl_Interp *interp, int objc,
                  Tcl_Obj *CONST objv[]) {
  if (objc != 1) {
    Tcl_AppendResult(interp, "Usage: alsaState   ", TCL_STATIC);
    return TCL_ERROR;
  }
  fprintf(stderr, "PCM name: '%s'\n", snd_pcm_name(AHandle));
  fprintf(stderr, "PCM state: %s\n",
          snd_pcm_state_name(snd_pcm_state(AHandle)));

  snd_pcm_dump(AHandle, Log);
  return TCL_OK;
}

//>
//<SetLanguage

int SetLanguage(ClientData eciHandle, Tcl_Interp *interp, int objc,
                Tcl_Obj *CONST objv[]) {
  int aIndex;
  const char *code = getAnnotation(interp, &aIndex);
  if (code) {
    char buffer[ANNOTATION_MAX_SIZE];
    snprintf(buffer, ANNOTATION_MAX_SIZE, "`l%s", code);
    _eciAddText(eciHandle, buffer);
  }
  return TCL_OK;
}

//>
//<end of file
// local variables:
// folded-file: t
// end:
//>
