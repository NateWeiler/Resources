/**
 * PptxGenJS: Utility Methods
 */

import { EMU, REGEX_HEX_COLOR, SCHEME_COLOR_NAMES, DEF_FONT_COLOR, ONEPT } from './core-enums'
import { IChartOpts, ILayout, ShapeFill, IGlowOptions, ISlideLib } from './core-interfaces'

/**
 * Convert string percentages to number relative to slide size
 * @param {number|string} size - numeric ("5.5") or percentage ("90%")
 * @param {'X' | 'Y'} xyDir - direction
 * @param {ILayout} layout - presentation layout
 * @returns {number} calculated size
 */
export function getSmartParseNumber(size: number | string, xyDir: 'X' | 'Y', layout: ILayout): number {
	// FIRST: Convert string numeric value if reqd
	if (typeof size === 'string' && !isNaN(Number(size))) size = Number(size)

	// CASE 1: Number in inches
	// Assume any number less than 100 is inches
	if (typeof size === 'number' && size < 100) return inch2Emu(size)

	// CASE 2: Number is already converted to something other than inches
	// Assume any number greater than 100 is not inches! Just return it (its EMU already i guess??)
	if (typeof size === 'number' && size >= 100) return size

	// CASE 3: Percentage (ex: '50%')
	if (typeof size === 'string' && size.indexOf('%') > -1) {
		if (xyDir && xyDir === 'X') return Math.round((parseFloat(size) / 100) * layout.width)
		if (xyDir && xyDir === 'Y') return Math.round((parseFloat(size) / 100) * layout.height)

		// Default: Assume width (x/cx)
		return Math.round((parseFloat(size) / 100) * layout.width)
	}

	// LAST: Default value
	return 0
}

/**
 * Basic UUID Generator Adapted
 * @link https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript#answer-2117523
 * @param {string} uuidFormat - UUID format
 * @returns {string} UUID
 */
export function getUuid(uuidFormat: string): string {
	return uuidFormat.replace(/[xy]/g, function(c) {
		let r = (Math.random() * 16) | 0,
			v = c === 'x' ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})
}

/**
 * TODO: What does this method do again??
 * shallow mix, returns new object
 */
export function getMix(o1: any | IChartOpts, o2: any | IChartOpts, etc?: any) {
	let objMix = {}
	for (let i = 0; i <= arguments.length; i++) {
		let oN = arguments[i]
		if (oN)
			Object.keys(oN).forEach(key => {
				objMix[key] = oN[key]
			})
	}
	return objMix
}

/**
 * Replace special XML characters with HTML-encoded strings
 * @param {string} xml - XML string to encode
 * @returns {string} escaped XML
 */
export function encodeXmlEntities(xml: string): string {
	// NOTE: Dont use short-circuit eval here as value c/b "0" (zero) etc.!
	if (typeof xml === 'undefined' || xml == null) return ''
	return xml
		.toString()
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;')
}

/**
 * Convert inches into EMU
 * @param {number|string} inches - as string or number
 * @returns {number} EMU value
 */
export function inch2Emu(inches: number | string): number {
	// FIRST: Provide Caller Safety: Numbers may get conv<->conv during flight, so be kind and do some simple checks to ensure inches were passed
	// Any value over 100 damn sure isnt inches, must be EMU already, so just return it
	if (typeof inches === 'number' && inches > 100) return inches
	if (typeof inches === 'string') inches = Number(inches.replace(/in*/gi, ''))
	return Math.round(EMU * inches)
}

/**
 * Convert degrees (0..360) to PowerPoint `rot` value
 *
 * @param {number} d - degrees
 * @returns {number} rot - value
 */
export function convertRotationDegrees(d: number): number {
	d = d || 0
	return (d > 360 ? d - 360 : d) * 60000
}

/**
 * Converts component value to hex value
 * @param {number} c - component color
 * @returns {string} hex string
 */
export function componentToHex(c: number): string {
	let hex = c.toString(16)
	return hex.length === 1 ? '0' + hex : hex
}

/**
 * Converts RGB colors from css selectors to Hex for Presentation colors
 * @param {number} r - red value
 * @param {number} g - green value
 * @param {number} b - blue value
 * @returns {string} XML string
 */
export function rgbToHex(r: number, g: number, b: number): string {
	return (componentToHex(r) + componentToHex(g) + componentToHex(b)).toUpperCase()
}

/**
 * Create either a `a:schemeClr` - (scheme color) or `a:srgbClr` (hexa representation).
 * @param {string} colorStr - hexa representation (eg. "FFFF00") or a scheme color constant (eg. pptx.colors.ACCENT1)
 * @param {string} innerElements - additional elements that adjust the color and are enclosed by the color element
 * @returns {string} XML string
 */
export function createColorElement(colorStr: string, innerElements?: string): string {
	let isHexaRgb = REGEX_HEX_COLOR.test(colorStr)

	if (!isHexaRgb && Object.values(SCHEME_COLOR_NAMES).indexOf(colorStr) === -1) {
		console.warn('"' + colorStr + '" is not a valid scheme color or hexa RGB! "' + DEF_FONT_COLOR + '" is used as a fallback. Pass 6-digit RGB or `pptx.colors` values')
		colorStr = DEF_FONT_COLOR
	}

	let tagName = isHexaRgb ? 'srgbClr' : 'schemeClr'
	let colorAttr = ' val="' + (isHexaRgb ? (colorStr || '').toUpperCase() : colorStr) + '"'

	return innerElements ? '<a:' + tagName + colorAttr + '>' + innerElements + '</a:' + tagName + '>' : '<a:' + tagName + colorAttr + '/>'
}

/**
 * Creates `a:glow` element
 * @param {Object} opts glow properties
 * @param {Object} defaults defaults for unspecified properties in `opts`
 * @see http://officeopenxml.com/drwSp-effects.php
 *	{ size: 8, color: 'FFFFFF', opacity: 0.75 };
 */
export function createGlowElement(options: IGlowOptions, defaults: IGlowOptions): string {
	let strXml = '',
		opts = getMix(defaults, options),
		size = opts['size'] * ONEPT,
		color = opts['color'],
		opacity = opts['opacity'] * 100000

	strXml += `<a:glow rad="${size}">`
	strXml += createColorElement(color, `<a:alpha val="${opacity}"/>`)
	strXml += `</a:glow>`

	return strXml
}

/**
 * Create color selection
 * @param {ShapeFill} shapeFill - options
 * @param {string} backColor - color string
 * @returns {string} XML string
 */
export function genXmlColorSelection(shapeFill: ShapeFill, backColor?: string): string {
	let colorVal = ''
	let fillType = 'solid'
	let internalElements = ''
	let outText = ''

	if (backColor && typeof backColor === 'string') {
		outText += `<p:bg><p:bgPr>${genXmlColorSelection(backColor.replace('#', ''))}<a:effectLst/></p:bgPr></p:bg>`
	}

	if (shapeFill) {
		if (typeof shapeFill === 'string') colorVal = shapeFill
		else {
			if (shapeFill.type) fillType = shapeFill.type
			if (shapeFill.color) colorVal = shapeFill.color
			if (shapeFill.alpha) internalElements += `<a:alpha val="${100 - shapeFill.alpha}000"/>`
		}

		switch (fillType) {
			case 'solid':
				outText += `<a:solidFill>${createColorElement(colorVal, internalElements)}</a:solidFill>`
				break
			default:
				outText += '' // @note need a statement as having only "break" is removed by rollup, then tiggers "no-default" js-linter
				break
		}
	}

	return outText
}

/**
 * Get a new rel ID (rId) for charts, media, etc.
 * @param {ISlideLib} target - the slide to use
 * @returns {number} count of all current rels plus 1 for the caller to use as its "rId"
 */
export function getNewRelId(target: ISlideLib): number {
	return target.rels.length + target.relsChart.length + target.relsMedia.length + 1
}
