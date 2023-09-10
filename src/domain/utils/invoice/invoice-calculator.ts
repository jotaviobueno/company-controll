import { InvoiceCalculatorModel } from 'src/domain/models';

export class InvoiceCalculator {
  private quantity: number;
  private unitPrice: number;
  private finalPrice: number;

  // discount
  private discountPercentage: number;
  private discountMoney: number;
  private priceBeforeDiscount: number;

  // Installment
  private totalInstallments: number;
  private totalAfterInstallment: number;
  private lastInstallment: number;

  private total = 0;

  constructor(
    quantity: number,
    unitPrice: number,
    discountPercentage: number,
    totalInstallments: number,
  ) {
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.discountPercentage = discountPercentage;
    this.totalInstallments = totalInstallments;

    this.calculateValues();
  }

  private calculateValues() {
    this.getTotal();
    this.getDiscount();
    this.getPriceBeforeDiscount();
    this.getFinalPrice();
  }

  private getTotal() {
    this.total = this.unitPrice * this.quantity;
  }

  private getDiscount() {
    this.discountMoney =
      (this.discountPercentage / 100) * (this.unitPrice * this.quantity);
  }

  private getPriceBeforeDiscount() {
    this.priceBeforeDiscount = this.total;
  }

  private getFinalPrice() {
    this.finalPrice = this.total - this.discountMoney;
  }

  handle(): InvoiceCalculatorModel {
    return {
      finalPrice: Math.floor(this.finalPrice),
      discountMoney: Math.floor(this.discountMoney),
      priceBeforeDiscount: Math.floor(this.priceBeforeDiscount),
      totalInstallments: this.totalInstallments,
      lastInstallment: this.lastInstallment,
      totalAfterInstallment: this.totalAfterInstallment,
    };
  }
}
