const myScript = require('./my-script.js');


test('greeting()', () => {
  expect(myScript.greeting('friend')).toBe('Hello, friend!');
});

if (myScript.add) {
  test('add()', () => {
    expect(myScript.add(501, 182)).toBe(683);
    expect(myScript.add('a', 'b')).toBe('ab');
  });
}

if (myScript.subtract) {
  test('subtract()', () => {
    expect(myScript.subtract(9, 9)).toBe(0);
    expect(myScript.subtract(9, -9)).toBe(18);
  });
}

if (myScript.min) {
  test('min()', () => {
    expect(myScript.min(1, 6)).toBe(1);
    expect(myScript.min(-10, -20)).toBe(-20);
  });
}

if (myScript.max) {
  test('max()', () => {
    expect(myScript.max(1, 6)).toBe(6);
    expect(myScript.max(-10, -20)).toBe(-10);
  });
}

if (myScript.isEven) {
  test('isEven()', () => {
    expect(myScript.isEven(0)).toBe(true);
    expect(myScript.isEven(222)).toBe(true);
    expect(myScript.isEven(111)).toBe(false);
  });
}

if (myScript.isOdd) {
  test('isOdd()', () => {
    expect(myScript.isOdd(0)).toBe(false);
    expect(myScript.isOdd(222)).toBe(false);
    expect(myScript.isOdd(111)).toBe(true);
  });
}

if (myScript.factorial) {
  test('factorial()', () => {
    expect(myScript.factorial(9)).toBe(362880);
  });
}

if (myScript.oddFactorial) {
  test('oddFactorial()', () => {
    expect(myScript.oddFactorial(5)).toBe(15);
    expect(myScript.oddFactorial(6)).toBe(15);
  });
}

if (myScript.chessboard) {
  test('chessboard()', () => {
    const grid = ` # # #
# # # 
 # # #
# # # 
 # # #
# # # 
`;
    expect(myScript.chessboard(6)).toBe(grid);
  });
}

const fns = [
  'add', 'subtract', 'min', 'max', 'isEven', 'isOdd',
  'factorial', 'oddFactorial', 'chessboard',
].filter(fn => !myScript[fn]);

if (fns.length) console.error('The following functions have not been defined:', fns.join(', '));

