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
    const total = this.getItems().reduce((acc, current) => {
      return acc += this.convertCurrency(current, this.finalCurrency);
    }, 0);
    return `${this.finalCurrency} $${total.toFixed(2)}`;
  }

  remove(id: number): boolean {
    this.expenses = this.getItems().filter(item => {
      return item.id != id;
    });
    return true;
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

const btnAdd:HTMLButtonElement = <HTMLButtonElement> document.getElementById('btn-add');
const title:HTMLInputElement = <HTMLInputElement> document.getElementById('title');
const cost:HTMLInputElement = <HTMLInputElement> document.getElementById('cost');
const currency:HTMLInputElement = <HTMLInputElement> document.getElementById('currency');
const expenses = new Expenses('USD');
const render = () => {
  const items = <HTMLTableSectionElement> document.getElementById('items');
  const display = <HTMLTableSectionElement> document.getElementById('display');
   let html = '';
  expenses.getItems().forEach(item => {
    const { id, title, cost } = item;
    const { number, currency } = cost;
    html += `
      <div class="item">
        <div><span class="currency">${currency}</span> ${number}</div>
        <div>${title}</div>
        <div><button class="btn-remove" data-id="${id}">Eliminar</button></div>
      </div>
    `
  });
  items.innerHTML = html;
  display.innerText = expenses.getTotal();
  document.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', e => {
      const button:HTMLButtonElement = <HTMLButtonElement> e.target
      expenses.remove(parseInt(button.getAttribute('data-id')!));
      render();
    });
  });
};

btnAdd.addEventListener('click', e => {
  if (title.value != '' && cost.value != '' && !isNaN(parseFloat(cost.value))) {
    expenses.add({ title: title.value, cost: { number: parseFloat(cost.value), currency: <Currency> currency.value } });
    render();
  }
});

render();