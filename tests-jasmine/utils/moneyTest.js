import formatCurrency from "../../scripts/utils/money.js";

describe('formatCurrency function', () => {
  it('should convert cents into dollars', () => {
      expect(formatCurrency(2095)).toEqual('20.95');
  });
  it('works with 0', () => {
      expect(formatCurrency(0)).toEqual('0.00');
  });
  it('rounds up to the nearest cent', () => {
      expect(formatCurrency(2095.6789)).toEqual('20.96');
  });
});
