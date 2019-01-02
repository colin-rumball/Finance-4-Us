import React from 'react';
import {connect} from 'react-redux';
import {startEditExpense, startRemoveExpense} from './../actions/expenses';
import ExpenseForm from './ExpenseForm';
import {getCurrentPage} from '../selectors/pages';

const EditExpensePage = (props) => {
   return (
      <div>
         <div className="page-header">
            <div className="content-container">
               <h1 className="page-header__title">Edit Expense</h1>
            </div>
         </div>
         <div className="content-container">
            <ExpenseForm
               expense={props.expense}
               onSubmit={(exp) => {
                  props.dispatch(startEditExpense(props.expense, exp));
                  props.history.push('/');
               }}
            />
            <button 
               className="button button--secondary"
               onClick={() => {
                  props.dispatch(startRemoveExpense(props.expense));
                  props.history.push('/');
               }}
            >
            Remove Expense
            </button>
         </div>
      </div>
   );
};

const mapStateToProps = (state, props) => {
   return {
      expense: state.expenses.find((exp) => exp.id === props.match.params.id)
   };
};

export default connect(mapStateToProps)(EditExpensePage);