import moment from 'moment';

const filtersReducerDefaultState = {
   text: '',
   sortBy: 'date', //date or amount
   startDate: moment().startOf('month'),
	endDate: moment().endOf('month'),
	category: null,
	owner: ''
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
	// if (typeof state.startDate === 'string' || typeof state.endDate === 'string') {
		state = {
			startDate: moment().startOf('month'),
			endDate: moment().endOf('month'),
			...state
		};
	// }
   switch(action.type)
   {
		case 'SET_TEXT':
			return {...state, text: action.text};
		case 'SORT_BY_AMOUNT':
			return {...state, sortBy: 'amount'};
		case 'SORT_BY_DATE':
			return {...state, sortBy: 'date'};
		case 'SET_START_DATE':
			return {...state, startDate: action.startDate};
		case 'SET_END_DATE':
			return {...state, endDate: action.endDate};
		case 'SET_CATEGORY':
			return {...state, category: action.category};
		case 'SET_OWNER':
			return {...state, owner: action.owner};
      default:
         return state;
   }
};

export default filtersReducer;