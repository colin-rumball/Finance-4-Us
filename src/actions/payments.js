import database from './../firebase/firebase';
import databaseRefs from '../firebase/databaseRefs';
import {getCurrentPage} from '../selectors/pages';

export const editPayment = (id, updates) => ({
   type: 'EDIT_PAYMENT',
   id,
   updates
});

export const startEditPayment = ({id, pageId}, updates) => {
   return (dispatch, getState) => {
      return database.ref(databaseRefs.payments(pageId, id))
      .update(updates)
      .then(() => {
         dispatch(editPayment(id, updates));
      });
   };
};

export const addPayment = (payment) => ({
   type: 'ADD_PAYMENT',
   payment
});

export const startAddPayment = (paymentData = {}) => {
   return (dispatch, getState) => {
      const currentPage = getCurrentPage(getState().pages);
      const {
         description = '', 
         amount = 0, 
         createdAt = 0,
         split = 50,
         category = '',
         owner = '',
			note = '',
			pageId = currentPage.id
      } = paymentData;
      const newPayment = {description, amount, createdAt, split, category, owner, note, pageId};
      return database.ref(databaseRefs.payments(currentPage.id))
      .push(newPayment)
      .then((ref) => {
         dispatch(addPayment({
            id: ref.key,
            ...newPayment
         }));
      });
   };
};

export const removePayment = ({id} = {}) => ({
   type: 'REMOVE_PAYMENT',
   id
});

export const startRemovePayment = ({id, pageId} = {}) => {
   return (dispatch, getState) => {
      return database.ref(databaseRefs.payments(pageId, id))
      .remove()
      .then(() => {
         dispatch(removePayment({id}));
      });
   }; 
};

export const setPayments = (payments) => ({
   type: 'SET_PAYMENTS',
   payments
});

export const startSetPayments = () => {
   return (dispatch, getState) => {
		const requests = [];
		const pages = getState().pages;
		pages.forEach(page => {
			requests.push(database.ref(databaseRefs.payments(page.id)).once('value'));
		});
		
		const payments = [];
		return Promise.all(requests).then((responsesSnapshots) => {
			responsesSnapshots.forEach((snapshot, index) => {
				snapshot.forEach((child) => {
					payments.push({
						id:  child.key,
						...child.val()
					});
				});
			});
			dispatch(setPayments(payments));
		});
   };
};