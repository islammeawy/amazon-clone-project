import formatCurrency from "../scripts/utils/money.js";

describe('formatCurrency', () => {
  it('converts cents into dollars (string with 2 decimals)', () => {
    expect(formatCurrency(2025)).toEqual('20.25');
    expect(formatCurrency(0)).toEqual('0.00');
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });
});