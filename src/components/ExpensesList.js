import React from 'react';
import {connect} from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import {getCurrentPage} from '../selectors/pages';
import {getFilteredExpenses} from './../selectors/expenses';
import { getFilteredPayments } from '../selectors/payments';

 const ExpenseList = (props) => (
   <div className="content-container">
		<div className="list-header">
			<div className="show-for-mobile">Expenses</div>
			<div className="show-for-desktop">Expense</div>
			<div className="show-for-desktop">Amount</div>
		</div>
		<div className="list-body">
   		{props.expenses.map((exp) => <ExpenseListItem key={exp.id} {...exp} />)}
		</div>
   </div>
 );
 
 const mapStateToProps = (state) => {
   return {
		expenses: getFilteredExpenses(state.expenses, state.filters, getCurrentPage(state.pages).id)
   };
 };

 export default connect(mapStateToProps)(ExpenseList);
