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
#include <tgui.h>

namespace TGUI
{

    //-----------------------------------------------------------------------
    //                          T G C h e c k B o x
    //-----------------------------------------------------------------------
    TGCheckBox::TGCheckBox(TGControl *parent, TGString name, TGString caption)
        : TGControl(parent, name)
        , m_caption(caption)
        , m_hover(false)
        , m_pushed(false)       
    {
        m_checked.setControl(this);
        m_checked.set(false);
    }

    //-----------------------------------------------------------------------
    //                         ~ T G C h e c k B o x
    //-----------------------------------------------------------------------
    TGCheckBox::~TGCheckBox()
    {
    }

    //-----------------------------------------------------------------------
    //                           s e t C a p t i o n
    //-----------------------------------------------------------------------
    void TGCheckBox::setCaption(TGString newCaption)
    {
        m_caption = newCaption;
    }

    //-----------------------------------------------------------------------
    //                             r e n d e r
    //-----------------------------------------------------------------------
    void TGCheckBox::render()
    {
        if(isRenderCached())
            return;
        int			x1, y1, x2, y2, bsize;
        TGFrameStyle	fs = FS_FLAT;
        getBounds(x1, y1, x2, y2);

        bsize = y2 - y1;

        if (m_hover)
            fs = m_pushed?FS_LOWERED:FS_RAISED;
        else
            fs = FS_FLAT;

        drawFrame(x1, y1, x1 + bsize, y2, fs);

        TGSBrush brush;


        if (m_checked.get())
        {
            if (m_hover)
                brush = m_theme.getFrameFocusedBrush();
            else
                brush = m_theme.getBaseBright();

            drawLine(x1, y1, x1 + bsize, y2, brush);
            drawLine(x1 + bsize, y1, x1, y2, brush);
        }

        if (m_hover)
            brush = m_theme.getTextFocusedBrush();
        else
            brush = m_theme.getTextBrush();

        drawString(x1 + bsize + 4,
            (y2-y1 + 1)/2 + y1 - (int)stringHeight()/2,
            m_caption,brush);
    }

    //-----------------------------------------------------------------------
    //                            s e t S t a t e
    //-----------------------------------------------------------------------
    void TGCheckBox::setState(bool checked)
    {
        if (checked != m_checked.get())
        {
            m_checked.set(checked);
            fireEvent(TGEvent::Modified,TGEventArgs(this));
        }
    }

    //-----------------------------------------------------------------------
    //                            g e t S t a t e
    //-----------------------------------------------------------------------
    bool TGCheckBox::getState()
    {
        return m_checked.get();
    }

    //-----------------------------------------------------------------------
    //                         o n M o u s e D o w n
    //-----------------------------------------------------------------------
    void TGCheckBox::onMouseDown(int x, int y, int b)
    {
        focus();
        if (b == LeftButton)
        {
            setMouseTrackingControl(this);
            m_pushed = true;
            redraw();
        }
    }

    //-----------------------------------------------------------------------
    //                          o n M o u s e U p
    //-----------------------------------------------------------------------
    void TGCheckBox::onMouseUp(int x, int y, int b)
    {
        if (!focused())
            return;
        if (b == LeftButton && m_pushed)
        {
            setMouseTrackingControl(NULL);
            if (m_hover)
            {
                m_checked.set(!m_checked.get());
                fireEvent(TGEvent::Modified,TGEventArgs(this));
            }
            redraw();
        }
        m_pushed = false;
    }

    //-----------------------------------------------------------------------
    //                        o n M o u s e E n t e r
    //-----------------------------------------------------------------------
    void TGCheckBox::onMouseEnter()
    {
        TGControl::onMouseEnter();
        m_hover = true;
    }

    //-----------------------------------------------------------------------
    //                        o n M o u s e E x i t 
    //-----------------------------------------------------------------------
    void TGCheckBox::onMouseExit(int x, int y)
    {
        TGControl::onMouseExit(x,y);
        m_hover = false;
    }
}