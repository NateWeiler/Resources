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
#ifndef __TGSCREEN_H__
#define __TGSCREEN_H__

namespace TGUI
{

    class _TGUIExport TGScreen : public TGControl
    {
        int			width;
        int			height;
        int     	mouseX;
        int     	mouseY;

    public:
        TGScreen(TGControl* parent=NULL, TGString name="");
        virtual ~TGScreen();
        virtual TGScreen *activate();
        virtual void deactivate();

        int getWidth() {return width;};
        int getHeight() {return height;};
        virtual void onMouseEnter();
        virtual void onMouseExit();

        int getMouseX() {return mouseX;};
        int getMouseY() {return mouseY;};
        void setMouseX(int value) {mouseX = value;};
        void setMouseY(int value) {mouseY = value;};
        virtual TGString getControlType() {return "TGScreen";};

    };

}
#endif
