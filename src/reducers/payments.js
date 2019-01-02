const paymentsReducerDefaultState = [];

const paymentsReducer = (state = paymentsReducerDefaultState, action) => {
   switch(action.type)
   {
      case 'ADD_PAYMENT':
      	return [...state, action.payment]
      case 'REMOVE_PAYMENT':
      	return state.filter((exp) => exp.id !== action.id)
		case 'EDIT_PAYMENT':
			return state.map((exp) => {
				if (exp.id === action.id) {
					return {
						...exp, 
						...action.updates
					};
				} else {
					return exp;
				}
			});
		case 'SET_PAYMENTS':
			return action.payments;
      default:
         return state;
   }
};

export default paymentsReducer;