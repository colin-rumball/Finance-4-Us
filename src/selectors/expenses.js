import moment from 'moment';

export const getFilteredExpenses = (expenses, {text, sortBy, startDate, endDate, category, owner}, currentPageId) => {
	return expenses.filter((exp) => {
		const startDateMatch = startDate ? moment(startDate).isSameOrBefore(moment(exp.createdAt), 'day') : true;
		const endDateMatch = endDate ? moment(endDate).isSameOrAfter(moment(exp.createdAt), 'day') : true;
		const textMatch = exp.description.toLowerCase().includes(text.toLowerCase());
		const categoryMatch = category ? exp.category === category.id : true;
		const ownerMatch = owner ? exp.owner === owner.value : true;

		return startDateMatch && endDateMatch && textMatch && categoryMatch && ownerMatch;
	}).sort((a, b) => {
		if (sortBy === 'date') {
			return b.createdAt - a.createdAt;
		} else {
			return a.amount - b.amount;
		}
	});
};

export const getExpensesTotal = (expenses) => {
   return expenses
   .map((exp) => exp.amount)
   .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
};

export const getBalanceOwing = (expenses, owner) => {
	const amountsOwing = expenses
	.filter((exp) => exp.owner !== owner)
	.map((exp) => {
		if (owner === 'colin') {
			return exp.amount * ((exp.split) / 100);
		} else {
			return exp.amount * ((100 - exp.split) / 100);
		}
	});

	return amountsOwing.length > 0 ?
	amountsOwing.reduce((acc, curr) => acc + curr) :
	0;
};