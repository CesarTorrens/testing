const { sum, divide, multiply } = require('./02-math');

describe('math', () => {
  describe('sum', () => {
    test('sum of 1 + 3 should be 4', () => {
      const rta = sum(1, 3);
      expect(rta).toBe(4);
    });
  });
  describe('multiply', () => {
    test('mutiply 3 * 5 should be 15', () => {
      const rta = multiply(3, 5);
      expect(rta).toBe(15);
    });
  });
  describe('divide', () => {
    test('should divide', () => {
      const rta = divide(6, 3);
      expect(rta).toBe(2);

      const rta2 = divide(5, 2);
      expect(rta2).toBe(2.5);
    });

    test('should divide by 0', () => {
      const rta = divide(6, 0);
      expect(rta).toBeNull();

      const rta2 = divide(5, 0);
      expect(rta2).toBeNull();
    });
  });
});
