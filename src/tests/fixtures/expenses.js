import moment from 'moment';

export default [{
    id: '1',
    description: 'Rent For March',
    note: '',
    split: 66,
    owner: 'Bob',
    category: 'Rent',
    amount: 1000,
	 createdAt: 0,
	 verified: true
},{
    id: '2',
    description: 'Phone bill',
    note: '',
    split: 35,
    owner: 'Greg',
    category: 'Rent',
    amount: 2000,
    createdAt: moment(0).subtract(4, 'days').valueOf(),
	 verified: true
},{
    id: '3',
    description: 'Food',
    note: '',
    split: 90,
    owner: 'Bob',
    category: 'Rent',
    amount: 3000,
    createdAt: moment(0).add(4, 'days').valueOf(),
	 verified: true
}];