import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    addExpense, 
    editExpense, 
    removeExpense, 
    startAddExpense, 
    setExpenses, 
    startSetExpenses, 
    startRemoveExpense, 
    startEditExpense
} from './../../actions/expenses';
import expenses from './../fixtures/expenses';
import database from './../../firebase/firebase';
import databaseRefs from '../../firebase/databaseRefs';

const uid = 'fake_uid';
const defaultAuthState = {auth: {uid}};
const createMockStore = configureMockStore([thunk]);

beforeEach(async (done) => {
    const expensesData = {};
    expenses.forEach(({id, description, category, owner, split, note, amount, createdAt, verified}) => {
        expensesData[id] = {description, category, owner, split, note, amount, createdAt, verified};
    });
    await database.ref(databaseRefs.expenses(uid)).set(expensesData);
    done();
});

test('Should setup remove expense action object', () => {
    const action = removeExpense({id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
});

test('should remove expense from firebase', async (done) => {
    const store = createMockStore(defaultAuthState);
    const expense = expenses[1];
    await store.dispatch(startRemoveExpense(expense));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id: expense.id
    });
    const snapshot = await database.ref(databaseRefs.expenses(uid, expense.id)).once('value');
    expect(snapshot.val()).toBeFalsy();
    done();
});

test('Should setup edit expense action object', () => {
    const action = editExpense('123abc', {note: 'New Note Value'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'New Note Value'
        }
    })
});

test('should edit an expense on firebase', async (done) => {
    const store = createMockStore(defaultAuthState);
    const amount = 123221;
    await store.dispatch(startEditExpense(expenses[0].id, {amount}));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
        type: 'EDIT_EXPENSE',
        id: expenses[0].id,
        updates: {amount}
    });
    const snapshot = await database.ref(databaseRefs.expenses(uid, expenses[0].id)).once('value');
    expect(snapshot.val().amount).toBe(amount);
    done();
});

test('Should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should add a verified expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: 'Internet Bill',
        note: 'its a bill',
        category: 'Groceries',
        owner: 'Greg',
        split: 22,
        amount: 13300,
		  createdAt: 0,
		  verified: true
    }

    store.dispatch(startAddExpense(expenseData))
    .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        return database.ref(databaseRefs.expenses(uid, actions[0].expense.id)).once('value');
    })
    .then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add an unverified expense with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseDefaults = {
        description: '', 
        amount: 0, 
        createdAt: 0,
        category: '',
        owner: '',
        split: 50,
		  note: '',
		  verified: false
    }
    
    store.dispatch(startAddExpense())
    .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefaults
            }
        });
        return database.ref(databaseRefs.expenses(uid, actions[0].expense.id)).once('value');
    })
    .then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults);
        done();
    });
});

test('should setup set expenses action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expenses from firebase', async (done) => {
    const store = createMockStore(defaultAuthState);
    await store.dispatch(startSetExpenses());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
    done();
});