<?xml version="1.0" ?>
<!--
Author: T. V. Raman <raman@cs.cornell.edu>
Copyright: (C) T. V. Raman, 2001 - 2002,   All Rights Reserved.
License: GPL
Description: default transformation applied by Bubbles.
-->

<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  
  
  <xsl:output method="html" indent="yes"
  encoding="UTF-8"/>
  <xsl:include href="object.xsl"/>
  <xsl:include href="identity.xsl"/>
  <xsl:template match="/">
    <xsl:apply-templates/>
  </xsl:template>
  <!-- {nuke these elements. --> 
  
  <xsl:template match="script"/>
<xsl:template match="//*[@aria-hidden='true']"/>
  <xsl:template match="iframe">
  <a>
<xsl:attribute name="href">
<xsl:value-of select="@src"/>
</xsl:attribute>
Embedded IFrame</a>
</xsl:template>
  <!-- } -->
</xsl:stylesheet>

<!--
Local Variables:
mode: nxml
sgml-indent-step: 2
sgml-indent-data: t
sgml-set-face: nil
sgml-insert-missing-element-comment: nil
folded-file: t
End:
--> 
