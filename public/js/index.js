"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expenses = void 0;
var Expenses = /** @class */ (function () {
    function Expenses(currency) {
        this.count = 0;
        this.finalCurrency = currency;
        this.expenses = [];
    }
    Expenses.prototype.add = function (item) {
        item.id = this.count;
        this.count += 1;
        this.expenses.push(item);
        return true;
    };
    Expenses.prototype.get = function (index) {
        return this.expenses.filter(function (e) {
            var expense = null;
            if (e.id === index) {
                expense = e;
            }
            return expense;
        })[0];
    };
    Expenses.prototype.getItems = function () {
        return this.expenses;
    };
    Expenses.prototype.getTotal = function () {
        var _this = this;
        var total = this.getItems().reduce(function (acc, current) {
            return acc += _this.convertCurrency(current, _this.finalCurrency);
        }, 0);
        return this.finalCurrency + " $" + total.toFixed(2);
    };
    Expenses.prototype.remove = function (id) {
        return false;
    };
    Expenses.prototype.convertCurrency = function (item, currency) {
        var value = item.cost.number;
        switch (item.cost.currency) {
            case 'USD':
                if (currency === 'MXN')
                    value = item.cost.number * 22;
                if (currency === 'USD')
                    value = item.cost.number;
                break;
            case 'MXN':
                if (currency === 'MXN')
                    value = item.cost.number;
                if (currency === 'USD')
                    value = item.cost.number / 22;
                break;
            default:
                value = item.cost.number;
        }
        return value;
    };
    return Expenses;
}());
exports.Expenses = Expenses;
var btnAdd = document.getElementById('btn-add');
var title = document.getElementById('title');
var cost = document.getElementById('cost');
var currency = document.getElementById('currency');
var expenses = new Expenses('USD');
var render = function () {
    var items = document.getElementById('items');
    expenses.getItems().forEach(function (item) {
        var id = item.id, title = item.title, cost = item.cost;
        var number = cost.number, currency = cost.currency;
        var itemDiv = document.createElement('div');
        var div = document.createElement('div');
        itemDiv.className = 'item';
        div.innerHTML = "<span class='currency'>" + currency + "</span> " + number;
        itemDiv.appendChild(div);
        div.innerHTML = "" + title;
        itemDiv.appendChild(div);
        div.innerHTML = "<button class=\"btn-remove\" data-id=\"" + id + "\">Eliminar</button>";
        itemDiv.appendChild(div);
        items.appendChild(itemDiv);
    });
};
btnAdd.addEventListener('click', function (e) {
    if (title.value != '' && cost.value != '' && !isNaN(parseFloat(cost.value))) {
        expenses.add({ title: title.value, cost: { number: parseFloat(cost.value), currency: currency.value } });
        render();
    }
});
