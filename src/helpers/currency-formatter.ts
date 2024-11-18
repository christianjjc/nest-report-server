export class CurrencyFormatter {
  static formatCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  static getCurrencyFormat(value: number): string {
    return this.formatCurrency.format(value);
  }
}
