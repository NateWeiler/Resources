# -*- coding: utf-8 -*-
"""
Money exceptions
"""


class MoneyException(Exception):
    """Generic money exception"""
    pass


class CurrencyMismatch(MoneyException, ValueError):
    """Invalid operation between money objects of different currencies"""
    def __init__(self, a, b, operation):
        msg = ("unsupported operation between money in '{}' and '{}': '{}'. "
               "Use XMoney for automatic currency conversion."
               ).format(a, b, operation)
        super(CurrencyMismatch, self).__init__(msg)


class InvalidOperandType(MoneyException, TypeError):
    def __init__(self, operand, operation):
        msg = ("unsupported operation between Money and '{}': '{}'. This "
               "operation can only be performed with another Money object. "
               "You can access the amount of a money object 'foo'"
               " with 'foo.amount' (decimal.Decimal)."
               ).format(type(operand), operation)
        super(InvalidOperandType, self).__init__(msg)


class ExchangeError(MoneyException):
    """Generic exception related to exchange rates"""
    pass


class ExchangeBackendNotInstalled(ExchangeError):
    """No backend installed yet"""
    def __init__(self):
        msg = "use e.g. money.xrates.install('money.exchange.SimpleBackend')"
        super(ExchangeBackendNotInstalled, self).__init__(msg)


class ExchangeRateNotFound(ExchangeError):
    """A rate/quotation was not returned by the backend"""
    def __init__(self, backend, a, b):
        msg = ("rate not found in backend '{}': {}/{}".format(backend, a, b))
        super(ExchangeRateNotFound, self).__init__(msg)


