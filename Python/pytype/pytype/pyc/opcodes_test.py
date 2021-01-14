from pytype import compat
from pytype.pyc import opcodes
import unittest


class _TestBase(unittest.TestCase):
  """Base class for all opcodes.dis testing."""

  def dis(self, code, **kwargs):
    """Return the opcodes from disassbling a code sequence."""
    return opcodes.dis(compat.int_array_to_bytes(code),
                       self.python_version, **kwargs)

  def assertSimple(self, opcode, name):
    """Assert that a single opcode byte diassembles to the given name."""
    self.assertName([opcode], name)

  def assertName(self, code, name):
    """Assert that the first diassembled opcode has the given name."""
    self.assertEqual(self.dis(code)[0].name, name)

  def assertDisassembly(self, code, expected):
    """Assert that an extended code sequence has the expected disassembly."""
    ops = self.dis(code)
    self.assertEqual(len(ops), len(expected))
    for o, e in zip(ops, expected):
      if len(e) == 1:
        self.assertEqual(e, (o.name,))
      else:
        self.assertEqual(e, (o.name, o.arg))

  def assertLineNumbers(self, code, co_lnotab, expected):
    """Assert that the opcodes have the expected line numbers."""
    ops = self.dis(code, co_lnotab=compat.int_array_to_bytes(co_lnotab),
                   co_firstlineno=1)
    self.assertEqual(len(ops), len(expected))
    for o, e in zip(ops, expected):
      self.assertEqual(e, o.line)


class CommonTest(_TestBase):
  """Test bytecodes that are common to Python 2 and 3 using python 2."""

  python_version = (2, 7, 6)

  def test_pop_top(self):
    self.assertSimple(1, 'POP_TOP')

  def test_store_name(self):
    self.assertName([90, 0, 0], 'STORE_NAME')

  def test_for_iter(self):
    self.assertName([93, 0, 0, 9], 'FOR_ITER')

  def test_extended_disassembly(self):
    code = [
        0x7c, 0, 0,  # 0 LOAD_FAST, arg=0,
        0x7c, 0, 0,  # 3 LOAD_FAST, arg=0,
        0x17,  # 6 BINARY_ADD,
        0x01,  # 7 POP_TOP,
        0x7c, 0, 0,  # 8 LOAD_FAST, arg=0,
        0x7c, 0, 0,  # 11 LOAD_FAST, arg=0,
        0x14,  # 14 BINARY_MULTIPLY,
        0x01,  # 15 POP_TOP,
        0x7c, 0, 0,  # 16 LOAD_FAST, arg=0,
        0x7c, 0, 0,  # 19 LOAD_FAST, arg=0,
        0x16,  # 22 BINARY_MODULO,
        0x01,  # 23 POP_TOP,
        0x7c, 0, 0,  # 24 LOAD_FAST, arg=0,
        0x7c, 0, 0,  # 27 LOAD_FAST, arg=0,
        0x1b,  # 30 BINARY_TRUE_DIVIDE,
        0x01,  # 31 POP_TOP,
        0x64, 0, 0,  # 32 LOAD_CONST, arg=0,
        0x53,  # 35 RETURN_VALUE
    ]
    expected = [
        ('LOAD_FAST', 0),
        ('LOAD_FAST', 0),
        ('BINARY_ADD',),
        ('POP_TOP',),
        ('LOAD_FAST', 0),
        ('LOAD_FAST', 0),
        ('BINARY_MULTIPLY',),
        ('POP_TOP',),
        ('LOAD_FAST', 0),
        ('LOAD_FAST', 0),
        ('BINARY_MODULO',),
        ('POP_TOP',),
        ('LOAD_FAST', 0),
        ('LOAD_FAST', 0),
        ('BINARY_TRUE_DIVIDE',),
        ('POP_TOP',),
        ('LOAD_CONST', 0),
        ('RETURN_VALUE',),
    ]
    self.assertDisassembly(code, expected)


class CommonUnder3Test(CommonTest):
  """Test the common bytecodes using Python 3.5."""

  python_version = (3, 5, 0)


class Python2Test(_TestBase):
  """Test bytecodes specific to Python 2."""

  python_version = (2, 7, 6)

  def test_stop_code(self):
    self.assertSimple(0, 'STOP_CODE')

  def test_store_map(self):
    self.assertSimple(54, 'STORE_MAP')

  def test_dup_topx(self):
    self.assertName([99, 0, 0], 'DUP_TOPX')

  def test_extended_arg(self):
    code = [
        0x91, 1, 0,  # 0 EXTENDED_ARG, arg=1,
        0x64, 2, 0,  # 3 LOAD_CONST, arg=2
        0x53,  # 6 RETURN_VALUE
    ]
    expected = [
        ('LOAD_CONST', 0x10002),
        ('RETURN_VALUE',)
    ]
    self.assertDisassembly(code, expected)


class Python35Test(_TestBase):
  """Test bytecodes specific to Python 3.5."""

  python_version = (3, 5, 2)

  def test_load_build_class(self):
    self.assertSimple(71, 'LOAD_BUILD_CLASS')

  def test_yield_from(self):
    self.assertSimple(72, 'YIELD_FROM')

  def test_with_cleanup(self):
    self.assertSimple(81, 'WITH_CLEANUP_START')

  def test_unpack_ex(self):
    self.assertName([94, 0, 0], 'UNPACK_EX')

  def test_extended_arg(self):
    # LOAD_CONST should be stored in the jump table with an address of 0, due to
    # the extended arg; if we don't do this we would throw an exception.
    code = [
        0x90, 1, 0,  # 0 EXTENDED_ARG, arg=1,
        0x64, 2, 0,  # 3 LOAD_CONST, arg=2
        0x71, 0, 0  # 6 JUMP_ABSOLUTE, arg=0
    ]
    expected = [
        ('LOAD_CONST', 0x10002),
        ('JUMP_ABSOLUTE',)
    ]
    self.assertDisassembly(code, expected)


class Python36Test(_TestBase):
  """Test bytecodes specific to Python 3.6."""

  python_version = (3, 6, 0)

  def test_setup_annotations(self):
    self.assertSimple(85, 'SETUP_ANNOTATIONS')

  def test_store_annotation(self):
    self.assertName([127, 0], 'STORE_ANNOTATION')

  def test_extended_arg(self):
    """Same as the py3.5 extended arg test, but using the wordcode format."""
    # LOAD_CONST should be stored in the jump table with an address of 0, due to
    # the extended arg; if we don't do this we would throw an exception.
    code = [
        0x90, 1,  # 0 EXTENDED_ARG, arg=1,
        0x64, 2,  # 3 LOAD_CONST, arg=2
        0x71, 0,  # 6 JUMP_ABSOLUTE, arg=0
    ]
    expected = [
        ('LOAD_CONST', 0x102),
        ('JUMP_ABSOLUTE',)
    ]
    self.assertDisassembly(code, expected)


class Python37Test(_TestBase):
  """Test bytecodes specific to Python 3.7."""

  python_version = (3, 7, 0)

  def test_load_method(self):
    self.assertName([160, 1], 'LOAD_METHOD')

  def test_call_method(self):
    self.assertName([161, 0], 'CALL_METHOD')


class Python38Test(_TestBase):
  python_version = (3, 8, 0)

  def test_non_monotonic_line_numbers(self):
    # Make sure we can deal with line number tables that aren't
    # monotonic. That is:
    #
    # line 1: OPCODE_1
    # line 2: OPCODE_2
    # line 1: OPCODE 3

    # Compiled from:
    # f(
    #   1,
    #   2
    #  )
    code = [
        0x65, 0,    # LOAD_NAME, arg=0th name
        0x64, 0,    # LOAD_CONST, arg=0th constant
        0x64, 1,    # LOAD_CONST, arg=1st constant
        0x83, 0x2,  # CALL_FUNCTION, arg=2 function arguments
        0x53, 0x0   # RETURN_VALUE
    ]
    expected = [
        ('LOAD_NAME', 0),
        ('LOAD_CONST', 0),
        ('LOAD_CONST', 1),
        ('CALL_FUNCTION', 2),
        ('RETURN_VALUE',)
    ]
    self.assertDisassembly(code, expected)
    lnotab = [
        0x2, 0x1,  # +2 addr, +1 line number
        0x2, 0x1,  # +2 addr, +1 line number
        0x2, 0xfe  # +2 addr, -2 line number
    ]
    self.assertLineNumbers(code, lnotab, [1, 2, 3, 1, 1])


if __name__ == '__main__':
  unittest.main()
