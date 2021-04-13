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
    //                          T G S c r o l l B o x 
    //-----------------------------------------------------------------------
    TGScrollBox::TGScrollBox(TGControl *parent, TGString name)
        : TGControl(parent, name)
    {
        setPadding(2, 2, 14, 16);
        hScroll = 0.0f;
        vScroll = 0.0f;
        scrolling = 0;
        setScrollingBounds(1, 1);
    }

    //-----------------------------------------------------------------------
    //                         ~ T G S c r o l l B o x 
    //-----------------------------------------------------------------------
    TGScrollBox::~TGScrollBox()
    {
    }

    //-----------------------------------------------------------------------
    //                    s e t S c r o l l i n g B o u n d s
    //-----------------------------------------------------------------------
    void TGScrollBox::setScrollingBounds(TGReal hMax, TGReal vMax)
    {
        TGReal   oldHScroll = hScroll, oldVScroll = vScroll;
        if (hMax < 1.0f)
            hMax = 1.0f;
        if (vMax < 1.0f)
            vMax = 1.0f;
        hScrollMax = hMax;
        vScrollMax = vMax;
        clientWidth = hMax - (x2 - x1 - 16);
        clientHeight = vMax - (y2 - y1 - 16);
        if (clientWidth > 0.0f && hScroll > clientWidth)
            hScroll = clientWidth;
        else
            if (clientWidth <= 0.0f)
                hScroll = 0;
        if (clientHeight > 0.0f && vScroll > clientHeight)
            vScroll = clientHeight;
        else
            if (clientHeight <= 0.0f)
                vScroll = 0;
        if (oldHScroll != hScroll || oldVScroll != vScroll)
        {
            onScroll(hScroll - oldHScroll, vScroll - oldVScroll);
            fireEvent(TGEvent::Scrolled,TGEventArgs(this));
        }
    }

    //-----------------------------------------------------------------------
    //                        s e t V S c r o l l P o s
    //-----------------------------------------------------------------------
    void TGScrollBox::setVScrollPos(TGReal value)
    {
        if( value < 0 )
            return;

        if( value > vScrollMax)
            value = vScrollMax;

        vScroll = value;
    }

    //-----------------------------------------------------------------------
    //                             r e n d e r
    //-----------------------------------------------------------------------
    void TGScrollBox::render()
    {
        if(isRenderCached())
            return;

        int	x1, y1, x2, y2;
        getBounds(x1, y1, x2, y2);

        TGSBrush brush;
        brush = m_theme.getBaseOpaque();
        fillRect(x1,y1,x2,y2,brush);

        if(focused())
            brush = m_theme.getFrameFocusedBrush();
        else brush = m_theme.getFrameBrush();
        drawRect(x1,y1,x2,y2, brush);        
        drawLine(x2 - 12, y1, x2 - 12, y2, brush);
        drawLine(x1, y2 - 12, x2, y2 - 12, brush);

        int	x = x1, y = y1 + 1;

        if(focused())
            brush = m_theme.getFrameFocusedBrush();
        else brush = m_theme.getFrameBrush();

        if (clientHeight > 0.0f)
        {
            if (vScroll != 0.0f)
                y = (int)((y2 - y1 - 24)*vScroll/clientHeight + y1);
            fillRect(x2 - 12, y-1, x2-1, y + 11, brush);
        }

        if (clientWidth > 0.0f)
        {
            if (hScroll != 0.0f)
                x = (int)((x2 - x1 - 24)*hScroll/clientWidth + x1 + 1);
            fillRect(x, y2 - 12, x + 11, y2-1, brush);
        }

        brush = m_theme.getBase();

        fillRect(x1, y1 + 1, x2 - 13, y2 - 13, brush);
        TGControl::render();
    }

    //-----------------------------------------------------------------------
    //                             s e t B o u n d s
    //-----------------------------------------------------------------------
    void TGScrollBox::setBounds(int x1, int y1, int x2, int y2)
    {
        TGControl::setBounds(x1, y1, x2, y2);
        clientWidth = hScrollMax - (x2 - x1 - 16);
        clientHeight = vScrollMax - (y2 - y1 - 16);
    }

    //-----------------------------------------------------------------------
    //                          o n M o u s e D o w n
    //-----------------------------------------------------------------------
    void TGScrollBox::onMouseDown(int x, int y, int b)
    {
        int   x1, y1, x2, y2;
        if (b != LeftButton)
            return;
        focus();
        getBounds(x1, y1, x2, y2);

        // vertical scrolling ?
        if (clientHeight > 0.0f && x >= x2 - 12 && y <= y2 - 12)
        {
            scrolling = 1;
            setMouseTrackingControl(this);
            onMouseMoved(x, y);
            return;
        }

        // horizontal scrolling ?
        if (clientWidth > 0.0f && y >= y2 - 12 && x <= x2 - 12)
        {
            scrolling = 2;
            setMouseTrackingControl(this);
            onMouseMoved(x, y);
            return;
        }
    }

    //-----------------------------------------------------------------------
    //                             l a y o u t
    //-----------------------------------------------------------------------
    void TGScrollBox::layout()
    {
        TGReal   hMax = 1.0f, vMax = 1.0f;

        TGControl* child;
        for (TGControlListItr itr = m_children.begin();itr != m_children.end(); ++itr)
        {
            child = *itr;
            if (child->x2 > hMax)
                hMax = child->x2;
            if (child->y2 > vMax)
                vMax = child->y2;
        }
        setScrollingBounds(hMax, vMax+1.0f);
        redraw();
    }

    //-----------------------------------------------------------------------
    //                       p o i n t I n C o n t r o l
    //-----------------------------------------------------------------------
    bool TGScrollBox::pointInControl(TGReal x, TGReal y)
    {

        return TGControl::pointInControl(x,y);
    }

    //-----------------------------------------------------------------------
    //                           c h i l d A t
    //-----------------------------------------------------------------------
    TGControl* TGScrollBox::childAt(TGReal x, TGReal y)
    {
        int	x1, y1, x2, y2;
        getBounds(x1, y1, x2, y2);

        if( (x >= x1) && (y >= y1) && (x < (x2-12)) && (y < (y2-12)) )
            return TGControl::childAt(x,y);

        return this;
    }

    //-----------------------------------------------------------------------
    //                            o n S c r o l l
    //-----------------------------------------------------------------------
    void TGScrollBox::onScroll(TGReal hd, TGReal vd)
    {
        TGControl* child;
        for (TGControlListItr itr = m_children.begin();itr != m_children.end(); ++itr)
        {
            child = *itr;
            child->xShift = (int)hScroll;
            child->yShift = (int)vScroll;
        }
    }

    //-----------------------------------------------------------------------
    //                          o n M o u s e M o v e d
    //-----------------------------------------------------------------------
    void TGScrollBox::onMouseMoved(int x, int y)
    {
        int	x1, y1, x2, y2;
        TGReal	oldHScroll, oldVScroll;
        if (!scrolling)
            return;
        getBounds(x1, y1, x2, y2);

        oldHScroll = hScroll;
        oldVScroll = vScroll;

        if (scrolling == 1)
        {
            vScroll = (TGReal)(y - y1 - 6)*clientHeight/(TGReal)(y2 - y1 -24);
            if (vScroll > clientHeight)
                vScroll = clientHeight;
            else
                if (vScroll < 0.0f)
                    vScroll = 0.0f;
        }
        else
        {
            hScroll = (TGReal)(x - x1 - 6)*clientWidth/(TGReal)(x2 - x1 - 24);
            if (hScroll > clientWidth)
                hScroll = clientWidth;
            else
                if (hScroll < 0.0f)
                    hScroll = 0.0f;
        }

        if (oldHScroll != hScroll || oldVScroll != vScroll)
        {
            onScroll(hScroll - oldHScroll, vScroll - oldVScroll);
            fireEvent(TGEvent::Scrolled,TGEventArgs(this));
        }
        redraw();
    }

    //-----------------------------------------------------------------------
    //                          o n M o u s e U p 
    //-----------------------------------------------------------------------
    void TGScrollBox::onMouseUp(int x, int y, int b)
    {
        if (!scrolling)
            return;
        scrolling = 0;
        setMouseTrackingControl(NULL);
    }

    //-----------------------------------------------------------------------
    //                          o n M o u s e E n t e r
    //-----------------------------------------------------------------------
    void TGScrollBox::onMouseEnter()
    {
        m_mouseOverControl = true;
    }

    //-----------------------------------------------------------------------
    //                          o n M o u s e E x i t
    //-----------------------------------------------------------------------
    void TGScrollBox::onMouseExit()
    {
        m_mouseOverControl = false;
    }

}