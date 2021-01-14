#!python3

# Google Calculator

# Attempts to search google calculator for the result of an expression. Returns a CalculatorResult if successful or None if it fails.

Google.calculate("157.3kg in grams")

{'expr': u'157.3 kilograms',
 'fullstring': u'157.3 kilograms = 157\xa0300 grams',
 'result': u'157 300 grams',
 'unit': u'grams',
 'value': u'157300'}

Google.calculate("cos(25 pi) / 17.4")

{'expr': u'cos(25 * pi) / 17.4',
 'fullstring': u'cos(25 * pi) / 17.4 = -0.0574712644',
 'result': u'-0.0574712644',
 'unit': None,
 'value': u'-0.0574712644'}
