<?xml version="1.0"?>
<!--
Author: T. V. Raman <raman@cs.cornell.edu>
Copyright: (C) T. V. Raman, 2001 - 2002,   All Rights Reserved.
License: GPL
Identity transform used in all style sheets.
-->

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output encoding="UTF-8"
              method="html"  indent="yes"/>
  <!-- {identity default  -->   
  <!-- nuke these -->
  <xsl:template match="//*[@aria-hidden='true']"/>
  <xsl:template
      match="//script|//nolayer|//ilayer|//layer|//spacer|//*[@style='display:none']"/>
  <xsl:include href="display-none.xsl"/>
  <xsl:template match="*|@*" >
    <xsl:copy>
      <xsl:apply-templates select="@*"/>
      <xsl:apply-templates select="node()"/>
    </xsl:copy>
  </xsl:template>
<xsl:template match="button">
  <input>
<xsl:apply-templates select="@*"/>
<xsl:apply-templates select="*|node()"/>
  </input>
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
