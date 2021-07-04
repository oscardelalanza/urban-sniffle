import { IExpenses, ExpenseItem } from './interfaces';
import { Currency } from './types';

class Expenses implements IExpenses {
  expenses: Array<ExpenseItem>;
  finalCurrency: Currency;
  private count = 0;

  constructor(currency:Currency) {
    this.finalCurrency = currency;
    this.expenses = [];
  }

  add(item: ExpenseItem): boolean {
    item.id = this.count;
    this.count += 1;
    this.expenses.push(item);
    return true;
  }

  get(index: number): ExpenseItem | null {
    return this.expenses.filter((e:ExpenseItem) => {
      let expense:ExpenseItem | null = null;
      if (e.id === index) {
        expense = e;
      }
      return expense;
    })[0];
  }

  getItems():Array<ExpenseItem> {
    return this.expenses;
  }

  getTotal(): string {
    return '';
  }

  remove(id: number): boolean {
    return false;
  }

  private convertCurrency(item:ExpenseItem, currency:Currency) {
    switch (item.cost.currency) {
      case 'USD':
        if (currency === 'MXN') return item.cost.number * 22;
        if (currency === 'USD') return item.cost.number;
        break;
      case 'MXN':
        if (currency === 'MXN') return item.cost.number;
        if (currency === 'USD') return item.cost.number / 22;
        break;
    }
  }

}
