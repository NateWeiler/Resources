# -*- coding: utf-8 -*-
"""
Money exchange unittests
"""
# RADAR: Python2
from __future__ import absolute_import

from decimal import Decimal
import unittest

# RADAR: Python2
import money.six

from money import Money, XMoney, xrates
from money.exchange import SimpleBackend
from money.exceptions import ExchangeBackendNotInstalled
from money.exceptions import ExchangeRateNotFound


class TestExchangeRatesSetup(unittest.TestCase):
    def setUp(self):
        xrates.uninstall()

    def test_register(self):
        self.assertFalse(xrates)
        self.assertIsNone(xrates.backend_name)
        xrates.install('money.exchange.SimpleBackend')
        self.assertEqual(xrates.backend_name, 'SimpleBackend')

    def test_register_class(self):
        self.assertFalse(xrates)
        self.assertIsNone(xrates.backend_name)
        xrates.install(SimpleBackend)
        self.assertEqual(xrates.backend_name, 'SimpleBackend')

    def test_register_instance(self):
        self.assertFalse(xrates)
        self.assertIsNone(xrates.backend_name)
        xrates.install(SimpleBackend())
        self.assertEqual(xrates.backend_name, 'SimpleBackend')

    def test_unregister(self):
        xrates.install('money.exchange.SimpleBackend')
        self.assertEqual(xrates.backend_name, 'SimpleBackend')
        xrates.uninstall()
        self.assertFalse(xrates)
        self.assertIsNone(xrates.backend_name)

    def test_no_backend_name(self):
        self.assertIsNone(xrates.backend_name)

    def test_no_backend_base(self):
        with self.assertRaises(ExchangeBackendNotInstalled):
            xrates.base

    def test_no_backend_get_rate(self):
        with self.assertRaises(ExchangeBackendNotInstalled):
            xrates.rate('XXX')

    def test_no_backend_get_quotation(self):
        with self.assertRaises(ExchangeBackendNotInstalled):
            xrates.quotation('XXX', 'YYY')

    def test_multiple_xrates(self):
        xrates.install('money.exchange.SimpleBackend')
        self.assertTrue(xrates)
        xrates.base = 'XXX'
        xrates.setrate('AAA', Decimal('2'))

        from money.exchange import ExchangeRates
        another = ExchangeRates()
        another.install('money.exchange.SimpleBackend')
        self.assertTrue(another)
        another.base = 'XXX'
        another.setrate('AAA', Decimal('100'))

        self.assertEqual(xrates.rate('AAA'), Decimal('2'))
        self.assertEqual(another.rate('AAA'), Decimal('100'))


class TestSimpleBackend(unittest.TestCase):
    def setUp(self):
        xrates.install('money.exchange.SimpleBackend')
        xrates.base = 'XXX'
        xrates.setrate('AAA', Decimal('2'))
        xrates.setrate('BBB', Decimal('8'))

    def test_base_property(self):
        self.assertEqual(xrates.base, 'XXX')

    def test_rate(self):
        self.assertEqual(xrates.rate('XXX'), Decimal('1'))
        self.assertEqual(xrates.rate('AAA'), Decimal('2'))
        self.assertEqual(xrates.rate('BBB'), Decimal('8'))

    def test_quotation(self):
        self.assertEqual(xrates.quotation('XXX', 'XXX'), Decimal('1'))
        self.assertEqual(xrates.quotation('XXX', 'AAA'), Decimal('2'))
        self.assertEqual(xrates.quotation('XXX', 'BBB'), Decimal('8'))
        self.assertEqual(xrates.quotation('AAA', 'XXX'), Decimal('0.5'))
        self.assertEqual(xrates.quotation('AAA', 'AAA'), Decimal('1'))
        self.assertEqual(xrates.quotation('AAA', 'BBB'), Decimal('4'))
        self.assertEqual(xrates.quotation('BBB', 'XXX'), Decimal('0.125'))
        self.assertEqual(xrates.quotation('BBB', 'AAA'), Decimal('0.25'))
        self.assertEqual(xrates.quotation('BBB', 'BBB'), Decimal('1'))

    def test_unavailable_rate_returns_none(self):
        self.assertIsNone(xrates.rate('ZZZ'))

    def test_unavailable_quotation_returns_none(self):
        self.assertIsNone(xrates.quotation('YYY', 'ZZZ'))

    def test_money_conversion(self):
        self.assertEqual(Money('10', 'AAA').to('BBB'), Money('40', 'BBB'))
        self.assertEqual(Money('10', 'BBB').to('AAA'), Money('2.5', 'AAA'))

    def test_base_not_set_warning(self):
        xrates.uninstall()
        xrates.install('money.exchange.SimpleBackend')
        with self.assertRaises(Warning):
            xrates.setrate('AAA', Decimal('2'))


class ConversionMixin(object):
    def test_unavailable_backend_conversion_error(self):
        xrates.uninstall()
        with self.assertRaises(ExchangeBackendNotInstalled):
            self.MoneyClass('2', 'AAA').to('BBB')

    def test_unavailable_rate_conversion_error(self):
        xrates.install('money.exchange.SimpleBackend')
        with self.assertRaises(ExchangeRateNotFound):
            self.MoneyClass('2', 'AAA').to('BBB')


class TestMoneyConversion(ConversionMixin, unittest.TestCase):
    MoneyClass = Money

class TestXMoneyConversion(ConversionMixin, unittest.TestCase):
    MoneyClass = XMoney







