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

  getTotal(): string {
    return '';
  }

  remove(id: number): boolean {
    return false;
  }

}
