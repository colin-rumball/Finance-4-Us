import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorag
import thunk from 'redux-thunk';
import expensesReducer from './../reducers/expenses';
import filtersReducer from './../reducers/filters';
import categoriesReducer from './../reducers/categories';
import modalsReducer from './../reducers/modals';
import authReducer from './../reducers/auth';
import pagesReducer from './../reducers/pages';
import paymentsReducer from '../reducers/payments';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
	expenses: expensesReducer,
	payments: paymentsReducer,
	filters: filtersReducer,
	pages: pagesReducer,
	categories: categoriesReducer,
	modal: modalsReducer,
	auth: authReducer
});

const persistConfig = {
	key: 'root',
	storage,
 }
  
 const persistedReducer = persistReducer(persistConfig, reducers)

export default () => {
   const store = createStore(
      persistedReducer,
      composeEnhancers(applyMiddleware(thunk))
	);
	const persistor = persistStore(store);

   return {store, persistor};
};
