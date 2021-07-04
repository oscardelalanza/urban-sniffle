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

export { ExpenseItem };
