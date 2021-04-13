//-----------------------------------------------------------------------------
// This source file is part of TGUI (Tiny GUI)
//
// Copyright (c) 2006-2007 Tubras Software, Ltd
// Also see acknowledgements in Readme.html
//
// Permission is hereby granted, free of charge, to any person obtaining a copy 
// of this software and associated documentation files (the "Software"), to deal 
// in the Software without restriction, including without limitation the rights to 
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies 
// of the Software, and to permit persons to whom the Software is furnished to 
// do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all 
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
// THE SOFTWARE.
//-----------------------------------------------------------------------------
#ifndef __TGSYSTEM_H__
#define __TGSYSTEM_H__

namespace TGUI
{
    typedef std::list<TGTheme*> TGThemeStack;

    class _TGUIExport TGSystem : public TGSingleton<TGUI::TGSystem>
    {
    protected:
        TGRenderer*         m_renderer;
        TGScreen*           m_activeScreen;
        TGTexture*          m_texture;
        TGControl*          m_childUnderMouse;
        TGControl*          m_lastChildUnderMouse;
        TGControl*          m_trackControl;
        TGFont*             m_currentFont;
        TGControl*	        m_keyboardFocusControl;
        TGCursor*           m_mouseCursor;
        TGLogger*           m_logger;
        TGTheme             m_currentTheme;
        TGThemeStack        m_themeStack;
        TGControlList       m_dead;
        TGString            m_version;
        TGModList           m_modifiers;

        TGFont*             m_defaultFont;
        TGCursor*           m_defaultCursor;
        TGScreen*           m_defaultScreen;
        TGQuadList          m_cache;
        TGPopupMenu*        m_activePopup;
        TGEventHandler*     m_eventHook;

    private:
        void createDefaultCursor();

    public:
        TGSystem(Ogre::RenderWindow* window, Ogre::SceneManager* sceneMgr,TGString defaultFont);
        ~TGSystem();

        static TGSystem& getSingleton(void);
        static TGSystem* getSingletonPtr(void);
        void setActiveScreen(TGScreen* value) {m_activeScreen = value;};
        TGRenderer* getRenderer() {return m_renderer;};
        TGScreen* getActiveScreen() {return m_activeScreen;};
        TGTexture* getDefaultTexture() {return m_texture;};

        TGString getVersion() {return m_version;}

        void setMouseCursor(TGCursor* cursor);
        TGCursor* getMouseCursor() {return m_mouseCursor;};

        void getMouseCoordinates(int& x, int& y);

        TGQuadList& getCache() {return m_cache;};

        void setLogger(TGLogger* logger);
        TGLogger* getLogger();
        void logMessage(TGString message);

        TGTheme getTheme() {return m_currentTheme;};
        void setTheme(TGTheme theme,bool updateChildren=false);
        void pushTheme(TGTheme* theme);
        TGTheme* popTheme();

        TGFont* loadFont(TGString fontName,TGString resourceGroup="");
        TGFont* getCurrentFont() {return m_currentFont;};
        void setCurrentFont(TGFont* font) {m_currentFont = font;};

        void setActivePopup(TGPopupMenu* value) {m_activePopup = value;};

        void setMouseTrackingControl(TGControl *control) {m_trackControl = control;};
        TGControl* getMouseTrackControl() {return m_trackControl;};

        void setKeyboardFocusControl(TGControl *control);
        bool hasKeyboardFocus(TGControl *control);
        void invalidateControl(TGControl *control);
        void destroyControl(TGControl *control);

        TGEventHandler* setEventHook(TGEventHandler* hook);

        bool eventHook(TGEventArgs& args);

        void injectMouseMove(int relX, int relY);
        void injectMouseButtonDown(int relX, int relY, int buttonID);
        void injectMouseButtonUp(int relX, int relY, int buttonID);
        void injectKeyDown(int key,unsigned char ascii);
        void injectKeyUp(int key,unsigned char ascii);
        void injectTimePulse(TGReal timeElapsed);

        void getCursorPos(int& x, int& y);

        void addModifier(TGModifier* mod);
        void removeModifier(TGModifier* mod);

        void renderGUI();
    };

    class TGResourceLoader : public Ogre::ManualResourceLoader
    {
    public:
        TGResourceLoader() : ManualResourceLoader() {}
        virtual ~TGResourceLoader() {}

        /** Called when a resource wishes to load.
        @param resource The resource which wishes to load
        */
        virtual void loadResource(Ogre::Resource* resource);
    };


}
#endif