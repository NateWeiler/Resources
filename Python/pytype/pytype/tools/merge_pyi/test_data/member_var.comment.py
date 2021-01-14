# pytype generates member variable annotations as comments, check that fix_annotate ignores them
# properly

class C(object):
    def __init__(self, x):
        # type: (Union[complex, float, int, long]) -> None
        self.y = 1 + x
