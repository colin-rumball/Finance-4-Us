import React from 'react';
import {connect} from 'react-redux';
import Header from './../components/Header';
import {Route, Redirect} from 'react-router-dom';
import CSVModal from './../components/CSVModal';
// import PaymentModal from '../components/PaymentModal';

export const PrivateRoute = ({
	isAuthenticated, 
	currentModal,
	component: Component,
	...rest
}) => (
	<Route {...rest} component={(props) => (
		isAuthenticated ? (
			<div>
				{/* Modals */}
				{/* <PaymentModal currentModal={currentModal} /> */}
				<CSVModal />
				<Header/>
				<Component {...props}/>
			</div>
		) : (
			<Redirect to="/"/>
		)
	)}/>
);

const mapStateToProps = (state) => ({
	isAuthenticated: !!state.auth.uid,
	currentModal: state.modal
});

export default connect(mapStateToProps)(PrivateRoute);