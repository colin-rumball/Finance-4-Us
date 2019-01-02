export const setTextFilter = (text = '') => ({
	type: 'SET_TEXT',
	text
});

export const sortByAmount = () => ({
	type: 'SORT_BY_AMOUNT'
});

export const sortByDate = () => ({
	type: 'SORT_BY_DATE'
});

export const setStartDate = (date) => ({
	type: 'SET_START_DATE',
	startDate: date
});

export const setEndDate = (date) => ({
	type: 'SET_END_DATE',
	endDate: date
});

export const setCategory = (category) => ({
	type: 'SET_CATEGORY',
	category
});

export const setOwner = (owner) => ({
	type: 'SET_OWNER',
	owner
});