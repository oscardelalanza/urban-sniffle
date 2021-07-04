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
  expenses:ArrayList<ExpenseItem>,
  finalCurrency:Currency,
  add(item:ExpenseItem):boolean,
  get():ExpenseItem | null,
}

export { Expenses };
