const pagesReducerDefaultState = [];

const pagesReducer = (state = pagesReducerDefaultState, action) => {
	switch (action.type)
	{
		case 'SET_CURRENT_PAGE':
			return state.map((page) => {
				page.current = page.id === action.id;
				return {
					current: false,
					...page
				};
			});
		case 'ADD_PAGE':
			return [...state, action.page];
		case 'REMOVE_PAGE':
			return state.filter(page => page.id !== action.id);
		case 'SET_PAGES':
			return action.pages;
		default:
			return state;
	}
};

export default pagesReducer;
