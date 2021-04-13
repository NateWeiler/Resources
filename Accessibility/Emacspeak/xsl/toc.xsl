<?xml version="1.0" ?>
<!--
Author: T. V. Raman <raman@cs.cornell.edu>
Copyright: (C) T. V. Raman, 2001 - 2002,   All Rights Reserved.
License: GPL
Description: Generate Table of contents
-->

<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  
  <xsl:output method="html" indent="yes"
  encoding="UTF-8"/>
  <xsl:include href="object.xsl"/>
  <xsl:include href="identity.xsl"/>
  <!-- {nuke these elements. --> 
  
  <xsl:template match="script"/>
  
  <!-- } -->
  <!-- {contents  --> 
  <xsl:template match="/">
    <xsl:apply-templates/>
  </xsl:template>
  <xsl:template match="head">
    <head>
      <xsl:apply-templates select="title"/>
      <xsl:if test="string-length($base) &gt; 0">
        <xsl:element name="base">
          <xsl:attribute name="href">
            <xsl:value-of select="$base"/>
          </xsl:attribute>
        </xsl:element>
      </xsl:if>
    </head>
  </xsl:template>
  <xsl:template match="body">
    <table>
      <caption>Auto TOC</caption>
      <tr>
        <td>
          <a href="#__about_this_style">About This Style</a>
        </td>
      </tr>
    </table>
    <ol>
      <xsl:apply-templates select="//h1|//h2|//h3"
      mode="toc"/>
    </ol>
    <xsl:apply-templates/>
    <h2>
      <a name="__about_this_style">About This Style</a>
    </h2>
    <p>This style genrates a table of contents.</p>
    the sections in the 
  </xsl:template>
  
  <xsl:template match="//h1|//h2|//h3" mode="toc">
    <li>
      <xsl:element name="a">
        <xsl:attribute name="href">
          <xsl:text>#</xsl:text><xsl:value-of select="generate-id(.)"/>
        </xsl:attribute>
        <xsl:apply-templates/>
      </xsl:element>
    </li>
  </xsl:template>
  
  <xsl:template match="//h1|//h2|//h3" >
    <xsl:element name="{name(.)}">
      <xsl:apply-templates select="@*"/>
      <xsl:element name="a">
        <xsl:attribute name="name">
          <xsl:value-of select="generate-id(.)"/>
        </xsl:attribute>
        <xsl:apply-templates/>
      </xsl:element>
    </xsl:element>
  </xsl:template>
  
  <!-- } -->
</xsl:stylesheet>

<!--
Local Variables:
sgml-indent-step: 2
sgml-indent-data: t
sgml-set-face: nil
sgml-insert-missing-element-comment: nil
folded-file: t
End:
--> 
