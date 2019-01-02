import database from '../firebase/firebase';
import databaseRefs from '../firebase/databaseRefs';
import {getCurrentPage} from '../selectors/pages';

export const addCategory = category => ({
	type: 'ADD_CATEGORY',
	category
});

export const startAddCategory = (label) => {
	return (dispatch, getState) => {
		const currentPage = getCurrentPage(getState().pages);
		const newCategory = { 
			value: label.toLowerCase(), 
			label
		};
		return database.ref(databaseRefs.categories()).push(newCategory)
		.then((ref) => {
			return dispatch(addCategory({
				id: ref.key,
				...newCategory
		 	})).category;
		});
	};
};

export const removeCategory = ({id} = {}) => ({
	type: 'REMOVE_CATEGORY',
	id
});

export const startRemoveCategory = ({id, pageId} = {}) => {
	return (dispatch, getState) => {
		return database.ref(databaseRefs.categories(id))
		.remove()
		.then(() => {
			dispatch(removeCategory({id}));
		});
	};
};

export const setCategories = categories => ({
	type: 'SET_CATEGORIES',
	categories
});

export const startSetCategories = () => {
	return async (dispatch, getState) => {
		const categories = [];
		const snapshot = await database.ref(databaseRefs.categories()).once('value');
		snapshot.forEach((child) => {
			categories.push({
				id:  child.key,
				...child.val()
			});
		});
		dispatch(setCategories(categories));
	};
};