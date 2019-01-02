import React from "react";
import createHistory from 'history/createBrowserHistory';
import {Router, Route, Switch} from 'react-router-dom';
import NotFoundPage from './../components/NotFoundPage';
import LoginPage from './../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';

export const history = createHistory();

const AppRouter = () => (
   <Router history={history}>
      <div>
         <Switch>
            <PublicRoute path="/" component={LoginPage} exact />
            <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
            <PrivateRoute path="/edit/:id" component={EditExpensePage} />
            <PrivateRoute path="/create" component={AddExpensePage} />
            <Route component={NotFoundPage} />
         </Switch>
      </div>
   </Router>
);

export default AppRouter;