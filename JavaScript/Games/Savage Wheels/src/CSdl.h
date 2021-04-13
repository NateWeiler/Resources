/*
    Copyright (c) 2003-2010 KenamicK Entertainment

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation
    files (the "Software"), to deal in the Software without
    restriction, including without limitation the rights to use,
    copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following
    conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
    OTHER DEALINGS IN THE SOFTWARE.

*/

#ifndef __CSDL
#define __CSDL

////classes//////////////
class CGame;
class CSound;
class CKdf_Packeger;
/////////////////////////

#define RELEASE_SURF( surf ) if ( (surf) != NULL ) { SDL_FreeSurface( surf ); surf = NULL; }

//#define FONT_TTF						// use TTF_FONTS

#define MAX_SPRITES  60 				// maximum sprites to blit in one flip
#define NO_COLORKEY  -1
#define NO_ALPHA	 255
#define MAX_SOUNDS	 30					// maximum sounds to load

#define MOUSE_BUTTON_UNPRESSED	0
#define MOUSE_BUTTON_UP			1
#define MOUSE_BUTTON_DOWN		2
#define JOY_AXIS_UP			    1
#define JOY_AXIS_DOWN			2
#define JOY_AXIS_LEFT			3
#define JOY_AXIS_RIGHT			4
#define JOY_AXIS_NONE		    5
#define ANALOG_THRESHOLD 		20000

/*
 * Video and color definitions
 * Note that we handle 15bit, 16bit and 24bit video adapters
 */
#define BLACK		   0x0
#define WHITE		   0xFFFFFF
#define MAGENTA_888	   0xFF00FF
#define MAGENTA_565	   0xF81F		
#define MAGENTA_555	   0x7C1F
#define MAGENTA 	   MAGENTA_888
#define SHADOW_MASK565 0xF7DE
#define SHADOW_MASK555 0xFBDE
#define SHADOW_MASK888 0xFEFEFE

// #ifdef RGB_MODE555
//  #define RGB_16BIT(r,g,b) ( ((r) << 10) | ((g) << 5) | (b) ) 
// #else
//  #define RGB_16BIT(r,g,b) ( ((r) << 11) | ((g) << 5) | (b) ) 
// #endif

#define FMOD_SNDGROUP_SOUNDS	"SWSOUNDS"
#define FMOD_SNDGROUP_MUSIC		"SWMUSIC"

/*
 * Class that represents single sound or music entity
 */
class CSound
{
public:
	CSound()
		: buffered(false),
		  play_channel(-1),
		  loaded(false),
#if WITH_FMOD
		  sound(NULL),
#elif WITH_SDLMIXER
		  sound(NULL),
		  music(NULL),
#endif
		  isMusic(false) {};

	~CSound() {};

	bool buffered;		// buffered sound?
	int play_channel;	// unbuffered sounds do not need separate channels
	bool loaded;
#ifdef WITH_FMOD
	FMOD_SOUND *sound;
#elif WITH_SDLMIXER
	Mix_Chunk *sound;
	Mix_Music *music;
#endif
	bool isMusic;		// is this a music type of sound?
	
	void Release();
};


/*
 * All-purpose engine kind of class that handles gfx & sound initialization and operations.
 */
class CSdl 
{
protected:

	/*
	 * Graphics
	 */
	struct STRUCT_BLIT {
		Sint32 x, y, z;
		SDL_Surface *surf;
	};

	// main SDL screen buffer
	SDL_Surface *screen;

	// buffer that holds sprites to render on next SDL flip
	STRUCT_BLIT surface[MAX_SPRITES];

	// number of sprites to render on next SDL flip
	Uint32 num_surfaces;

	int mouse_x, mouse_y;
	int mouse_lbutton, mouse_rbutton;

	Uint16 magenta16;
	Uint16 shadow_mask16;
	Uint16 bytes_per_color;
	CGame *_game;

#ifdef FONT_TTF
	TTF_Font *font_ttf;
#else
	SDL_Surface *font_bmp;
	Uint16 font_size;
#endif

	/*
	 * Sound
	 */
#ifdef WITH_FMOD
	FMOD_SYSTEM *fmod_system;
	FMOD_CHANNEL *fmod_musicChannel;
	FMOD_SOUNDGROUP *fmod_groupSounds;
	FMOD_SOUNDGROUP *fmod_groupMusic;
#endif

	// flag that says if sound initialization was OK
	bool bsound_initialized;

	CSound sounds[MAX_SOUNDS];
	float volume_sound;
	float volume_music;

	/*
	 * Input
	 */
	SDL_Joystick *_joystick;
	bool _bJoystickSupport;
	int _nJoystickDevices;
	int _nJoystickIdxDeviceToUse;
	Sint16 _xJoystick;
	Sint16 _yJoystick;

	typedef std::vector<int> udtButtonsBuffer;
	udtButtonsBuffer _JoystickButtons;

	int JoystickAxisX;
	int JoystickAxisY;
	Uint8 JoystickHatState;
	Uint8 *keys;				// array of pressed (held down) keys

private:
	bool InitializeSound();

	void	BlitAll();
	Uint32	GetPixel(SDL_Surface *surface, int x, int y);
	bool	Slock( SDL_Surface *surface );
	void	Sunlock( SDL_Surface *surface );
	int		ClipRect( int *x , int *y, SDL_Rect *rSurf );
//	SDL_Surface* LoadBitmap( char *filename, long file_offset, Uint32 file_size, Uint32 color_key = NO_COLORKEY, Uint16 alpha_value = NO_ALPHA);

	void BlitShadow16( Sint32 x, Sint32 y, Uint32 *mask, SDL_Rect *rsurf );
	void BlitShadow32( Sint32 x, Sint32 y, Uint32 *mask, SDL_Rect *rsurf );
	void BlitShadow16( Sint32 x, Sint32 y, SDL_Surface *surf );
	void BlitShadow32( Sint32 x, Sint32 y, SDL_Surface *surf );
	void MakeBoolMask16( SDL_Surface *surf, Uint32 *& );
	void MakeBoolMask32( SDL_Surface *surf, Uint32 *& );

public:
	CSdl();
	~CSdl() {};

	bool Initialize( CGame *game, int nWidth, int nHeight, int nBpp, bool bFullscreen, bool bHardware = false );

	/*
	 * SDL graphics & general methods
	 */
	void Close();
	void Flip();
	void FlipTo( SDL_Surface *dest_surf );
	void ToggleFullscreen();
	bool AddToBlit( Sint32 x, Sint32 y, SDL_Surface *surf );
	void BlitNow( Sint32 x, Sint32 y, SDL_Surface *surf );
	void BlitNow( Sint32 x, Sint32 y, SDL_Surface *surf, SDL_Rect *rsurf );
	void BlitShadow( Sint32 x, Sint32 y, Uint32 *mask, SDL_Rect *rsurf );
	void BlitShadow( Sint32 x, Sint32 y, SDL_Surface *surf);
	bool Collide( SDL_Rect *r_result, SDL_Rect *r1, SDL_Rect *r2);
	bool Collide( SDL_Rect *r1, Uint32 *mask1, SDL_Rect *r2, Uint32 *mask2, SDL_Rect *rectResult = NULL );
	void MakeBoolMask( SDL_Surface *surf, Uint32 *& );
	//SDL_Surface* LoadBitmap( char *filename, Uint32 color_key = NO_COLORKEY, Uint8 alpha_value = NO_ALPHA );
	//SDL_Surface* LoadBitmap( char *filename, long file_offset, Uint32 file_size, Uint32 color_key = NO_COLORKEY, Uint8 alpha_value = NO_ALPHA );
	SDL_Surface* LoadBitmap( const char *filename, Uint32 color_key = NO_COLORKEY, Uint8 alpha_value = NO_ALPHA );
	SDL_Surface* LoadBitmap( const char *filename, int32_t file_offset, Uint32 file_size, Uint32 color_key = NO_COLORKEY, Uint16 alpha_value = NO_ALPHA);
	SDL_Surface* CreateEmptySurface( int width, int height );
	void	SetRect( SDL_Rect *rect, int x, int y, int width, int height );
	SDL_Color CreateColor( int r, int g, int b, int a );
	SDL_Color CreateColor( int r, int g, int b );

	/*
	 * SDL_font methods
	 */
#ifdef FONT_TTF
	void InitializeFont( int fontsize = 12 );
	void DrawText( int x, int y, char *text, SDL_Color forecolor );
	void DrawText( int x, int y, char *text, SDL_Color forecolor, SDL_Color backcolor );
#else
	void InitializeFont();
	void DrawNum( int x, int y, char *text );
#endif

	/*
	 * Input methods
	 */
	bool InitializeJoystick();
	bool AcquireJoystick();
	void UnAcquireJoystick();
	void ReleaseJoystick();
	void GetInput();
	bool GetJoystickButtonPressed(int idx);
	int GetMouseX() { return mouse_x; };
	int GetMouseY() { return mouse_y; };
	int GetMouseLButton() { return mouse_lbutton; };
	int GetMouseRButton() { return mouse_rbutton; };
	bool IsJoystickHatState(int state);
	bool IsKeyPressed(int keyIndex);

	/*
	 * Sound methods
	 */
#ifdef WITH_FMOD
	static bool IsFModOK(FMOD_RESULT result);
#endif
	int  LoadSound( const char *filename, bool buffered_sound, bool isMusic = false );
	void PlaySound( int snd_index, int position = -1 );
	void PlayMusic( int snd_index, bool looped );
	void StopMusic();
	bool IsMusicPlaying();
	//Mix_Chunk* LoadWav( char *filename, long file_offset, Uint32 file_size );

	float GetSoundVolume() { return volume_sound; };
	float GetMusicVolume() { return volume_music; };
	void SetSoundVolume( float );
	void SetMusicVolume( float );
	void ChangeSoundVolume( float );
	void ChangeMusicVolume( float );
	static float GetDefaultVolume();
	static float GetMaxVolume();
};


#endif
