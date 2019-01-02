import database from '../firebase/firebase';
import databaseRefs from '../firebase/databaseRefs';

export const setCurrentPage = id => ({
   type: 'SET_CURRENT_PAGE',
   id,
});

export const addPage = page => ({
   type: 'ADD_PAGE',
   page
});

export const startAddPage = (pageData = {}) => {
   return (dispatch, getState) => {
      const {uid} = getState().auth;
      const {
			label = ''
      } = pageData;
      const newPage = {label};
		return database.ref(databaseRefs.pages())
		.push(newPage)
		.then((pageRef) => {
			// pageRef.child('users').push(uid);
			// database.ref(databaseRefs.accessablePages(uid)).push(pageRef.key);
			dispatch(addPage({
				id: pageRef.key,
				...newPage
			}));
			dispatch(setCurrentPage(pageRef.key));
		})
   };
};

export const removePage = ({id} = {}) => ({
   type: 'REMOVE_PAGE',
   id
});

export const startRemovePage = ({id} = {}) => {
   return (dispatch, getState) => {
      return database.ref(databaseRefs.pages(id))
      .remove()
      .then(() => {
         dispatch(removePage({id}));
      });
   };
};

export const setPages = (pages) => ({
   type: 'SET_PAGES',
   pages
});


export const startSetPages = () => {
   return async (dispatch, getState) => {
      let pages = await database.ref(databaseRefs.pages()).once('value');
		const procPages = [];
		pages.forEach((page) => {
			const expenses = [];
			page.child('expenses').forEach((expense) => {
				expenses.push({
					id: expense.key,
					...expense.val()
				});
			});
			procPages.push({
				id: page.key,
				...page.val(),
				expenses
			});
		});
		dispatch(setPages(procPages));
		if (procPages.length > 0) {
			dispatch(setCurrentPage(procPages[0].id));
		}
		return procPages;
   };
};