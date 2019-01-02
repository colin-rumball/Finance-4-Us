import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import numeral from 'numeral';
import {getFilteredExpenses, getExpensesTotal, getBalanceOwing} from '../selectors/expenses';
import {setModal} from '../actions/modals';
import { getFilteredPayments, getPaidBalance } from '../selectors/payments';
import { getCurrentPage } from '../selectors/pages';

const ExpensesSummary = ({expenseCount, expenseTotal, colinOwes, noraOwes, colinPaid, noraPaid, openCSVModal, openPaymentModal}) => (
	<div className="page-header">
		<div className="content-container">
			<h1 className="page-header__title">Viewing <span>{expenseCount}</span> expense(s) totalling <span>{expenseTotal}</span></h1>
			<h1 className="page-header__title">Colin owes <span>{colinOwes}</span> to <span>{'Nora'}</span></h1>
			<h1 className="page-header__title">Nora owes <span>{noraOwes}</span> to <span>{'Colin'}</span></h1>
			<h1 className="page-header__title">Colin has paid <span>{colinPaid}</span> to <span>{'Nora'}</span></h1>
			<h1 className="page-header__title">Nora has paid <span>{noraPaid}</span> to <span>{'Colin'}</span></h1>
			<div className="page-header__actions">
				<Link className="button" to="/create">Add Expense</Link>
				<button className="button" onClick={openCSVModal}>Upload CSV Data</button>
				<button className="button" onClick={openPaymentModal}>Add Payment</button>
			</div>
		</div>
	</div>
);

const formatCurrency = amount => numeral(amount / 100).format('$0,0.00');

const mapStateToProps = (state, props) => {
	const visibleExpenses = getFilteredExpenses(state.expenses, state.filters, getCurrentPage(state.pages).id);
	const validPayments = getFilteredPayments(state.payments, state.filters, getCurrentPage(state.pages).id);
   return {
      visibleExpenses,
      expenseCount: visibleExpenses.length,
		expenseTotal: formatCurrency(getExpensesTotal(visibleExpenses) /*- getPaidBalance(validPayments)*/),
		colinOwes: formatCurrency(getBalanceOwing(visibleExpenses, 'colin') /*- getPaidBalance(validPayments, 'colin')*/),
		noraOwes: formatCurrency(getBalanceOwing(visibleExpenses, 'nora') /*- getPaidBalance(validPayments, 'nora')*/),
		colinPaid: formatCurrency(getPaidBalance(validPayments, 'colin')),
		noraPaid: formatCurrency(getPaidBalance(validPayments, 'nora'))
   };
};

const mapDispatchToProps = (dispatch, props) => ({
	openCSVModal: () => dispatch(setModal('csv')),
	openPaymentModal: () => dispatch(setModal('payment'))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesSummary);