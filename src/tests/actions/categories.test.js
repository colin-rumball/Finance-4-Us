import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	addCategory,
	startAddCategory,
	removeCategory,
	startRemoveCategory,
	setCategories,
	startSetCategories
} from '../../actions/categories';

import database from '../../firebase/firebase';
import categories from '../fixtures/categories';
import databaseRefs from '../../firebase/databaseRefs';

const uid = 'fake_uid';
const defaultAuthState = {auth: {uid}};
const createMockStore = configureMockStore([thunk]);

beforeEach(async (done) => {
    const categoriesData = {};
    categories.forEach(({id, value, label}) => {
        categoriesData[id] = {value, label};
    });
    await database.ref(databaseRefs.categories(uid)).set(categoriesData);
    done();
});

test('Should setup remove category action object', () => {
    const action = removeCategory({id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_CATEGORY',
        id: '123abc'
    })
});

test('should remove category from firebase', async (done) => {
    const store = createMockStore(defaultAuthState);
    const category = categories[1];
    await store.dispatch(startRemoveCategory(category));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
        type: 'REMOVE_CATEGORY',
        id: category.id
    });
    const snapshot = await database.ref(databaseRefs.categories(uid, category.id)).once('value');
    expect(snapshot.val()).toBeFalsy();
    done();
});

test('Should setup add category action object with provided values', () => {
    const action = addCategory(categories[2]);
    expect(action).toEqual({
        type: 'ADD_CATEGORY',
        category: categories[2]
    });
});

test('should add a category to database and store', (done) => {
   const store = createMockStore(defaultAuthState);
   const categoryData = {
		label: 'Test',
		value: 'test'
   };

   store.dispatch(startAddCategory(categoryData.label))
   .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_CATEGORY',
            category: {
               id: expect.any(String),
               ...categoryData
            }
        });
        return database.ref(databaseRefs.categories(uid, actions[0].category.id)).once('value');
   })
   .then((snapshot) => {
      expect(snapshot.val()).toEqual(categoryData);
      done();
   });
});

test('should setup set categories action object with data', () => {
   const action = setCategories(categories);
   expect(action).toEqual({
      type: 'SET_CATEGORIES',
      categories
   });
});

test('should fetch the categories from firebase', async (done) => {
    const store = createMockStore(defaultAuthState);
    await store.dispatch(startSetCategories());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
        type: 'SET_CATEGORIES',
        categories
    });
    done();
});