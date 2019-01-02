import { getFilteredPayments, getPaidBalance } from "../../selectors/payments";
import payments from './../fixtures/payments';

test('should get the payments of a person', () => {
    const filter = {
        owner: payments[1].owner
    };
    const result = getFilteredPayments(payments, filter);
    expect(result).toEqual([payments[1], payments[2]]);
});

test('should get no payments of an invalid person', () => {
    const filter = {
        owner: 'invalid'
    };
    const result = getFilteredPayments(payments, filter);
    expect(result).toEqual([]);
});

test('should get a paid balance of 0 from an invalid person', () => {
    const hasPaid = getPaidBalance(payments, 'invalid');
    expect(hasPaid).toBe(0);
});


test('should get the correct paid balance of a person', () => {
    const hasPaid = getPaidBalance(payments, payments[1].owner);
    expect(hasPaid).toBe(payments[1].amount + payments[2].amount);
});