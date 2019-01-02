import React from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import Select from 'react-select';
import {connect} from 'react-redux';
import { SingleDatePicker } from 'react-dates';
import {startAddPayment} from './../actions/payments';
import {setModal} from './../actions/modals';

class PaymentModal extends React.Component {
	state = {
		description: this.props.payment ? this.props.payment.description : '',
		amount: this.props.payment ? (this.props.payment.amount / 100).toString() : '',
		note: this.props.payment ? this.props.payment.note : '',
		createdAt: this.props.payment ? moment(this.props.payment.createdAt) : moment(),
		owner: this.props.payment ? this.props.payment.owner : '',
		calendarFocused: false,
		error: ''
	};
	onOwnerChange = (owner) => {
      this.setState(() => ({
			owner
		}));
	};
	onDescriptionChange = (e) => {
		const description = e.target.value;
		this.setState(() => ({description}));
	};
	onAmountChange = (e) => {
		const amount = e.target.value;
		if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
			this.setState(() => ({amount}));
		}
	};
	onFocusChange = (focused) => {
		this.setState(() => ({calendarFocused: focused.focused}));
	};
	onDateChange = (newDate) => {
		if (newDate) {
			this.setState(() => ({createdAt: newDate}));
		}
	};
	onNoteChange = (e) => {
		const note = e.target.value;
		this.setState(() => ({note}));
	};
	onSubmit = (e) => {
		e.preventDefault();
		if (!this.state.description || !this.state.amount || !this.state.owner) {
			this.setState(() => ({error: 'Please provide an amount, an owner, and a description'}));
		} else {
			this.setState(() => ({error: ''}));
			this.props.startAddPayment({
				description: this.state.description,
				amount: parseFloat(this.state.amount) * 100,
				createdAt: this.state.createdAt.valueOf(),
				owner: this.state.owner.value,
				note: this.state.note
			})
			this.props.onRequestClose();
		}
	};
	render() {
		return (
			<Modal
				isOpen={this.props.currentModal === 'payment'}
				onRequestClose={this.props.onRequestClose}
				contentLabel="Add Payment Information"
				closeTimeoutMS={200}
				className="modal"
			>
				<form className="form" onSubmit={this.onSubmit}>
				<p className="form__error">{this.state.error}</p>
				<input 
					className="text-input"
					type="text"
					placeholder="Description"
					autoFocus
					value={this.state.description}
					onChange={this.onDescriptionChange}
				/>
				<input 
					className="text-input"
					type="text"
					placeholder="Amount"
					value={this.state.amount}
					onChange={this.onAmountChange}
				/>
				<SingleDatePicker
					date={this.state.createdAt}
					onDateChange={this.onDateChange}
					focused={this.state.calendarFocused}
					onFocusChange={this.onFocusChange}
					numberOfMonths={1}
					isOutsideRange={() => false}
				/>
				<Select 
					options={[{value: 'colin', label: 'Colin'}, {value: 'nora', label: 'Nora'}]}
					onChange={this.onOwnerChange} 
					value={this.state.owner}
					placeholder="Owner" />
				<textarea
					className="textarea"
					placeholder="Add a note for your payment (optional)"
					value={this.state.note}
					onChange={this.onNoteChange} />
				<div>
					<button className="button">Save Payment</button>
				</div>
			</form>
			</Modal>
		);
	};
};

const mapDispatchToProps = (dispatch, props) => {
   return({
		onRequestClose: () => {dispatch(setModal(''))},
		startAddPayment: (payment) => {dispatch(startAddPayment(payment))}
   });
}

export default connect(undefined, mapDispatchToProps)(PaymentModal);