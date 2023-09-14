import { InvoiceCalculator } from './invoice-calculator';

describe('InvoiceCalculator', () => {
  it('calculates final price correctly with discount', () => {
    const quantity = 10;
    const unitPrice = 20;
    const discountPercentage = 15;
    const totalInstallments = 3;
    const calculator = new InvoiceCalculator(
      quantity,
      unitPrice,
      discountPercentage,
      totalInstallments,
    );

    const result = calculator.handle();

    expect(result.finalPrice).toBe(170);
  });

  it('calculates final price correctly without discount', () => {
    const quantity = 5;
    const unitPrice = 30;
    const discountPercentage = 0;
    const totalInstallments = 2;
    const calculator = new InvoiceCalculator(
      quantity,
      unitPrice,
      discountPercentage,
      totalInstallments,
    );

    const result = calculator.handle();

    expect(result.finalPrice).toBe(150);
  });

  it('calculates discount money correctly', () => {
    const quantity = 5;
    const unitPrice = 30;
    const discountPercentage = 10;
    const totalInstallments = 2;
    const calculator = new InvoiceCalculator(
      quantity,
      unitPrice,
      discountPercentage,
      totalInstallments,
    );

    const result = calculator.handle();

    expect(result.discountMoney).toBe(15);
  });

  it('calculates total installments correctly', () => {
    const quantity = 10;
    const unitPrice = 20;
    const discountPercentage = 0;
    const totalInstallments = 5;
    const calculator = new InvoiceCalculator(
      quantity,
      unitPrice,
      discountPercentage,
      totalInstallments,
    );

    const result = calculator.handle();

    expect(result.totalInstallments).toBe(5);
  });

  it('calculates price before discount correctly', () => {
    const quantity = 7;
    const unitPrice = 25;
    const discountPercentage = 20;
    const totalInstallments = 3;
    const calculator = new InvoiceCalculator(
      quantity,
      unitPrice,
      discountPercentage,
      totalInstallments,
    );

    const result = calculator.handle();

    expect(result.priceBeforeDiscount).toBe(175);
  });
});
