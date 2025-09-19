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
      expect(formatCurrency(2000.4)).toEqual('20.00');
  });
  it('works with negative numbers' , ()=> {
    expect(formatCurrency(-2030)).toEqual('-20.30');
  })
});
