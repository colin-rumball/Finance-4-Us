import moment from 'moment';

export default [{
    id: '1',
    description: 'Rent For March',
    note: '',
    owner: 'Bob',
    amount: 1000,
    createdAt: 0
},{
    id: '2',
    description: 'Phone bill',
    note: '',
    owner: 'Greg',
    amount: 2000,
    createdAt: moment(0).subtract(4, 'days').valueOf()
},{
    id: '3',
    description: 'Food',
    note: '',
    owner: 'Greg',
    amount: 3000,
    createdAt: moment(0).add(4, 'days').valueOf()
}];