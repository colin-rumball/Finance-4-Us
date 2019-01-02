import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    addPayment, 
    editPayment, 
    removePayment, 
    startAddPayment, 
    setPayments, 
    startSetPayments, 
    startRemovePayment, 
    startEditPayment
} from './../../actions/payments';
import payments from './../fixtures/payments';
import database from './../../firebase/firebase';
import databaseRefs from '../../firebase/databaseRefs';

const uid = 'fake_uid';
const defaultAuthState = {auth: {uid}};
const createMockStore = configureMockStore([thunk]);

beforeEach(async (done) => {
    const paymentsData = {};
    payments.forEach(({id, description, owner, note, amount, createdAt}) => {
        paymentsData[id] = {description, owner, note, amount, createdAt};
    });
    await database.ref(databaseRefs.payments(uid)).set(paymentsData);
    done();
});

test('Should setup remove payment action object', () => {
    const action = removePayment({id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_PAYMENT',
        id: '123abc'
    })
});

test('should remove payment from firebase', async (done) => {
    const store = createMockStore(defaultAuthState);
    const payment = payments[1];
    await store.dispatch(startRemovePayment(payment));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
        type: 'REMOVE_PAYMENT',
        id: payment.id
    });
    const snapshot = await database.ref(databaseRefs.payments(uid, payment.id)).once('value');
    expect(snapshot.val()).toBeFalsy();
    done();
});

test('Should setup edit payment action object', () => {
    const action = editPayment('123abc', {note: 'New Note Value'});
    expect(action).toEqual({
        type: 'EDIT_PAYMENT',
        id: '123abc',
        updates: {
            note: 'New Note Value'
        }
    })
});

test('should edit an payment on firebase', async (done) => {
    const store = createMockStore(defaultAuthState);
    const amount = 123221;
    await store.dispatch(startEditPayment(payments[0].id, {amount}));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
        type: 'EDIT_PAYMENT',
        id: payments[0].id,
        updates: {amount}
    });
    const snapshot = await database.ref(databaseRefs.payments(uid, payments[0].id)).once('value');
    expect(snapshot.val().amount).toBe(amount);
    done();
});

test('Should setup add payment action object with provided values', () => {
    const action = addPayment(payments[2]);
    expect(action).toEqual({
        type: 'ADD_PAYMENT',
        payment: payments[2]
    });
});

test('should add a verified payment to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const paymentData = {
        description: 'Internet Bill',
        note: 'its a bill',
        category: 'Groceries',
        owner: 'Greg',
        split: 22,
        amount: 13300,
		  createdAt: 0,
		  verified: true
    }

    store.dispatch(startAddPayment(paymentData))
    .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_PAYMENT',
            payment: {
                id: expect.any(String),
                ...paymentData
            }
        });
        return database.ref(databaseRefs.payments(uid, actions[0].payment.id)).once('value');
    })
    .then((snapshot) => {
        expect(snapshot.val()).toEqual(paymentData);
        done();
    });
});

test('should add an unverified payment with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const paymentDefaults = {
        description: '', 
        amount: 0, 
        createdAt: 0,
        category: '',
        owner: '',
        split: 50,
		  note: '',
		  verified: false
    }
    
    store.dispatch(startAddPayment())
    .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_PAYMENT',
            payment: {
                id: expect.any(String),
                ...paymentDefaults
            }
        });
        return database.ref(databaseRefs.payments(uid, actions[0].payment.id)).once('value');
    })
    .then((snapshot) => {
        expect(snapshot.val()).toEqual(paymentDefaults);
        done();
    });
});

test('should setup set payments action object with data', () => {
    const action = setPayments(payments);
    expect(action).toEqual({
        type: 'SET_PAYMENTS',
        payments
    });
});

test('should fetch the payments from firebase', async (done) => {
    const store = createMockStore(defaultAuthState);
    await store.dispatch(startSetPayments());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
        type: 'SET_PAYMENTS',
        payments
    });
    done();
});