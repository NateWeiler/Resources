let Declaration = require('../declaration')

class GridStart extends Declaration {
  static names = ['grid-row-start', 'grid-column-start']

  /**
   * Do not add prefix for unsupported value in IE
   */
  check (decl) {
    let value = decl.value
    return value.indexOf('/') === -1 || value.indexOf('span') !== -1
  }

  /**
   * Return a final spec property
   */
  normalize (prop) {
    return prop.replace('-start', '')
  }

  /**
   * Change property name for IE
   */
  prefixed (prop, prefix) {
    let result = super.prefixed(prop, prefix)
    if (prefix === '-ms-') {
      result = result.replace('-start', '')
    }
    return result
  }
}

module.exports = GridStart
