const sum = (a: number, b: number) => (a + b);

test('checks if 1 + 2 is equal to 3', () => {
  expect(sum(1, 2)).toBe(3);
});
