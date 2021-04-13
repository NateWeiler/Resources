<?xml version="1.0"?>
<!--
Author: T. V. Raman <raman@cs.cornell.edu>
Copyright: (C) T. V. Raman, 2001 - 2007,   All Rights Reserved.
License: GPL
View an Atom feed as clean HTML
This file supports both the old and current Atom namespace.
Future development will move forward in atom-view.xsl which will
only support the current Atom namespace.
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://purl.org/atom/ns#"
                xmlns:w3a="http://www.w3.org/2005/Atom"
                xmlns:openSearch="http://a9.com/-/spec/opensearchrss/1.0/"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:gr="http://www.google.com/schemas/reader/atom/"
                version="1.0">
  <xsl:output encoding="UTF-8" method="html" indent="yes"/>
  
  <xsl:template match="atom:feed|w3a:feed">
    <html>
      <head>
        <title>
          <xsl:apply-templates select="atom:title|w3a:title"/>
        </title>
      </head>
      <body>
        <h1><xsl:value-of select="atom:title|w3a:title"
        disable-output-escaping="yes"/>
        </h1>
<p>
<xsl:apply-templates select="atom:subtitle"/>
</p>
        
        <xsl:if test="(count(atom:entry) > 1)
                      or (count(w3a:entry) > 1)">
          <h2>Table Of Contents</h2>
          <ol>
            <xsl:apply-templates select="atom:entry|w3a:entry" mode="toc"/>
          </ol>
        </xsl:if>
        <xsl:apply-templates select="atom:entry|w3a:entry"/>
        <h2>
          <xsl:value-of select="atom:title" disable-output-escaping="yes"/>
        </h2>

        <p>
          <xsl:apply-templates select="atom:tagline|w3a:tagline"/><br/>
          <xsl:apply-templates select="atom:author|w3a:author"/><br/>
        </p>
        <h2>Feed-Level Links</h2>
        <table>
          <tr>
            <xsl:for-each select="atom:link|w3a:link">
              <td><xsl:apply-templates select="."/></td>
            </xsl:for-each>
          </tr>
        </table>
      </body>
    </html>
  </xsl:template>
  
  <xsl:template match="atom:entry|w3a:entry">
    <h2>
      <a>
        <xsl:attribute name="name">
          <xsl:value-of select="generate-id(.)"/> 
        </xsl:attribute>
        <xsl:attribute name="id"> <xsl:value-of select="generate-id(.)"/>
        </xsl:attribute>
        <xsl:apply-templates select="atom:title|w3a:title"/>
      </a>
    </h2>
    
    
    <p>
      <xsl:apply-templates select="atom:summary|w3a:summary"/><br/>
      <xsl:apply-templates select="atom:content|w3a:content"/>
    </p>
    <TABLE>
      <tr>
        <xsl:for-each select="atom:link|w3a:link">
          <td><xsl:apply-templates select="."/></td>
        </xsl:for-each>
      </tr>
    </TABLE>
    <p>
      <em><xsl:apply-templates select="atom:author|w3a:author"/></em>
      <xsl:if test="atom:published|w3a:published">
        <xsl:text> at </xsl:text>
      </xsl:if>
      <xsl:value-of select="atom:published|w3a:published"/>
    </p>
  </xsl:template>
  <xsl:template match="atom:entry|w3a:entry" mode="toc">
    <li>
      <a>
        <xsl:attribute name="href">
          #<xsl:value-of select="generate-id(.)"/> 
        </xsl:attribute>
        <xsl:value-of select="atom:title|w3a:title"
                      disable-output-escaping="yes"/>
      </a>
    </li>
  </xsl:template>
  <xsl:template
      match="atom:content|atom:summary|w3a:content|w3a:summary">
    <xsl:choose>
      <xsl:when test="@src">
        [<a>
        <xsl:attribute name="href">
          <xsl:value-of select="@src"/>
        </xsl:attribute>
        <img alt=" Download">
          <xsl:attribute name="src"><xsl:value-of
          select="@src"/></xsl:attribute>
        </img>
        </a>]
      </xsl:when>
      <xsl:when test="@type='html' or @type='text/html'">
        <xsl:value-of disable-output-escaping="yes"
                      select="node()"/>
      </xsl:when>
      <!-- for legacy atom 0.3-->
      <xsl:when test="@mode='escaped'">
        <xsl:value-of disable-output-escaping="yes"
                      select="node()"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:copy-of select="node()"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  <xsl:template match="xhtml:div">
    <xsl:copy/>
  </xsl:template>
  <xsl:template match="atom:link|w3a:link">
    <a>
      <xsl:attribute name="href">
        <xsl:value-of
            select="@href"/>
      </xsl:attribute>
      <xsl:choose>
        <xsl:when test="@rel='service.edit'">[Edit]</xsl:when>
        <xsl:when test="@rel='edit'">[Edit]</xsl:when>
        <xsl:when test="@rel='replies'">[Comments]</xsl:when>
        <xsl:when
            test="@rel='edit-media'">[Edit-Media]</xsl:when>
        <xsl:when test="@rel='media-edit'">[MediaEdit]</xsl:when>
        <xsl:when test="@rel='service.post'">[Post]</xsl:when>
        <xsl:when test="@rel='next'">[Next]</xsl:when>
        <xsl:when test="@rel='self'">[Self]</xsl:when>
        <xsl:when test="@rel='alternate'">[HTML]</xsl:when>
        <xsl:when test="@rel='enclosure'">[<xsl:value-of select="@type"/>]</xsl:when>
<xsl:when test="contains(@rel, 'books')">
[<xsl:value-of select="substring-after(@rel,'books/2008/')"/>]</xsl:when>
        <xsl:otherwise>[<xsl:value-of select="@rel"/>]</xsl:otherwise>
      </xsl:choose>
    </a>
  </xsl:template>
  
  
  <xsl:template match="atom:author|w3a:author">
    <a>
      <xsl:attribute name="href">
        <xsl:value-of select="atom:uri|w3a:uri"/>
      </xsl:attribute>
      <xsl:value-of select="w3a:name|atom:name"/>
    </a>
  </xsl:template>

  <xsl:template match="atom:title|w3a:title">
    <xsl:value-of select="." disable-output-escaping="yes"/>
  </xsl:template></xsl:stylesheet>
