const categoriesReducerDefaultState = [];

const categoriesReducer = (state = categoriesReducerDefaultState, action) => {
   switch (action.type)
   {
      case 'ADD_CATEGORY':
			return [...state, action.category];
		case 'REMOVE_CATEGORY':
			return state.filter(category => category.id !== action.id);
      case 'SET_CATEGORIES':
			return action.categories || categoriesReducerDefaultState;
      default:
         return state;
   }
};

export default categoriesReducer;