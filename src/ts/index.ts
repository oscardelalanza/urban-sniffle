type Currency = 'MXN' | 'USD';

interface Price {
  number:number,
  currency:Currency
}

interface ExpenseItem {
  id?:number,
  title:string,
  cost:Price
}

interface IExpenses {
  expenses:Array<ExpenseItem>,
  finalCurrency:Currency,
  add(item:ExpenseItem):boolean,
  get(index:number):ExpenseItem | null,
  getTotal():string,
  remove(id:number):boolean,
}

export class Expenses implements IExpenses {
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
    const total = this.getItems().reduce((acc, current) => {
      return acc += this.convertCurrency(current, this.finalCurrency);
    }, 0);
    return `${this.finalCurrency} $${total.toFixed(2)}`;
  }

  remove(id: number): boolean {
    return false;
  }

  private convertCurrency(item:ExpenseItem, currency:Currency):number {
    let value:number = item.cost.number;

    switch (item.cost.currency) {
      case 'USD':
        if (currency === 'MXN') value = item.cost.number * 22;
        if (currency === 'USD') value = item.cost.number;
        break;
      case 'MXN':
        if (currency === 'MXN') value = item.cost.number;
        if (currency === 'USD') value = item.cost.number / 22;
        break;
      default:
        value = item.cost.number;
    }
    return value;
  }
}

const btnAdd = <HTMLButtonElement> document.getElementById('btn-add');
const title = <HTMLInputElement> document.getElementById('title');
const cost = <HTMLInputElement> document.getElementById('cost');
const currency = <HTMLInputElement> document.getElementById('currency');
const expenses = new Expenses('USD');
const render = () => {
  const items = <HTMLTableSectionElement> document.getElementById('items');
  expenses.getItems().forEach(item => {
    const { id, title, cost } = item;
    const { number, currency } = cost;
    const itemDiv:HTMLDivElement = document.createElement('div');
    const div:HTMLDivElement = document.createElement('div');
    itemDiv.className = 'item';
    div.innerHTML = `<span class='currency'>${currency}</span> ${number}`;
    itemDiv.appendChild(div);
    div.innerHTML = `${title}`;
    itemDiv.appendChild(div);
    div.innerHTML = `<button class="btn-remove" data-id="${id}">Eliminar</button>`;
    itemDiv.appendChild(div);
    items.appendChild(itemDiv);
  })
};

btnAdd.addEventListener('click', e => {
  if (title.value != '' && cost.value != '' && !isNaN(parseFloat(cost.value))) {
    expenses.add({ title: title.value, cost: { number: parseFloat(cost.value), currency: <Currency> currency.value } });
    render();
  }
});
