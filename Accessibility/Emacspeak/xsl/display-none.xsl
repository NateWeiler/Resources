<?xml version="1.0" encoding="UTF-8"?>
<!--$Id$-->

<!--
Author: T. V. Raman <raman@cs.cornell.edu>
Copyright: (C) T. V. Raman, 2001 - 2002,   All Rights Reserved.
License: GPL
trim elements that have style=display: none
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="1.0">
  
  <xsl:output encoding="UTF-8"
  method="html"  indent="yes"/>
  <xsl:template match="//div[@style='display: none;']">
    <!-- trimmed invisible content-->
  </xsl:template>
  
<xsl:template match="//span[@style='display: none;']">
    <!-- trimmed invisible content-->
  </xsl:template><xsl:template match="frame">
    <a>
      <xsl:attribute name="href">
        <xsl:value-of select="@src"/>
      </xsl:attribute>
      Frame: <xsl:value-of select="@name"/>
      <br/>
    </a>
  </xsl:template>
  
  <xsl:template match="embed">
    <xsl:for-each select="@src|@SRC">
      <a>
        <xsl:attribute name="href">
          <xsl:value-of select="."/>
        </xsl:attribute>
        Embed Link
      </a>
    </xsl:for-each>
  </xsl:template>
</xsl:stylesheet>
