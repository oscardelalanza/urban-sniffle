"use strict";
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
        this.expenses = this.getItems().filter(function (item) {
            return item.id != id;
        });
        return true;
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
var btnAdd = document.getElementById('btn-add');
var title = document.getElementById('title');
var cost = document.getElementById('cost');
var currency = document.getElementById('currency');
var expenses = new Expenses('USD');
var render = function () {
    var items = document.getElementById('items');
    var display = document.getElementById('display');
    var html = '';
    expenses.getItems().forEach(function (item) {
        var id = item.id, title = item.title, cost = item.cost;
        var number = cost.number, currency = cost.currency;
        html += "\n      <div class=\"item\">\n        <div><span class=\"currency\">" + currency + "</span> " + number + "</div>\n        <div>" + title + "</div>\n        <div><button class=\"btn-remove\" data-id=\"" + id + "\">Eliminar</button></div>\n      </div>\n    ";
    });
    items.innerHTML = html;
    display.innerText = expenses.getTotal();
    document.querySelectorAll('.btn-remove').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            var button = e.target;
            expenses.remove(parseInt(button.getAttribute('data-id')));
            render();
        });
    });
};
btnAdd.addEventListener('click', function (e) {
    if (title.value != '' && cost.value != '' && !isNaN(parseFloat(cost.value))) {
        expenses.add({ title: title.value, cost: { number: parseFloat(cost.value), currency: currency.value } });
        render();
    }
});
render();
