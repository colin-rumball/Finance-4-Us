import moment from 'moment';
import {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from './../../actions/filters';

test('Should generate set start date action object', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});

test('Should generate set end date action object', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    });
});

test('Should generate a set text filter action object with provided parameters', () => {
    const text = 'rent';
    const action = setTextFilter(text);
    expect(action).toEqual({
        type: 'SET_TEXT',
        text
    });
});

test('Should generate a set text filter action object with default parameters', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT',
        text: ''
    });
});

test('Should generate a sort by date filter action object', () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    });
});

test('Should generate a sort by amount filter action object', () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    });
});