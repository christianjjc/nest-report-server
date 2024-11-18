export class DecimalFormatter {
  static formatDecimal = new Intl.NumberFormat('es-PE', {
    // style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  static getDecimalFormat(value: number): string {
    return this.formatDecimal.format(value);
  }
}
