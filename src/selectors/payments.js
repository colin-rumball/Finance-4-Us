import moment from 'moment';

export const getFilteredPayments = (payments, {startDate, endDate, owner}, currentPageId) => {
	return payments.filter((payment) => {
		const startDateMatch = startDate ? startDate.isSameOrBefore(moment(payment.createdAt), 'day') : true;
		const endDateMatch = endDate ? endDate.isSameOrAfter(moment(payment.createdAt), 'day') : true;
		const ownerMatch = owner ? payment.owner === owner : true;
		const pageMatch = currentPageId ? payment.pageId === currentPageId : true;

		return startDateMatch && endDateMatch && ownerMatch && pageMatch;
	});
};

export const getPaidBalance = (payments, owner) => {
	const paidBalance = payments
	.filter((payment) => owner ? payment.owner === owner : true)
	.map((payment) => payment.amount);
	return paidBalance.length > 0 ?
	paidBalance.reduce((acc, curr) => acc + curr) :
	0;
};