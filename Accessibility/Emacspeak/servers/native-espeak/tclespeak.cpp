/*Id: This code comes from atcleci.cpp 4231 2006-10-13 02:43:46Z tv.raman.tv */

// Jan 2007 Gilles Casse <gcasse@oralux.org>
// * eSpeak driver for emacspeak
//
// Mar 2007
// * Language switching.
//

//<copyright info

/* Tcl ViaVoiceOutloud Interface program
   (c) Copyright 1999 by Paige Phault

   The author hereby grants permission to use, copy, modify, distribute, and
   license this software for any purpose, provided that existing copyright
   notices
   are retained in all copies and that this notice is included verbatim in any
   distributions. No written agreement, license, or royalty fee is required for
   any of the authorized uses.  Modifications to this software may be
   copyrighted
   by their authors and need not follow the licensing terms described here,
   provided that the new terms are clearly indicated on the first page of each
   file where they apply.

   IN NO EVENT SHALL THE AUTHORS OR DISTRIBUTORS BE LIABLE TO ANY PARTY FOR
   DIRECT, INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING OUT
   OF THE USE OF THIS SOFTWARE, ITS DOCUMENTATION, OR ANY DERIVATIVES THEREOF,
   EVEN IF THE AUTHORS HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

   THE AUTHORS AND DISTRIBUTORS SPECIFICALLY DISCLAIM ANY WARRANTIES, INCLUDING,
   BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
   PARTICULAR PURPOSE, AND NON-INFRINGEMENT.  THIS SOFTWARE IS PROVIDED ON AN
   "AS IS" BASIS, AND THE AUTHORS AND DISTRIBUTORS HAVE NO OBLIGATION TO PROVIDE
   MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS, OR MODIFICATIONS.
*/
//>
//<includes

#include <assert.h>
#include <espeak-ng/speak_lib.h>
#include <stdlib.h>
#include <string.h>
#include <sys/time.h>
#include <tcl.h>
#include <set>
#include <string>
#include <vector>
using std::set;
using std::string;
using std::vector;

#define PACKAGENAME "tts"
#define PACKAGEVERSION "1.0"
#define EXPORT

// using namespace std;

//>
//<decls and function prototypes

extern "C" EXPORT int Tclespeak_Init(Tcl_Interp *interp);

int SetRate(ClientData, Tcl_Interp *, int, Tcl_Obj *CONST[]);
int GetRate(ClientData, Tcl_Interp *, int, Tcl_Obj *CONST[]);
int getTTSVersion(ClientData, Tcl_Interp *, int, Tcl_Obj *CONST[]);
int Punct(ClientData, Tcl_Interp *, int, Tcl_Obj *CONST[]);
int Caps(ClientData, Tcl_Interp *, int, Tcl_Obj *CONST[]);
int Say(ClientData, Tcl_Interp *, int, Tcl_Obj *CONST[]);
int SetLanguage(ClientData, Tcl_Interp *, int, Tcl_Obj *CONST[]);
int Stop(ClientData, Tcl_Interp *, int, Tcl_Obj *CONST[]);
int SpeakingP(ClientData, Tcl_Interp *, int, Tcl_Obj *CONST[]);
int Synchronize(ClientData, Tcl_Interp *, int, Tcl_Obj *CONST[]);
int Pause(ClientData, Tcl_Interp *, int, Tcl_Obj *CONST[]);
int Resume(ClientData, Tcl_Interp *, int, Tcl_Obj *CONST[]);

static void initLanguage(Tcl_Interp *interp);
static int getLangIndex(Tcl_Interp *interp, unsigned long *theIndex);

//>
//<TclEspeakFree

void TclEspeakFree(ClientData handle) { espeak_Terminate(); }

//>
//<Tclespeak_init

int Tclespeak_Init(Tcl_Interp *interp) {
  void *handle = NULL;
  //<setup package, create tts handle

  if (Tcl_PkgProvide(interp, PACKAGENAME, PACKAGEVERSION) != TCL_OK) {
    Tcl_AppendResult(interp, "Error loading ", PACKAGENAME, NULL);
    return TCL_ERROR;
  }
  espeak_Initialize(AUDIO_OUTPUT_PLAYBACK, 512, NULL, 0);

  //>
  //<register tcl commands

  Tcl_CreateObjCommand(interp, "setRate", SetRate, (ClientData)handle,
                       TclEspeakFree);
  Tcl_CreateObjCommand(interp, "getRate", GetRate, (ClientData)handle,
                       TclEspeakFree);
  Tcl_CreateObjCommand(interp, "ttsVersion", getTTSVersion, (ClientData)handle,
                       TclEspeakFree);
  Tcl_CreateObjCommand(interp, "punct", Punct, (ClientData)handle, NULL);
  Tcl_CreateObjCommand(interp, "caps", Caps, (ClientData)handle, NULL);
  Tcl_CreateObjCommand(interp, "say", Say, (ClientData)handle, TclEspeakFree);
  Tcl_CreateObjCommand(interp, "synth", Say, (ClientData)handle, NULL);
  Tcl_CreateObjCommand(interp, "synchronize", Synchronize, (ClientData)handle,
                       TclEspeakFree);
  Tcl_CreateObjCommand(interp, "stop", Stop, (ClientData)handle, TclEspeakFree);
  Tcl_CreateObjCommand(interp, "speakingP", SpeakingP, (ClientData)handle,
                       TclEspeakFree);
  Tcl_CreateObjCommand(interp, "pause", Pause, (ClientData)handle,
                       TclEspeakFree);
  Tcl_CreateObjCommand(interp, "resume", Resume, (ClientData)handle,
                       TclEspeakFree);
  Tcl_CreateObjCommand(interp, "setLanguage", SetLanguage, (ClientData)handle,
                       TclEspeakFree);
  //>

  initLanguage(interp);
  return TCL_OK;
}

int GetRate(ClientData handle, Tcl_Interp *interp, int objc,
            Tcl_Obj *CONST objv[]) {
  int rc, rate, voice;
  if (objc != 2) {
    Tcl_AppendResult(interp, "Usage: getRate voiceCode  ", TCL_STATIC);
    return TCL_ERROR;
  }
  rc = Tcl_GetIntFromObj(interp, objv[1], &voice);
  if (rc != TCL_OK) return rc;

  rate = espeak_GetParameter(espeakRATE, 1);

  Tcl_SetObjResult(interp, Tcl_NewIntObj(rate));
  return TCL_OK;
}

int SetRate(ClientData handle, Tcl_Interp *interp, int objc,
            Tcl_Obj *CONST objv[]) {
  static int current_rate = -1;
  int rc, rate, voice;
  int success = 1;
  if (objc != 3) {
    Tcl_AppendResult(interp, "Usage: setRate voiceCode speechRate ",
                     TCL_STATIC);
    return TCL_ERROR;
  }
  rc = Tcl_GetIntFromObj(interp, objv[1], &voice);
  if (rc != TCL_OK) return rc;
  rc = Tcl_GetIntFromObj(interp, objv[2], &rate);
  if (rc != TCL_OK) return rc;

  if (rate != current_rate) {
    success = (espeak_SetParameter(espeakRATE, rate, 0) == EE_OK);
    if (success) current_rate = rate;
  }
  return success ? TCL_OK : TCL_ERROR;
}

//>
//<say

static bool closeTags(string input, string &output) {
  char *tag_orig = (char *)malloc(sizeof(char) * (input.size() + 1));
  strncpy(tag_orig, input.c_str(), input.size());
  output = "";

  // check that a text (non whitespace) is present
  char *tag = tag_orig;
  int a_tag_count = 0;
  bool a_text_is_present = false;

  while (*tag) {
    if (*tag == '<') {
      a_tag_count++;
    }
    if ((a_tag_count == 0) && (*tag != ' ') && (*tag != '\n') &&
        (*tag != '\r') && (*tag != '\t')) {
      a_text_is_present = true;
      break;
    }
    if ((*tag == '>') && a_tag_count) {
      a_tag_count--;
    }
    tag++;
  }

  if (a_text_is_present) {
    tag = tag_orig;
    while (tag) {
      // look for a '<'
      tag = strrchr(tag_orig, '<');

      if (tag) {
        char *end = strchr(tag, ' ');
        if (!end && (NULL == strchr(tag, '/'))) {
          end = strchr(tag, '>');
        }
        if (end && (tag + 1 < end)) {
          *end = 0;
          output += "</" + string(tag + 1) + ">";
        }
        *tag = 0;
      }
    }
  }

  free(tag_orig);

  return a_text_is_present;
}

int Say(ClientData handle, Tcl_Interp *interp, int objc,
        Tcl_Obj *CONST objv[]) {
  int i;
  for (i = 1; i < objc; i++) {
    char *a_text = (char *)Tcl_GetStringFromObj(objv[i], NULL);
    if (a_text) {
      string a_begin_ssml = a_text;
      string a_end_ssml;
      if (closeTags(a_begin_ssml, a_end_ssml)) {
        string a_ssml = a_begin_ssml + a_end_ssml;

        unsigned int unique_identifier = 0;
        espeak_Synth(a_ssml.c_str(), a_ssml.length() + 1, 0, POS_CHARACTER, 0,
                     espeakCHARS_UTF8 | espeakSSML, &unique_identifier, NULL);
      }
    }
  }
  return TCL_OK;
}

//>
//<stop, pause, resume

//<synchronize, stop

int Synchronize(ClientData handle, Tcl_Interp *interp, int objc,
                Tcl_Obj *CONST objv[]) {
  espeak_Synchronize();

  return TCL_OK;
}

int Stop(ClientData handle, Tcl_Interp *interp, int objc,
         Tcl_Obj *CONST objv[]) {
  espeak_Cancel();
  return TCL_OK;
}

//>

int SpeakingP(ClientData handle, Tcl_Interp *interp, int objc,
              Tcl_Obj *CONST objv[]) {
  if (espeak_IsPlaying()) {
    Tcl_SetObjResult(interp, Tcl_NewIntObj(1));
  } else {
    Tcl_SetObjResult(interp, Tcl_NewIntObj(0));
  }
  return TCL_OK;
}

int Pause(ClientData handle, Tcl_Interp *interp, int objc,
          Tcl_Obj *CONST objv[]) {
  // TBD: need a forthcoming eSpeak service.
  return TCL_OK;
}

int Resume(ClientData handle, Tcl_Interp *interp, int objc,
           Tcl_Obj *CONST objv[]) {
  // TBD: need a forthcoming eSpeak service.
  return TCL_OK;
}

//>
//<setOutput:NoOp

int setOutput(ClientData handle, Tcl_Interp *interp, int objc,
              Tcl_Obj *CONST objv[]) {
  return TCL_OK;
}

//>
//< Caps

int Caps(ClientData handle, Tcl_Interp *interp, int objc,
         Tcl_Obj *CONST objv[]) {
  static const char *current_mode = "";
  char *a_mode = (char *)Tcl_GetStringFromObj(objv[1], NULL);
  if (a_mode && strcmp(a_mode, current_mode)) {
    int a_type = 0;  // none

    if (strcmp(a_mode, "tone") == 0) {
      a_type = 1;
      current_mode = "tone";
    } else if (strcmp(a_mode, "spelling") == 0) {
      a_type = 2;
      current_mode = "spelling";
    } else if (strcmp(a_mode, "pitch") == 0) {
      a_type = 30;
      current_mode = "pitch";
    } else if (strcmp(a_mode, "none") == 0) {
      current_mode = "none";
      // a_type is already 0 (none).  No need to assign.
    }

    espeak_SetParameter(espeakCAPITALS, a_type, 0);
  }
  return TCL_OK;
}

//>
//< Punct

int Punct(ClientData handle, Tcl_Interp *interp, int objc,
          Tcl_Obj *CONST objv[]) {
  char *a_mode = (char *)Tcl_GetStringFromObj(objv[1], NULL);
  static const char *current_mode = "";
  if (a_mode && strcmp(a_mode, current_mode)) {
    espeak_PUNCT_TYPE a_type = espeakPUNCT_NONE;

    if (strcmp(a_mode, "none") == 0) {
      a_type = espeakPUNCT_NONE;
      current_mode = "none";
    } else if (strcmp(a_mode, "all") == 0) {
      a_type = espeakPUNCT_ALL;
      current_mode = "all";
    } else if (strcmp(a_mode, "some") == 0) {
      a_type = espeakPUNCT_SOME;
      current_mode = "some";
    }

    espeak_SetParameter(espeakPUNCTUATION, a_type, 0);
  }
  return TCL_OK;
}

//>
//<getVersion

int getTTSVersion(ClientData handle, Tcl_Interp *interp, int objc,
                  Tcl_Obj *CONST objv[]) {
  if (objc != 1) {
    Tcl_AppendResult(interp, "Usage: ttsVersion   ", TCL_STATIC);
    return TCL_ERROR;
  }

  const char *_path = (char *)malloc(16);
  char *version = (char *)malloc(16);
  strncpy(version, espeak_Info(&_path), 16);
  Tcl_SetResult(interp, version, TCL_STATIC);
  return TCL_OK;
}

//>
//<SetLanguage

static vector<string> available_languages;

static void SetLanguageHelper(Tcl_Interp *interp, size_t aIndex) {
  espeak_VOICE *current_voice = NULL;
  espeak_VOICE a_voice;
  memset(&a_voice, 0, sizeof(espeak_VOICE));
  a_voice.languages = (char *)available_languages[aIndex].c_str();
  a_voice.gender = 1;
  espeak_SetVoiceByProperties(&a_voice);
  current_voice = espeak_GetCurrentVoice();
  Tcl_SetVar(interp, "voicename", current_voice->name, 0);
  // But what if we couldn't set the voice?  Need some better error handling.
  return;
}

int SetLanguage(ClientData eciHandle, Tcl_Interp *interp, int objc,
                Tcl_Obj *CONST objv[]) {
  unsigned long aIndex = 0;

  if (getLangIndex(interp, &aIndex)) {
    SetLanguageHelper(interp, aIndex);
  }
  return TCL_OK;
}

//>
//<initLanguage, getLangIndex

static vector<string> ParseLanguages(const char *lang_str) {
  vector<string> voice_langs;
  const char *p = lang_str;
  // The languages string is a string of (priority-byte, language-name)
  // pairs.  Each language name ends with a NUL byte, and the whole string
  // ends with a NUL.  So in BNF:
  // (priority-byte text NUL-byte)* NUL-byte
  // We can ignore the priority byte for now.  Revisit it later?
  while (*p) {
    voice_langs.push_back(string(p + 1));
    p += strlen(p + 1) + 2;
  }
  return voice_langs;
}

static void initLanguage(Tcl_Interp *interp) {
  // List the available languages
  set<string> unique_languages;
  int i = 0;
  unsigned long ui = 0;
  char *envDefaultLang = (char *)getenv("LANGUAGE");
  if (envDefaultLang == NULL) {
    envDefaultLang = (char *)getenv("LANG");
    if (envDefaultLang == NULL) {
      envDefaultLang = (char *)"en";
    }
  }
  string aDefaultLang = envDefaultLang;
  size_t remove = aDefaultLang.find('.', 0);

  // Snip off everything following a period.  So en-us.utf8 becomes en-us.
  if (remove != string::npos) {
    aDefaultLang.erase(aDefaultLang.begin() + remove, aDefaultLang.end());
  }
  // And replace _ with -, E.G. en_US becomes en-US.
  for (string::iterator it = aDefaultLang.begin(); it != aDefaultLang.end();
       it++) {
    if (*it == '_') {
      *it = '-';
    }
  }

  const espeak_VOICE **voices = espeak_ListVoices(NULL);

  for (i = 0; voices[i] != 0; i++) {
    vector<string> voice_langs = ParseLanguages(voices[i]->languages);
    unique_languages.insert(voice_langs.begin(), voice_langs.end());
  }
  available_languages.assign(unique_languages.begin(), unique_languages.end());
  vector<string>::iterator it;
  size_t lang_count = available_languages.size();
  size_t english_index = lang_count;
  size_t default_index = lang_count;
  char buffer[256];
  for (ui = 0; ui < lang_count; ui++) {
    const char *aLangCode = available_languages[ui].c_str();
    snprintf(buffer, sizeof(buffer), "%lu", ui);
    Tcl_SetVar2(interp, "langalias", aLangCode, buffer, 0);
    Tcl_SetVar2(interp, "langcode", buffer, aLangCode, 0);
    if (default_index == lang_count) {
      if (strcasecmp(aDefaultLang.c_str(), aLangCode) == 0) {
        Tcl_SetVar2(interp, "langsynth", "current", buffer, 0);
        Tcl_SetVar2(interp, "langcode", "current", (char *)aLangCode, 0);
        default_index = ui;
      }
    }
    if (strcmp(aLangCode, "en") == 0) {
      english_index = ui;
    }
  }
  if ((default_index == lang_count) && (english_index == lang_count)) {
    fprintf(stderr, "Could not find your default language, and English\n");
    fprintf(stderr, "doesn't seem to be available either.  Bailing now.\n");
    exit(1);
  }
  if (default_index == lang_count) {
    default_index = english_index;
    fprintf(stderr, "Couldn't find your default language, using English.\n");
    snprintf(buffer, sizeof(buffer), "%lu", english_index);
    Tcl_SetVar2(interp, "langsynth", "current", buffer, 0);
    Tcl_SetVar2(interp, "langcode", "current", "en", 0);
  }
  SetLanguageHelper(interp, default_index);
  // Presumably we have at least one language, namely English,
  // so no chance of underflowing size_t with this subtraction:
  snprintf(buffer, sizeof(buffer), "%lu", lang_count - 1);
  Tcl_SetVar2(interp, "langsynth", "top", buffer, 0);
}

static int getLangIndex(Tcl_Interp *interp, unsigned long *theIndex) {
  int aStatus = 0;
  const char *aInfo = Tcl_GetVar2(interp, "langsynth", "current", 0);
  char *end = NULL;
  if (aInfo) {
    *theIndex = strtoul(aInfo, &end, 10);

    if (end && !*end) {
      if ((*theIndex > 0) && (*theIndex < available_languages.size())) {
        aStatus = 1;
      }
    }
  }
  return aStatus;
}

//>
//<end of file
// local variables:
// folded-file: t
// end:
//>
