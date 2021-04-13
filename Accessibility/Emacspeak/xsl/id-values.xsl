<?xml version="1.0"?>
<!--
Author: T. V. Raman <raman@cs.cornell.edu>
Copyright: (C) T. V. Raman, 2001 - 2002,   All Rights Reserved.
License: GPL
Description: Display all values of attribute id
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:output method="text" indent="yes" encoding="UTF-8"/>
  <xsl:template match="/">
    <xsl:apply-templates select="//@id"/>
  </xsl:template>
  <xsl:template match="@id">
    <xsl:value-of select="."/>
    <xsl:text>
    </xsl:text>
  </xsl:template>
  
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
