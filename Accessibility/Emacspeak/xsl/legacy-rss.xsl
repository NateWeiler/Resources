<?xml version="1.0"?>
<!--
Author: T. V. Raman <raman@cs.cornell.edu>
Copyright: (C) T. V. Raman, 2001 - 2002,   All Rights Reserved.
License: GPL
View an RSS feed as clean HTML
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" 
                xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                xmlns:smh="http://www.google.com/searchhistory"
                xmlns:dc="http://purl.org/dc/elements/1.1/"
                xmlns:media="http://search.yahoo.com/mrss/" 
                xmlns:rss="http://purl.org/rss/1.0/"
                xmlns:nsrss="http://my.netscape.com/rdf/simple/0.9/"
                xmlns:content="http://purl.org/rss/1.0/modules/content/" 
                xmlns:str="http://exslt.org/strings"
                version="1.0">
  <xsl:param name="base"/>
  <xsl:output encoding="UTF-8" method="html" indent="yes"/>
  <!-- {rss 1.0 -->
  <xsl:template match="img">
    <xsl:if test="@alt">
      <xsl:value-of select="@alt"/>
    </xsl:if>
  </xsl:template>
  <xsl:template match="rdf:RDF">
    <html>
      <head>
        <title>
          <xsl:apply-templates select="rss:channel/rss:title|nsrss:channel/nsrss:title"/>
        </title>
      </head>
      <body>
        <ol>
          <xsl:apply-templates select="rss:item|nsrss:item"/>
        </ol>
        <p>
          <xsl:apply-templates select="rss:description| nsrss:description"/>
          <xsl:element name="a">
            <xsl:attribute name="href"> <xsl:value-of select="$base"/> </xsl:attribute>
            RSS 
          </xsl:element>
        </p>
      </body>
    </html>
  </xsl:template>
  <xsl:template match="rss:item|nsrss:item">
    <li>
      <h2><xsl:element name="a">
        <xsl:attribute name="href">
          <xsl:value-of select="rss:link|nsrss:link"/>
        </xsl:attribute>
        <xsl:apply-templates select="rss:title|nsrss:title"/>
      </xsl:element>
      </h2>
      <xsl:apply-templates
          select="rss:description|nsrss:description"/>
      <!--<em><xsl:value-of select="rss:pubDate"/></em>-->
    </li>
  </xsl:template>
  <xsl:template match="rss:title|rss:description|nsrss:title|nsrss:description">
    <xsl:value-of select="." disable-output-escaping="yes"/>
  </xsl:template>
  <!-- } -->
  <!-- {rss 0.9 -naked namespaces -->

  <xsl:template match="rss">
    <html>
      <head>
        <title>
          <xsl:apply-templates select="title"/>
        </title>
      </head>
      <body>
        <ol>
          <xsl:apply-templates select="//item"/>
        </ol>
        <p>
          <xsl:apply-templates select="description"/>
          <xsl:element name="a">
            <xsl:attribute name="href">
              <xsl:value-of select="$base"/>
            </xsl:attribute>
            RSS 
          </xsl:element>
        </p>
      </body>
    </html>
  </xsl:template>
  <xsl:template match="item">
    <li>
      <h2><xsl:element name="a">
        <xsl:attribute name="href">
          <xsl:value-of select="link"/>
        </xsl:attribute>
        <xsl:apply-templates select="title"/>
      </xsl:element>
      </h2>
      <xsl:apply-templates select="description"/>
	  <!--<em><xsl:value-of select="pubDate"/></em><br/>-->
<p><xsl:value-of select="smh:bkmk_annotation"/></p>
      <xsl:apply-templates select="enclosure"/>
    </li>
  </xsl:template>
  <xsl:template match="enclosure">
    <xsl:element name="a">
      <xsl:choose>
        <xsl:when test="string-length(@url) != 0">
          <xsl:attribute name="href">
            <xsl:value-of select="str:decode-uri(@url)"/>
          </xsl:attribute>
        </xsl:when>
        <xsl:when test="string-length(@href) != 0">
          <xsl:attribute name="href">
            <xsl:value-of
          select="str:decode-uri(@href)"/>
          </xsl:attribute>
        </xsl:when>
        <xsl:otherwise>Boom</xsl:otherwise>
      </xsl:choose>
      Enclosure: <!--Type <xsl:value-of select="@type"/>-->
       <xsl:value-of select="@length"/>
    </xsl:element>
  </xsl:template>
  <xsl:template match="title|description">
    <xsl:value-of select="." disable-output-escaping="yes"/>
  </xsl:template>
  <!-- } -->
  <!-- {identity default  -->
  <xsl:template match="*|@*">
    <xsl:copy>
      <xsl:apply-templates select="@*"/>
      <xsl:apply-templates select="node()" />
    </xsl:copy>
  </xsl:template>
  <!-- } -->
</xsl:stylesheet>
<!--
    Local Variables:
    folded-file: t
    End:
-->
