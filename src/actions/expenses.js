import database from '../firebase/firebase';
import databaseRefs from '../firebase/databaseRefs';
import {getCurrentPage} from '../selectors/pages';

export const editExpense = (id, updates) => ({
   type: 'EDIT_EXPENSE',
   id,
   updates
});

export const startEditExpense = ({id, pageId}, updates) => {
   return (dispatch, getState) => {
      return database.ref(databaseRefs.expenses(pageId, id))
      .update(updates)
      .then(() => {
         dispatch(editExpense(id, updates));
      });
   };
};

export const addExpense = (expense) => ({
   type: 'ADD_EXPENSE',
   expense
});

export const startAddExpense = (expenseData = {}) => {
   return (dispatch, getState) => {
      const currentPageId = getCurrentPage(getState().pages).id;
      const {
         description = '', 
         amount = 0, 
         createdAt = 0,
         split = 50,
         category = '',
         owner = '',
			note = '',
			verified = false
      } = expenseData;
      const newExpense = {description, amount, createdAt, split, category, owner, note, verified};
      return database.ref(databaseRefs.expenses(currentPageId))
      .push(newExpense)
      .then((ref) => {
         dispatch(addExpense({
            id: ref.key,
            ...newExpense
         }));
      });
   };
};

export const removeExpense = ({id} = {}) => ({
   type: 'REMOVE_EXPENSE',
   id
});

export const startRemoveExpense = ({id, pageId} = {}) => {
   return (dispatch, getState) => {
      return database.ref(databaseRefs.expenses(pageId, id))
      .remove()
      .then(() => {
         dispatch(removeExpense({id}));
      });
   }; 
};

export const setExpenses = (expenses) => ({
   type: 'SET_EXPENSES',
   expenses
});


// export const startSetExpenses = () => {
//    return (dispatch, getState) => {
// 		const requests = [];
// 		const pages = getState().pages;
// 		pages.forEach(page => {
// 			requests.push(database.ref(databaseRefs.expenses(page.id)).once('value'));
// 		});
		
// 		const expenses = [];
// 		return Promise.all(requests).then((responsesSnapshots) => {
// 			responsesSnapshots.forEach((snapshot) => {
// 				snapshot.forEach((child) => {
// 					expenses.push({
// 						id:  child.key,
// 						...child.val()
// 					});
// 				});
// 			});
// 			dispatch(setExpenses(expenses));
// 		});
//    };
// };