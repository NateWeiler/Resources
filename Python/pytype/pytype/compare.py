"""Do comparisons involving abstract values."""

from pytype import abstract
from pytype import abstract_utils
from pytype import mixin
from pytype.pytd import slots

# Equality classes.
NUMERIC = frozenset({"__builtin__.bool", "__builtin__.int", "__builtin__.float",
                     "__builtin__.complex"})
STRING = frozenset({"__builtin__.str", "__builtin__.unicode"})

# Fully qualified names of types that are parameterized containers.
_CONTAINER_NAMES = frozenset({
    "__builtin__.list", "__builtin__.set", "__builtin__.frozenset"})


def _incompatible(left_name, right_name):
  """Incompatible primitive types can never be equal."""
  if left_name == right_name:
    return False
  for group in NUMERIC, STRING:
    if left_name in group and right_name in group:
      return False
  return True


def _is_primitive_constant(vm, value):
  if isinstance(value, mixin.PythonConstant):
    return value.pyval.__class__ in vm.convert.primitive_classes
  return False


def _is_primitive(vm, value):
  if _is_primitive_constant(vm, value):
    return True
  elif isinstance(value, abstract.Instance):
    return value.full_name in vm.convert.primitive_class_names
  return False


def _is_equality_cmp(op):
  return op in (slots.EQ, slots.NE)


def _compare_constants(op, left, right):
  try:
    return slots.COMPARES[op](left, right)
  except TypeError:
    # TODO(rechen): In host Python 3, some types are not comparable; e.g.,
    # `3 < ""` leads to a type error. We should do a Python 2-style comparison
    # for target Python 2 and log an error for target Python 3.
    return None


def _compare_primitive_constant(vm, op, left, right):
  if _is_primitive_constant(vm, right):
    ret = _compare_constants(op, left.pyval, right.pyval)
    if ret is not None:
      return ret
  return _compare_primitive(op, left, right)


def _compare_primitive(op, left, right):
  # Determines when primitives are definitely not equal by checking for
  # compatibility of their types.
  if (_is_equality_cmp(op) and
      isinstance(right, abstract.Instance) and
      _incompatible(left.full_name, right.full_name)):
    return op != slots.EQ
  return None


def _get_constant_tuple_prefix(value: abstract.Tuple):
  """Given a tuple, get its longest prefix of constant elements."""
  elements = []
  for element_var in value.pyval:
    try:
      element = abstract_utils.get_atomic_python_constant(
          element_var, tuple(value.vm.convert.primitive_classes))
    except abstract_utils.ConversionError:
      return tuple(elements)
    elements.append(element)
  return tuple(elements)


def _compare_constant_tuple_prefix(op, prefix, constant_tuple, reverse):
  """Compares a tuple's constant prefix against a constant tuple.

  Args:
    op: A comparison operator, such as LT (less than).
    prefix: A constant prefix of a non-constant tuple (referred to as "left" in
      the inline comments). So if left=(3, 2, ...), prefix=(3, 2).
    constant_tuple: A constant tuple (referred to as "right").
    reverse: Whether left and right should be reversed for the comparison.

  Returns:
    A bool of the comparison result if it can be determined, None otherwise.
  """
  length = min(len(prefix), len(constant_tuple))
  trimmed_prefix = prefix[:length]
  trimmed_constant_tuple = constant_tuple[:length]
  if trimmed_prefix == trimmed_constant_tuple:
    if len(prefix) >= len(constant_tuple):
      # right is a strict prefix of left (since left contains at least one
      # non-constant element in addition to `prefix`), so left > right.
      if reverse:
        return op in (slots.LT, slots.LE, slots.NE)
      else:
        return op in (slots.NE, slots.GE, slots.GT)
    # We have something like left=(3, ...), right=(3, 2). We cannot tell how
    # they would compare.
    return None
  # When left and right have non-equal, same-length prefixes, we can compare the
  # prefixes to get the comparison results for the full tuples. For example, if
  # we have op=LT, left=(3, ...), right=(4, 0), then:
  #   (3,) < (4,) => (3, ...) < (4, ...) => (3, ...) < (4, 0)
  if reverse:
    return _compare_constants(op, trimmed_constant_tuple, trimmed_prefix)
  else:
    return _compare_constants(op, trimmed_prefix, trimmed_constant_tuple)


def _compare_as_constant_tuples(op, left, right):
  """Checks if the values are constant tuples and compares them if so."""
  if (not isinstance(left, abstract.Tuple) or
      not isinstance(right, abstract.Tuple)):
    return None
  # For each tuple, get the longest prefix of constant elements. For example:
  #   Tuple(PythonConstant(2), Instance(int), PythonConstant(3))
  # will produce (2,).
  left_prefix = _get_constant_tuple_prefix(left)
  right_prefix = _get_constant_tuple_prefix(right)
  left_is_constant = len(left_prefix) == len(left.pyval)
  right_is_constant = len(right_prefix) == len(right.pyval)
  if left_is_constant and right_is_constant:
    # When all elements of both tuples are constants, we can natively call the
    # comparison operator on the tuples.
    return _compare_constants(op, left_prefix, right_prefix)
  if not left_is_constant and not right_is_constant:
    # Both tuples contain at least one non-constant element. It would be
    # possible in some cases to return a more precise result than None by
    # comparing constant prefixes, but it's complicated and not necessary for
    # the main motivating use case, `sys.version_info {op} (major, minor)`.
    return None
  # When only one tuple has non-constant elements, we can still get some
  # information by comparing its constant prefix against the constant tuple.
  if left_is_constant:
    return _compare_constant_tuple_prefix(op, right_prefix, left_prefix, True)
  else:
    return _compare_constant_tuple_prefix(op, left_prefix, right_prefix, False)


def _compare_tuple(op, left, right):
  ret = _compare_as_constant_tuples(op, left, right)
  if ret is not None:
    return ret
  # Determines when tuples are definitely not equal by checking their lengths.
  if (_is_equality_cmp(op) and
      isinstance(right, abstract.Tuple) and
      left.tuple_length != right.tuple_length):
    return op != slots.EQ
  return None


def _compare_dict(op, left, right):
  # Determines when dicts are definitely not equal by checking their key sets.
  if (_is_equality_cmp(op) and
      not left.could_contain_anything and
      isinstance(right, abstract.Dict) and
      not right.could_contain_anything and
      set(left.pyval) != set(right.pyval)):
    return op != slots.EQ
  return None


def cmp_rel(vm, op, left, right):
  """Compare two variables."""
  if _is_primitive_constant(vm, left):
    return _compare_primitive_constant(vm, op, left, right)
  elif _is_primitive(vm, left) and _is_primitive(vm, right):
    return _compare_primitive(op, left, right)
  elif isinstance(left, abstract.Tuple):
    return _compare_tuple(op, left, right)
  elif isinstance(left, abstract.Dict):
    return _compare_dict(op, left, right)
  else:
    return None


def compatible_with(value, logical_value):
  """Returns the conditions under which the value could be True or False.

  Args:
    value: An abstract value.
    logical_value: Either True or False.

  Returns:
    False: If the value could not evaluate to logical_value under any
        circumstance (e.g. value is the empty list and logical_value is True).
    True: If it is possible for the value to evaluate to the logical_value,
        and any ambiguity cannot be resolved by additional bindings.
  """
  if isinstance(value, abstract.List) and value.could_contain_anything:
    return True
  elif isinstance(value, abstract.Dict) and value.could_contain_anything:
    # Always compatible with False. Compatible with True only if type
    # parameters have been established (meaning that the dict can be
    # non-empty).
    return (not logical_value or
            bool(value.get_instance_type_parameter(abstract_utils.K).bindings))
  elif isinstance(value, abstract.LazyConcreteDict):
    return value.is_empty() != logical_value
  elif isinstance(value, mixin.PythonConstant):
    return bool(value.pyval) == logical_value
  elif isinstance(value, abstract.Instance):
    name = value.full_name
    if logical_value and name in _CONTAINER_NAMES:
      # Containers with unset parameters cannot match True.
      ret = (
          value.has_instance_type_parameter(abstract_utils.T) and
          bool(value.get_instance_type_parameter(abstract_utils.T).bindings))
      return ret
    elif name == "__builtin__.NoneType":
      # NoneType instances cannot match True.
      return not logical_value
    elif name in NUMERIC:
      # Numeric types can match both True and False
      return True
    elif isinstance(value.cls, mixin.Class) and not value.cls.overrides_bool:
      if getattr(value.cls, "template", None):
        # A parameterized class can match both True and False, since it might be
        # an empty container.
        return True
      # Objects evaluate to True unless explicitly overridden.
      return logical_value
    return True
  elif isinstance(value, (abstract.Function, mixin.Class)):
    # Functions and classes always evaluate to True.
    return logical_value
  else:
    # By default a value is ambiguous - it could potentially evaluate to either
    # True or False. Thus we return True here regardless of logical_value.
    return True
