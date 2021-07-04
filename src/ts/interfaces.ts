import { Currency } from './types';

interface Price {
  number:number,
  currency:Currency
}

interface ExpenseItem {
  id:number,
  title:string,
  const:Price
}

interface Expenses {
  expenses:ExpenseItem[],
  finalCurrency:Currency,
  add(item:ExpenseItem):boolean,
  get():ExpenseItem | null,
  getTotal():string,
  remove(id:number):boolean,
}

export { Expenses };
