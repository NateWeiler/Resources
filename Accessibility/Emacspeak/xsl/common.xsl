<!--$Id$-->
<!--
Author: T. V. Raman <raman@cs.cornell.edu>
Copyright: (C) T. V. Raman, 2001 - 2002,   All Rights Reserved.
License: GPL
Description: common rules
-->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  
  <xsl:output method="html" indent="yes"
  encoding="UTF-8"/>
  <xsl:template match="//script|//meta"/>
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
</xsl:stylesheet>
