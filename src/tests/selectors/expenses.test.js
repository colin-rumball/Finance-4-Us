import moment from 'moment';
import {getExpensesTotal, getFilteredExpenses, getBalanceOwing} from './../../selectors/expenses';
import expenses from './../fixtures/expenses';

test('should return 0 if no expenses are passed in', () => {
    const res = getExpensesTotal([]);
    expect(res).toBe(0);
 });
 
 test('should return the total of an array with only one expense', () => {
    const res = getExpensesTotal([expenses[0]]);
    expect(res).toBe(expenses[0].amount);
 });
 
 test('should return the total of many expenses', () => {
    const res = getExpensesTotal(expenses);
    const total = expenses[0].amount + expenses[1].amount + expenses[2].amount;
    expect(res).toBe(total);
 });

test('Should filter by text value', () => {
    const filters = {
        text: 'food',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const result = getFilteredExpenses(expenses, filters);
    expect(result).toEqual([expenses[2]]);
});

test('Should filter by start date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    };
    const result = getFilteredExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[0]]);
});

test('Should filter by end date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0).add(2, 'days')
    };
    const result = getFilteredExpenses(expenses, filters);
    expect(result).toEqual([expenses[0], expenses[1]]);
});

test('Should sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const result = getFilteredExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});

test('Should sort by amount', () => {
    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };
    const result = getFilteredExpenses(expenses, filters);
    expect(result).toEqual([expenses[0], expenses[1], expenses[2]]);
});

test('Should get the owing balance for a person', () => {
    const balanceOwing = (((100 - expenses[0].split) / 100) * expenses[0].amount) + (((100 - expenses[2].split) / 100) * expenses[2].amount);
    expect(getBalanceOwing(expenses, expenses[1].owner)).toBe(balanceOwing);
});