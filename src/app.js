import '@babel/polyfill/dist/polyfill';
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import AppRouter, {history} from './routers/AppRouter';
// import {startSetExpenses} from './actions/expenses';
// import {startSetCategories} from './actions/categories';
// import {startSetPayments} from './actions/payments';
import {startSetPages} from './actions/pages';
import {startSetCategories} from './actions/categories';
import {setExpenses} from './actions/expenses';
import {login, logout} from './actions/auth';
import {getCurrentPage} from './selectors/pages';
import configureStore from './store/configureStore';
import LoadingPage from './components/LoadingPage';
import {firebase} from './firebase/firebase';
import 'normalize.css';
import './styles/styles.scss';

const {store, persistor} = configureStore();

const jsx = (
   <Provider store={store}>
		<PersistGate loading={<LoadingPage/>} persistor={persistor}>
	  		<AppRouter/>
		</PersistGate>
   </Provider>
);

let hasRendered = false;
const renderApp = () => {
   if (hasRendered) {
	  return;
   }

   hasRendered = true;
   ReactDOM.render(jsx, document.getElementById('app'));
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged(async (user) => {
	if (user) {
		store.dispatch(login(user.uid));
		const pages = await store.dispatch(startSetPages());

		const currentPage = getCurrentPage(pages);
		store.dispatch(setExpenses(currentPage.expenses));

		await store.dispatch(startSetCategories(currentPage.categories));
	// 	await store.dispatch(startSetPayments());
		renderApp();
		if (history.location.pathname === '/') {
			history.push('/dashboard');
		}
		
	} else {
		store.dispatch(logout());
		renderApp();
		history.push('/');
	}
});