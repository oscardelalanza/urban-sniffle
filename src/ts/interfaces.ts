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

interface IExpenses {
  expenses:Array<ExpenseItem>,
  finalCurrency:Currency,
  add(item:ExpenseItem):boolean,
  get(index:number):ExpenseItem | null,
  getTotal():string,
  remove(id:number):boolean,
}

export { IExpenses, ExpenseItem };
