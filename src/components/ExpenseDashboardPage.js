import React from 'react';
import ExpenseList from './ExpensesList';
import ExpenseListFilters from './ExpenseListFilters';
import ExpensesSummary from './ExpensesSummary';
import TabList from './TabList';

const ExpenseDashboardPage = () => (
	<div>
		<TabList />
		<ExpensesSummary/>
		<ExpenseListFilters/>
		<ExpenseList/>
	</div>
);

export default ExpenseDashboardPage;