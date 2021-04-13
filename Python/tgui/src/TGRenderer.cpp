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
    const TGReal TGRenderer::GuiZInitialValue        = 1.0f;

    const size_t TGRenderer::VERTEX_PER_QUAD			= 6;
    const size_t TGRenderer::VERTEX_PER_TRIANGLE		= 3;
    const size_t TGRenderer::VERTEXBUFFER_INITIAL_CAPACITY	= 256;
    const size_t TGRenderer::UNDERUSED_FRAME_THRESHOLD = 50000; // half buffer every 8 minutes on 100fps

    TGQuadInfo::TGQuadInfo()
    {
        texture.setNull();
    }

    TGQuadInfo::TGQuadInfo(const TGQuadInfo& rhs)
    {
        isClipped = rhs.isClipped;
        texture = rhs.texture;
        position = rhs.position;
        memcpy(lpos,rhs.lpos,sizeof(TGQuadVertex)*6);
        z = rhs.z;
        texPosition = rhs.texPosition;
        topLeftCol = rhs.topLeftCol;
        topRightCol = rhs.topRightCol;
        bottomLeftCol = rhs.bottomLeftCol;
        bottomRightCol = rhs.bottomRightCol;
    }

    TGQuadInfo& TGQuadInfo::operator= (const TGQuadInfo& rhs)
    {
        if ( &rhs != this )
        {
            isClipped = rhs.isClipped;
            texture = rhs.texture;
            position = rhs.position;
            for(int i=0;i<6;i++)
            {
                lpos[i].x = rhs.lpos[i].x;
                lpos[i].y = rhs.lpos[i].y;
                lpos[i].z = rhs.lpos[i].z;
                lpos[i].diffuse = rhs.lpos[i].diffuse;
                lpos[i].tu1 = rhs.lpos[i].tu1;
                lpos[i].tv1 = rhs.lpos[i].tv1;
            }
            z = rhs.z;
            texPosition = rhs.texPosition;
            topLeftCol = rhs.topLeftCol;
            topRightCol = rhs.topRightCol;
            bottomLeftCol = rhs.bottomLeftCol;
            bottomRightCol = rhs.bottomRightCol;
        }
        return *this;
    }


    //-----------------------------------------------------------------------
    //                   c r e a t e Q u a d R e n d e r O p
    //-----------------------------------------------------------------------
    void createQuadRenderOp(Ogre::RenderOperation &m_render_op, 
        Ogre::HardwareVertexBufferSharedPtr &m_buffer, size_t nquads)
    {
        using namespace Ogre;
        // Create and initialise the Ogre specific parts required for use in rendering later.
        m_render_op.vertexData = new VertexData;
        m_render_op.vertexData->vertexStart = 0;

        // setup vertex declaration for the vertex format we use
        VertexDeclaration* vd = m_render_op.vertexData->vertexDeclaration;
        size_t vd_offset = 0;
        vd->addElement(0, vd_offset, VET_FLOAT3, VES_POSITION);
        vd_offset += VertexElement::getTypeSize(VET_FLOAT3);
        vd->addElement(0, vd_offset, VET_COLOUR, VES_DIFFUSE);
        vd_offset += VertexElement::getTypeSize(VET_COLOUR);
        vd->addElement(0, vd_offset, VET_FLOAT2, VES_TEXTURE_COORDINATES);

        // create hardware vertex buffer
        m_buffer = HardwareBufferManager::getSingleton().createVertexBuffer(vd->getVertexSize(0), nquads,  
            HardwareBuffer::HBU_DYNAMIC_WRITE_ONLY_DISCARDABLE,
            false); // no Ninnies here!!!

        // bind vertex buffer
        m_render_op.vertexData->vertexBufferBinding->setBinding(0, m_buffer);

        // complete render operation basic initialisation
        m_render_op.operationType = RenderOperation::OT_TRIANGLE_LIST;
        m_render_op.useIndexes = false;
    }

    //-----------------------------------------------------------------------
    //                  d e s t r o y Q u a d R e n d e r O p
    //-----------------------------------------------------------------------
    void destroyQuadRenderOp(Ogre::RenderOperation &m_render_op, 
        Ogre::HardwareVertexBufferSharedPtr &m_buffer)
    {
        delete m_render_op.vertexData;
        m_render_op.vertexData = 0;
        m_buffer.setNull();
    }

    //-----------------------------------------------------------------------
    //                         T G R e n d e r e r 
    //-----------------------------------------------------------------------
    TGRenderer::TGRenderer(Ogre::RenderWindow* window, Ogre::uint8 queue_id, bool post_queue)
    {
        constructor_impl(window, queue_id, post_queue);
    }

    //-----------------------------------------------------------------------
    //                         T G R e n d e r e r 
    //-----------------------------------------------------------------------
    TGRenderer::TGRenderer(Ogre::RenderWindow* window, Ogre::uint8 queue_id, bool post_queue, Ogre::SceneManager* scene_manager)
    {
        constructor_impl(window, queue_id, post_queue);

        // hook into ogre rendering system
        setTargetSceneManager(scene_manager);
    }

    //-----------------------------------------------------------------------
    //                        ~ T G R e n d e r e r 
    //-----------------------------------------------------------------------
    TGRenderer::~TGRenderer(void)
    {
        setTargetSceneManager(NULL);

        if (m_ourlistener)
        {
            delete m_ourlistener;
        }

        // cleanup vertex data we allocated in constructor
        destroyQuadRenderOp(m_render_op, m_buffer);
        destroyQuadRenderOp(m_direct_render_op, m_direct_buffer);

        destroyAllTextures();
    }

    //-----------------------------------------------------------------------
    //                            a d d Q u a d
    //-----------------------------------------------------------------------
    TGQuadInfo TGRenderer::addQuad(const TGRect& dest_rect, TGReal z, const TGSBrush brush)
    {
        quad.isClipped = false;

        TGRect destRect=dest_rect;
        TGRect texRect=brush->m_uv;
        const TGReal  daWidth = m_displayArea.getWidth();
        const TGReal  daHeight = m_displayArea.getHeight();

        //
        // clip quad.  returns false if completely outside the clip area
        //

        if(m_clipList.size())
        {
            TGClipArea*   clip;
            size_t i=0;
            while(i < m_clipList.size())
            {
                clip = m_clipList[i];
                if(!clipQuad(clip,destRect,texRect,brush->m_colourRect))
                {
                    quad.isClipped = true;
                    return quad;
                }
                ++i;
            }
        }


        m_modified = true;

        // set quad position, flipping y co-ordinates, and applying appropriate texel origin offset
        quad.position.d_left	= destRect.d_left;
        quad.position.d_right	= destRect.d_right;
        quad.position.d_top		= daHeight - destRect.d_top;
        quad.position.d_bottom	= daHeight - destRect.d_bottom;
        quad.position.offset(m_texelOffset);

        // convert quad co-ordinates for a -1 to 1 co-ordinate system.
        quad.position.d_left	/= (daWidth * 0.5f);
        quad.position.d_right	/= (daWidth * 0.5f);
        quad.position.d_top		/= (daHeight * 0.5f);
        quad.position.d_bottom	/= (daHeight * 0.5f);
        quad.position.offset(TGPoint(-1.0f, -1.0f));

        quad.z				= -1 + z;
        quad.texture		= brush->m_texture->getOgreTexture();
        quad.texPosition	= texRect;

        // convert colours
        quad.topLeftCol		= colourToOgre(brush->m_colourRect.m_topLeft);
        quad.topRightCol	= colourToOgre(brush->m_colourRect.m_topRight);
        quad.bottomLeftCol	= colourToOgre(brush->m_colourRect.m_bottomLeft);
        quad.bottomRightCol	= colourToOgre(brush->m_colourRect.m_bottomRight);

        // setup Vertex 1...
        quad.lpos[0].x = quad.position.d_left;
        quad.lpos[0].y = quad.position.d_top;
        quad.lpos[0].z = quad.z;
        quad.lpos[0].diffuse = quad.topLeftCol;
        quad.lpos[0].tu1 = quad.texPosition.d_left;
        quad.lpos[0].tv1 = quad.texPosition.d_top;

        // setup Vertex 2...

        quad.lpos[1].x = quad.position.d_right;
        quad.lpos[1].y = quad.position.d_top;
        quad.lpos[1].z = quad.z;
        quad.lpos[1].diffuse = quad.topRightCol;
        quad.lpos[1].tu1 = quad.texPosition.d_right;
        quad.lpos[1].tv1 = quad.texPosition.d_top;

        // setup Vertex 3...
        quad.lpos[2].x = quad.position.d_right;
        quad.lpos[2].y = quad.position.d_bottom;
        quad.lpos[2].z = quad.z;
        quad.lpos[2].diffuse = quad.bottomRightCol;
        quad.lpos[2].tu1 = quad.texPosition.d_right;
        quad.lpos[2].tv1 = quad.texPosition.d_bottom;

        // setup Vertex 4...
        quad.lpos[3].x = quad.position.d_right;
        quad.lpos[3].y = quad.position.d_bottom;
        quad.lpos[3].z = quad.z;
        quad.lpos[3].diffuse = quad.bottomRightCol;
        quad.lpos[3].tu1 = quad.texPosition.d_right;
        quad.lpos[3].tv1 = quad.texPosition.d_bottom;

        // setup Vertex 5...
        quad.lpos[4].x = quad.position.d_left;
        quad.lpos[4].y = quad.position.d_bottom;
        quad.lpos[4].z = quad.z;
        quad.lpos[4].diffuse = quad.bottomLeftCol;
        quad.lpos[4].tu1 = quad.texPosition.d_left;
        quad.lpos[4].tv1 = quad.texPosition.d_bottom;

        // setup Vertex 6...

        quad.lpos[5].x = quad.position.d_left;
        quad.lpos[5].y = quad.position.d_top;
        quad.lpos[5].z = quad.z;
        quad.lpos[5].diffuse = quad.topLeftCol;
        quad.lpos[5].tu1 = quad.texPosition.d_left;
        quad.lpos[5].tv1 = quad.texPosition.d_top;
        return quad;
    }

    //-----------------------------------------------------------------------
    //                            a d d T r i
    //-----------------------------------------------------------------------
    TGQuadInfo TGRenderer::addTri(const TGRect& dest_rect, TGReal z, const TGSBrush brush, int pointDir)
    {
        quad.isClipped = false;

        TGRect destRect=dest_rect;
        TGRect texRect=brush->m_uv;
        const TGReal  daWidth = m_displayArea.getWidth();
        const TGReal  daHeight = m_displayArea.getHeight();

        //
        // clip quad.  returns false if completely outside the clip area
        //

        if(m_clipList.size())
        {
            TGClipArea*   clip;
            size_t i=0;
            while(i < m_clipList.size())
            {
                clip = m_clipList[i];
                if(!clipQuad(clip,destRect,texRect,brush->m_colourRect))
                {
                    quad.isClipped = true;
                    return quad;
                }
                ++i;
            }
        }


        m_modified = true;

        // set quad position, flipping y co-ordinates, and applying appropriate texel origin offset
        quad.position.d_left	= destRect.d_left;
        quad.position.d_right	= destRect.d_right;
        quad.position.d_top		= daHeight - destRect.d_top;
        quad.position.d_bottom	= daHeight - destRect.d_bottom;
        quad.position.offset(m_texelOffset);

        // convert quad co-ordinates for a -1 to 1 co-ordinate system.
        quad.position.d_left	/= (daWidth * 0.5f);
        quad.position.d_right	/= (daWidth * 0.5f);
        quad.position.d_top		/= (daHeight * 0.5f);
        quad.position.d_bottom	/= (daHeight * 0.5f);
        quad.position.offset(TGPoint(-1.0f, -1.0f));

        quad.z				= -1 + z;
        quad.texture		= brush->m_texture->getOgreTexture();
        quad.texPosition	= texRect;

        // convert colours
        quad.topLeftCol		= colourToOgre(brush->m_colourRect.m_topLeft);
        quad.topRightCol	= colourToOgre(brush->m_colourRect.m_topRight);
        quad.bottomLeftCol	= colourToOgre(brush->m_colourRect.m_bottomLeft);
        quad.bottomRightCol	= colourToOgre(brush->m_colourRect.m_bottomRight);

        if(!pointDir)
        {
            // setup Vertex 1...
            quad.lpos[0].x = quad.position.d_left;
            quad.lpos[0].y = quad.position.d_top;
            quad.lpos[0].z = quad.z;
            quad.lpos[0].diffuse = quad.topLeftCol;
            quad.lpos[0].tu1 = quad.texPosition.d_left;
            quad.lpos[0].tv1 = quad.texPosition.d_top;

            // setup Vertex 2...

            quad.lpos[1].x = quad.position.d_right;
            quad.lpos[1].y = quad.position.d_top;
            quad.lpos[1].z = quad.z;
            quad.lpos[1].diffuse = quad.topRightCol;
            quad.lpos[1].tu1 = quad.texPosition.d_right;
            quad.lpos[1].tv1 = quad.texPosition.d_top;

            // setup Vertex 3...
            quad.lpos[2].x = quad.position.d_left + ((quad.position.d_right-quad.position.d_left)/2.f);
            quad.lpos[2].y = quad.position.d_bottom;
            quad.lpos[2].z = quad.z;
            quad.lpos[2].diffuse = quad.bottomRightCol;
            quad.lpos[2].tu1 = quad.texPosition.d_right;
            quad.lpos[2].tv1 = quad.texPosition.d_bottom;
        }
        else
        {
            // setup Vertex 1...
            quad.lpos[0].x = quad.position.d_right;
            quad.lpos[0].y = quad.position.d_bottom;
            quad.lpos[0].z = quad.z;
            quad.lpos[0].diffuse = quad.bottomRightCol;
            quad.lpos[0].tu1 = quad.texPosition.d_right;
            quad.lpos[0].tv1 = quad.texPosition.d_bottom;

            // setup Vertex 2...

            quad.lpos[1].x = quad.position.d_left;
            quad.lpos[1].y = quad.position.d_bottom;
            quad.lpos[1].z = quad.z;
            quad.lpos[1].diffuse = quad.bottomLeftCol;
            quad.lpos[1].tu1 = quad.texPosition.d_left;
            quad.lpos[1].tv1 = quad.texPosition.d_bottom;

            // setup Vertex 3...
            quad.lpos[2].x = quad.position.d_left + ((quad.position.d_right-quad.position.d_left)/2.f);
            quad.lpos[2].y = quad.position.d_top;
            quad.lpos[2].z = quad.z;
            quad.lpos[2].diffuse = quad.topLeftCol;
            quad.lpos[2].tu1 = quad.texPosition.d_left;
            quad.lpos[2].tv1 = quad.texPosition.d_top;
        }

        // setup Vertex 4...
        quad.lpos[3].x = quad.lpos[2].x;
        quad.lpos[3].y = quad.lpos[2].y;
        quad.lpos[3].z = quad.z;
        quad.lpos[3].diffuse = quad.lpos[2].diffuse;
        quad.lpos[3].tu1 = quad.lpos[2].tu1;
        quad.lpos[3].tv1 = quad.lpos[2].tv1;

        // setup Vertex 5...
        quad.lpos[4].x = quad.lpos[2].x;
        quad.lpos[4].y = quad.lpos[2].y;
        quad.lpos[4].z = quad.z;
        quad.lpos[4].diffuse = quad.lpos[2].diffuse;
        quad.lpos[4].tu1 = quad.lpos[2].tu1;
        quad.lpos[4].tv1 = quad.lpos[2].tv1;

        // setup Vertex 6...

        quad.lpos[5].x = quad.lpos[2].x;
        quad.lpos[5].y = quad.lpos[2].y;
        quad.lpos[5].z = quad.z;
        quad.lpos[5].diffuse = quad.lpos[2].diffuse;
        quad.lpos[5].tu1 = quad.lpos[2].tu1;
        quad.lpos[5].tv1 = quad.lpos[2].tv1;

        return quad;
    }

    //-----------------------------------------------------------------------
    //                             a d d L i n e
    //-----------------------------------------------------------------------
    TGQuadInfo TGRenderer::addLine(const TGRect& dest_rect, TGReal z, const TGSBrush brush, int thickness)
    {
        quad.isClipped = false;

        TGRect destRect=dest_rect;
        TGRect texRect=brush->m_uv;

        //
        // clip line.  returns false if completely outside the clip area
        //

        if(m_clipList.size())
        {
            TGClipArea*   clip;
            size_t i=0;
            while(i < m_clipList.size())
            {
                clip = m_clipList[i];
                if(!clipQuad(clip,destRect,texRect,brush->m_colourRect))
                {
                    quad.isClipped = true;
                    return quad;
                }
                ++i;
            }
        }

        m_modified = true;

        TGVector2 start_point(destRect.d_left,destRect.d_top);
        TGVector2 end_point(destRect.d_right,destRect.d_bottom);
        TGVector2 newEnd = end_point - start_point;
        TGReal len = newEnd.length();

        Ogre::Radian angle( atan2(newEnd.y, newEnd.x) );
        TGReal float_thick = (( TGReal )thickness );

        // convert colours
        quad.topLeftCol		= colourToOgre(brush->m_colourRect.m_topLeft);
        quad.topRightCol	= colourToOgre(brush->m_colourRect.m_topRight);
        quad.bottomLeftCol	= colourToOgre(brush->m_colourRect.m_bottomLeft);
        quad.bottomRightCol	= colourToOgre(brush->m_colourRect.m_bottomRight);

        //
        // quad on the origin and rotate
        //
        TGRect oRect(0.f,-float_thick/2.f,len,float_thick/2.f);

        const TGReal preCos = cos( angle.valueRadians() );
        const TGReal preSin = sin( angle.valueRadians() );

        TGReal x,y;

        x = oRect.d_left;
        y = oRect.d_top;
        quad.lpos[0].x = preCos * x - preSin * y;
        quad.lpos[0].y = preSin * x + preCos * y;
        quad.lpos[0].diffuse = quad.topLeftCol;
        quad.lpos[0].tu1 = quad.texPosition.d_left;
        quad.lpos[0].tv1 = quad.texPosition.d_bottom;

        x = oRect.d_right;
        y = oRect.d_top;
        quad.lpos[1].x = preCos * x - preSin * y;
        quad.lpos[1].y = preSin * x + preCos * y;
        quad.lpos[1].diffuse = quad.topRightCol;
        quad.lpos[1].tu1 = quad.texPosition.d_right;
        quad.lpos[1].tv1 = quad.texPosition.d_top;

        x = oRect.d_right;
        y = oRect.d_bottom;
        quad.lpos[2].x = preCos * x - preSin * y;
        quad.lpos[2].y = preSin * x + preCos * y;
        quad.lpos[2].diffuse = quad.bottomRightCol;
        quad.lpos[2].tu1 = quad.texPosition.d_right;
        quad.lpos[2].tv1 = quad.texPosition.d_bottom;

        quad.lpos[3].x = quad.lpos[2].x;
        quad.lpos[3].y = quad.lpos[2].y;
        quad.lpos[3].diffuse = quad.lpos[2].diffuse;
        quad.lpos[3].tu1 = quad.lpos[2].tu1;
        quad.lpos[3].tv1 = quad.lpos[2].tv1;

        x = oRect.d_left;
        y = oRect.d_bottom;
        quad.lpos[4].x = preCos * x - preSin * y;
        quad.lpos[4].y = preSin * x + preCos * y;
        quad.lpos[4].diffuse = quad.bottomLeftCol;
        quad.lpos[4].tu1 = quad.texPosition.d_left;
        quad.lpos[4].tv1 = quad.texPosition.d_bottom;

        quad.lpos[5].x = quad.lpos[0].x;
        quad.lpos[5].y = quad.lpos[0].y;
        quad.lpos[5].diffuse = quad.lpos[0].diffuse;
        quad.lpos[5].tu1 = quad.lpos[0].tu1;
        quad.lpos[5].tv1 = quad.lpos[0].tv1;

        // set quad position, flipping y co-ordinates, and applying appropriate texel origin offset
        quad.z				= -1 + z;
        quad.texture		= brush->m_texture->getOgreTexture();
        quad.texPosition	= texRect;

        //
        // offset, flip, and convert
        //
        for(int i = 0; i < 6; i++)
        {
            quad.lpos[i].z = quad.z;
            quad.lpos[i].x += start_point.x;
            quad.lpos[i].y += start_point.y;

            //
            // flip
            //
            quad.lpos[i].y = m_displayArea.getHeight() - quad.lpos[i].y;

            quad.lpos[i].x += m_texelOffset.x;
            quad.lpos[i].y += m_texelOffset.y;

            //
            // convert coordinates
            //
            quad.lpos[i].x /= (m_displayArea.getWidth() * 0.5f);
            quad.lpos[i].y /= (m_displayArea.getHeight() * 0.5f);

            quad.lpos[i].x -= 1.f;
            quad.lpos[i].y -= 1.f;

        }

        return quad;
    }


    //-----------------------------------------------------------------------
    //                           d o R e n d e r
    //-----------------------------------------------------------------------
    void TGRenderer::doRender(TGQuadList& quadList)
    {

        // Render if overlays enabled and the quad list is not empty
        if (m_renderSys->_getViewport()->getOverlaysEnabled() && !quadList.empty())
        {
            /// Quad list needs to be sorted and thus the vertex buffer rebuilt. If not, we can
            /// reuse the vertex buffer resulting in a nice speed gain.
            if(m_modified)
            {
                m_modified = false;
                /// Resize vertex buffer if it is too small
                size_t size = m_buffer->getNumVertices();
                size_t requestedSize = quadList.size()*VERTEX_PER_QUAD;
                if(size < requestedSize)
                {
                    /// Double buffer size until smaller than requested size
                    while(size < requestedSize)
                        size = size * 2;
                    /// Reallocate the buffer
                    destroyQuadRenderOp(m_render_op, m_buffer);
                    createQuadRenderOp(m_render_op, m_buffer, size);
                }
                else if(requestedSize < size/2 && m_underused_framecount >= UNDERUSED_FRAME_THRESHOLD)
                {
                    /// Resize vertex buffer if it has been to big for too long
                    size = size / 2;
                    destroyQuadRenderOp(m_render_op, m_buffer);
                    createQuadRenderOp(m_render_op, m_buffer, size);
                    /// Reset underused framecount so it takes another UNDERUSED_FRAME_THRESHOLD to half again
                    m_underused_framecount = 0;
                }
                /// Fill the buffer
                TGQuadVertex*	buffmem;
                buffmem = (TGQuadVertex*)m_buffer->lock(Ogre::HardwareVertexBuffer::HBL_DISCARD);
                // iterate over each quad in the list
                for (size_t i=0;i<quadList.size();i++)
                {
                    const TGQuadInfo& quad = quadList[i];
                    if(!quad.isClipped)
                    {

                        memcpy(buffmem,&quad.lpos[0],sizeof(TGQuadVertex)*6);
                        buffmem += 6;

                    }

                }

                // ensure we leave the buffer in the unlocked state
                m_buffer->unlock();
            }
            /// Render the buffer
            initRenderStates();
            m_bufferPos = 0;

            // Iterate over each quad in the list and render it
            size_t idx=0;
            while(idx < quadList.size())
            {
                TGQuadInfo& quad = quadList[idx];
                if(!quad.isClipped)
                {

                    m_currTexture = quad.texture;
                    m_render_op.vertexData->vertexStart = m_bufferPos;

                    while(idx < quadList.size())
                    {
                        quad = quadList[idx];
                        if(!quad.isClipped)
                        {
                            if (m_currTexture != quad.texture)
                            {
                                /// If it has a different texture, render this quad in next operation
                                break;
                            }
                            m_bufferPos += VERTEX_PER_QUAD;
                        }
                        ++idx;
                    }

                    m_render_op.vertexData->vertexCount = m_bufferPos - m_render_op.vertexData->vertexStart;
                    /// Set texture, and do the render
                    m_renderSys->_setTexture(0, true, m_currTexture->getName());
                    m_renderSys->_render(m_render_op);
                }
                else ++idx;
            }

        }
        /// Count frames to check if utilization of vertex buffer was below half the capacity for 500,000 frames
        if(m_bufferPos < m_buffer->getNumVertices()/2)
            m_underused_framecount++;
        else
            m_underused_framecount = 0;
    }

    //-----------------------------------------------------------------------
    //                         c r e a t e T e x t u r e
    //-----------------------------------------------------------------------
    TGTexture* TGRenderer::createTexture(void)
    {
        TGTexture* tex = new TGTexture(this);
        m_texturelist.push_back(tex);
        return tex;
    }

    //-----------------------------------------------------------------------
    //                         c r e a t e T e x t u r e
    //-----------------------------------------------------------------------
    TGTexture* TGRenderer::createTexture(const TGString& filename, const TGString& resourceGroup)
    {
        TGTexture* tex = (TGTexture*)createTexture();
        tex->loadFromFile(filename, resourceGroup);
        m_texturelist.push_back(tex);
        return tex;
    }

    //-----------------------------------------------------------------------
    //                         c r e a t e T e x t u r e
    //-----------------------------------------------------------------------
    TGTexture* TGRenderer::createTexture(TGReal size)
    {
        TGTexture* tex = (TGTexture*)createTexture();
        tex->setOgreTextureSize((uint)size);

        return tex;
    }

    //-----------------------------------------------------------------------
    //                        d e s t r o y T e x t u r e
    //-----------------------------------------------------------------------
    void TGRenderer::destroyTexture(TGTexture* texture)
    {
        if (texture != NULL)
        {
            TGTexture* tex = (TGTexture*)texture;

            m_texturelist.remove(tex);
            delete tex;
        }
    }

    //-----------------------------------------------------------------------
    //                    d e s t r o y A l l T e x t u r e s
    //-----------------------------------------------------------------------
    void TGRenderer::destroyAllTextures(void)
    {
        while (!m_texturelist.empty())
        {
            destroyTexture(*(m_texturelist.begin()));
        }
    }

    //-----------------------------------------------------------------------
    //                      i n i t R e n d e r S t a t e s
    //-----------------------------------------------------------------------
    void TGRenderer::initRenderStates(void)
    {
        using namespace Ogre;

        // set-up matrices
        m_renderSys->_setWorldMatrix(Matrix4::IDENTITY);
        m_renderSys->_setViewMatrix(Matrix4::IDENTITY);
        m_renderSys->_setProjectionMatrix(Matrix4::IDENTITY);

        // initialise render settings
        m_renderSys->setLightingEnabled(false);
        m_renderSys->_setDepthBufferParams(false, false);
        m_renderSys->_setDepthBias(0);
        m_renderSys->_setCullingMode(CULL_NONE);
        m_renderSys->_setFog(FOG_NONE);
        m_renderSys->_setColourBufferWriteEnabled(true, true, true, true);
        m_renderSys->unbindGpuProgram(GPT_FRAGMENT_PROGRAM);
        m_renderSys->unbindGpuProgram(GPT_VERTEX_PROGRAM);
        m_renderSys->setShadingType(SO_GOURAUD);
        m_renderSys->_setPolygonMode(PM_SOLID);

        // initialise texture settings
        m_renderSys->_setTextureCoordCalculation(0, TEXCALC_NONE);
        m_renderSys->_setTextureCoordSet(0, 0);
        m_renderSys->_setTextureUnitFiltering(0, FO_LINEAR, FO_LINEAR, FO_LINEAR);
        m_renderSys->_setTextureAddressingMode(0, m_uvwAddressMode);
        m_renderSys->_setTextureMatrix(0, Matrix4::IDENTITY);
        m_renderSys->_setAlphaRejectSettings(CMPF_ALWAYS_PASS, 0);
        m_renderSys->_setTextureBlendMode(0, m_colourBlendMode);
        m_renderSys->_setTextureBlendMode(0, m_alphaBlendMode);
        m_renderSys->_disableTextureUnitsFrom(1);

        // enable alpha blending
        m_renderSys->_setSceneBlending(SBF_SOURCE_ALPHA, SBF_ONE_MINUS_SOURCE_ALPHA);
    }


    //-----------------------------------------------------------------------
    //                       r e n d e r Q u a d D i r e c t
    //-----------------------------------------------------------------------
    void TGRenderer::renderQuadDirect(const TGRect& dest_rect, TGReal z,  const TGSBrush brush)
    {
        if (m_renderSys->_getViewport()->getOverlaysEnabled())
        {
            z = -1 + z;

            TGRect final_rect;

            // set quad position, flipping y co-ordinates, and applying appropriate texel origin offset
            final_rect.d_left	= dest_rect.d_left;
            final_rect.d_right	= dest_rect.d_right;
            final_rect.d_top	= m_displayArea.getHeight() - dest_rect.d_top;
            final_rect.d_bottom	= m_displayArea.getHeight() - dest_rect.d_bottom;
            final_rect.offset(m_texelOffset);

            // convert quad co-ordinates for a -1 to 1 co-ordinate system.
            final_rect.d_left	/= (m_displayArea.getWidth() * 0.5f);
            final_rect.d_right	/= (m_displayArea.getWidth() * 0.5f);
            final_rect.d_top	/= (m_displayArea.getHeight() * 0.5f);
            final_rect.d_bottom	/= (m_displayArea.getHeight() * 0.5f);
            final_rect.offset(TGPoint(-1.0f, -1.0f));

            // convert colours for ogre, note that top / bottom are switched.
            uint32 topLeftCol	= colourToOgre(brush->m_colourRect.m_bottomLeft);
            uint32 topRightCol	= colourToOgre(brush->m_colourRect.m_bottomRight);
            uint32 bottomLeftCol	= colourToOgre(brush->m_colourRect.m_topLeft);
            uint32 bottomRightCol= colourToOgre(brush->m_colourRect.m_topRight);

            TGQuadVertex*	buffmem = (TGQuadVertex*)m_direct_buffer->lock(Ogre::HardwareVertexBuffer::HBL_DISCARD);

            // setup Vertex 1...
            buffmem->x	= final_rect.d_left;
            buffmem->y	= final_rect. d_bottom;
            buffmem->z	= z;
            buffmem->diffuse = topLeftCol;
            buffmem->tu1	= brush->m_uv.d_left;
            buffmem->tv1	= brush->m_uv.d_bottom;
            ++buffmem;

            // setup Vertex 2...
            buffmem->x	= final_rect.d_right;
            buffmem->y = final_rect.d_bottom;
            buffmem->z	= z;
            buffmem->diffuse = topRightCol;
            buffmem->tu1	= brush->m_uv.d_right;
            buffmem->tv1	= brush->m_uv.d_bottom;
            ++buffmem;

            // setup Vertex 3...
            buffmem->x	= final_rect.d_left;
            buffmem->y	= final_rect.d_top;
            buffmem->z	= z;
            buffmem->diffuse = bottomLeftCol;
            buffmem->tu1	= brush->m_uv.d_left;
            buffmem->tv1	= brush->m_uv.d_top;
            ++buffmem;

            // setup Vertex 4...
            buffmem->x	= final_rect.d_right;
            buffmem->y	= final_rect.d_bottom;
            buffmem->z	= z;
            buffmem->diffuse = topRightCol;
            buffmem->tu1	= brush->m_uv.d_right;
            buffmem->tv1	= brush->m_uv.d_bottom;
            ++buffmem;

            // setup Vertex 5...
            buffmem->x	= final_rect.d_right;
            buffmem->y	= final_rect.d_top;
            buffmem->z	= z;
            buffmem->diffuse = bottomRightCol;
            buffmem->tu1	= brush->m_uv.d_right;
            buffmem->tv1	= brush->m_uv.d_top;
            ++buffmem;

            // setup Vertex 6...

            buffmem->x	= final_rect.d_left;
            buffmem->y = final_rect.d_top;
            buffmem->z	= z;
            buffmem->diffuse = bottomLeftCol;
            buffmem->tu1	= brush->m_uv.d_left;
            buffmem->tv1	= brush->m_uv.d_top;

            m_direct_buffer->unlock();

            //
            // perform rendering...
            //
            initRenderStates();
            m_renderSys->_setTexture(0, true, brush->m_texture->getOgreTexture()->getName());
            m_direct_render_op.vertexData->vertexCount = VERTEX_PER_QUAD;
            m_renderSys->_render(m_direct_render_op);
        }

    }

    //-----------------------------------------------------------------------
    //                         c o l o u r T o O g r e
    //-----------------------------------------------------------------------
    uint32 TGRenderer::colourToOgre(const TGColour& col) const
    {
        Ogre::ColourValue cv(col.r, col.g, col.b, col.a);

        uint32 final;
        m_renderSys->convertColourValue(cv, &final);

        return final;
    }

    //-----------------------------------------------------------------------
    //                   s e t T a r g e t S c e n e M a n a g e r
    //-----------------------------------------------------------------------
    void TGRenderer::setTargetSceneManager(Ogre::SceneManager* scene_manager)
    {
        // unhook from current scene manager.
        if (m_sceneMgr != NULL)
        {
            m_sceneMgr->removeRenderQueueListener(m_ourlistener);
            m_sceneMgr = NULL;
        }

        // hook new scene manager if that is not NULL
        if (scene_manager != NULL)
        {
            m_sceneMgr = scene_manager;
            m_sceneMgr->addRenderQueueListener(m_ourlistener);
        }

    }

    //-----------------------------------------------------------------------
    //                  s e t T a r g e t R e n d e r Q u e u e
    //-----------------------------------------------------------------------
    void TGRenderer::setTargetRenderQueue(Ogre::uint8 queue_id, bool post_queue)
    {
        m_queue_id		= queue_id;
        m_post_queue	= post_queue;

        if (m_ourlistener != NULL)
        {
            m_ourlistener->setTargetRenderQueue(queue_id);
            m_ourlistener->setPostRenderQueue(post_queue);
        }

    }

    //-----------------------------------------------------------------------
    //                    c o n s t r u c t o r _ i m p l
    //-----------------------------------------------------------------------
    void TGRenderer::constructor_impl(Ogre::RenderWindow* window, Ogre::uint8 queue_id, bool post_queue)
    {
        using namespace Ogre;

        // initialise the renderer fields
        m_queueing		= true;
        m_queue_id		= queue_id;
        m_currTexture.isNull();
        m_post_queue    = post_queue;
        m_sceneMgr     = NULL;
        m_bufferPos     = 0;
        m_modified      = false;
        m_ogreRoot      = Root::getSingletonPtr();
        m_renderSys	    = m_ogreRoot->getRenderSystem();
        // set ID TGString
        //d_identifierString = "CEGUI::OgreRenderer - Official Ogre based renderer module for CEGUI";

        // Create and initialise the Ogre specific parts required for use in rendering later.
        // Main GUI
        createQuadRenderOp(m_render_op, m_buffer, VERTEXBUFFER_INITIAL_CAPACITY);
        m_underused_framecount = 0;

        // Mouse cursor
        createQuadRenderOp(m_direct_render_op, m_direct_buffer, VERTEX_PER_QUAD);

        // Discover display settings and setup m_displayArea
        m_displayArea.d_left	= 0;
        m_displayArea.d_top	= 0;
        m_displayArea.d_right	= window->getWidth();
        m_displayArea.d_bottom	= window->getHeight();

        // initialise required texel offset
        m_texelOffset = TGPoint((TGReal)m_renderSys->getHorizontalTexelOffset(), -(TGReal)m_renderSys->getVerticalTexelOffset());

        // create listener which will handler the rendering side of things for us.
        m_ourlistener = new TGRQListener(this, queue_id, post_queue);

        // Initialise blending modes to be used.
        m_colourBlendMode.blendType	= Ogre::LBT_COLOUR;
        m_colourBlendMode.source1	= Ogre::LBS_TEXTURE;
        m_colourBlendMode.source2	= Ogre::LBS_DIFFUSE;
        m_colourBlendMode.operation	= Ogre::LBX_MODULATE;

        m_alphaBlendMode.blendType	= Ogre::LBT_ALPHA;
        m_alphaBlendMode.source1	= Ogre::LBS_TEXTURE;
        m_alphaBlendMode.source2	= Ogre::LBS_DIFFUSE;
        m_alphaBlendMode.operation	= Ogre::LBX_MODULATE;

        m_uvwAddressMode.u = Ogre::TextureUnitState::TAM_CLAMP;
        m_uvwAddressMode.v = Ogre::TextureUnitState::TAM_CLAMP;
        m_uvwAddressMode.w = Ogre::TextureUnitState::TAM_CLAMP;
    }

    //-----------------------------------------------------------------------
    //                         c r e a t e T e x t u r e
    //-----------------------------------------------------------------------
    TGTexture* TGRenderer::createTexture(Ogre::TexturePtr& texture)
    {
        TGTexture* t = (TGTexture*)createTexture();

        if (!texture.isNull())
        {
            t->setOgreTexture(texture);
        }

        return t;

    }

    //-----------------------------------------------------------------------
    //                       s e t D i s p l a y S i z e
    //-----------------------------------------------------------------------
    void TGRenderer::setDisplaySize(const TGSize& sz)
    {
        if (m_displayArea.getSize() != sz)
        {
            m_displayArea.setSize(sz);

            //EventArgs args;
            //fireEvent(EventDisplaySizeChanged, args, EventNamespace);
        }

    }

    //-----------------------------------------------------------------------
    //                         o p e n C l i p A r e a
    //-----------------------------------------------------------------------
    void TGRenderer::openClipArea(int x1, int y1, int x2, int y2)
    {
        TGClipArea* ca = new TGClipArea();
        ca->x1 = x1;
        ca->y1 = y1;
        ca->x2 = x2;
        ca->y2 = y2;
        m_clipList.push_back(ca);
    }

    //-----------------------------------------------------------------------
    //                         c l o s e C l i p A r e a
    //-----------------------------------------------------------------------
    void TGRenderer::closeClipArea()
    {
        TGClipArea* ca = m_clipList.back();
        delete ca;
        m_clipList.pop_back();
    }

    //-----------------------------------------------------------------------
    //                         r e s e t C l i p p i n g
    //-----------------------------------------------------------------------
    void TGRenderer::resetClipping()
    {
    }

    //-----------------------------------------------------------------------
    //                     r e n d e r Q u e u e S t a r t e d
    //-----------------------------------------------------------------------
    void TGRQListener::renderQueueStarted(Ogre::uint8 id, const Ogre::String& invocation, 
        bool& skipThisQueue)
    {
        if ((!m_postQueue) && (m_queueID == id))
        {
            TGUI::TGSystem::getSingleton().renderGUI();
        }

    }

    //-----------------------------------------------------------------------
    //                       r e n d e r Q u e u e E n d e d
    //-----------------------------------------------------------------------
    void TGRQListener::renderQueueEnded(Ogre::uint8 id, const Ogre::String& invocation, bool& repeatThisQueue)
    {
        if ((m_postQueue) && (m_queueID == id))
        {
            TGUI::TGSystem::getSingleton().renderGUI();
        }
    }

    //-----------------------------------------------------------------------
    //                           c l i p Q u a d
    //-----------------------------------------------------------------------
    bool TGRenderer::clipQuad(TGClipArea* clip, TGRect& drect, TGRect& trect, TGColourRect colours)
    {
        bool clipping = false;

        // check for total exclusion
        if((drect.d_right  < clip->x1) ||
            (drect.d_left   > clip->x2) ||
            (drect.d_bottom < clip->y1) ||
            (drect.d_top    > clip->y2))
            return false;

        bool clipLeft=false,clipTop=false,clipRight=false,clipBot=false;

        if(drect.d_left < clip->x1)
            clipLeft = true;
        if(drect.d_top < clip->y1)
            clipTop = true;
        if(drect.d_right > clip->x2)
            clipRight = true;
        if(drect.d_bottom > clip->y2)
            clipBot = true;

        TGReal twidth=trect.getWidth();
        TGReal theight=trect.getHeight();
        TGReal dwidth = drect.getWidth();
        TGReal dheight = drect.getHeight();
        TGReal dist,pct;

        if(clipLeft || clipTop || clipRight || clipBot)
            clipping = true;

        //
        // if clipping, adjust texture coordinates
        //
        if(clipLeft)
        {
            dist = clip->x1 - drect.d_left;
            pct = 1.f - (dist / dwidth);
            trect.d_left = trect.d_right - (twidth * pct);
            drect.d_left = clip->x1;
        }

        if(clipTop)
        {
            dist = clip->y1 - drect.d_top;
            pct = 1.f - (dist / dheight);
            trect.d_top = trect.d_bottom - (theight * pct);
            drect.d_top = clip->y1;
        }

        if(clipRight)
        {
            dist = drect.d_right - clip->x2;
            pct = 1.f - (dist / dwidth);   
            trect.d_right = trect.d_left + (twidth * pct);
            drect.d_right = clip->x2;
        }

        if(clipBot)
        {
            dist = drect.d_bottom - clip->y2;
            pct = 1.f - (dist / dheight);   
            trect.d_bottom = trect.d_top + (theight * pct);
            drect.d_bottom = clip->y2;
        }

        return true;
    }

}