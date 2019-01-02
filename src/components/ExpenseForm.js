import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment'; 
import numeral from 'numeral';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {RadioGroup, Radio} from 'react-radio-group';
import Select from 'react-select/lib/Creatable';
import Slider from './ExpenseSlider';
import {getCategoryFromId, getCategoriesForPage} from './../selectors/categories';
import {startAddCategory} from './../actions/categories';
import { getCurrentPage } from '../selectors/pages';

class ExpenseForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			description: props.expense ? props.expense.description : '',
			amount: props.expense ? (props.expense.amount / 100).toString() : '',
			note: props.expense ? props.expense.note : '',
			createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
			split: props.expense ? props.expense.split : 50,
			category: props.expense ? props.expense.category : '',
			owner: props.expense ? props.expense.owner : '',
			calendarFocused: false,
			error: ''
		};
	}
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
	onNoteChange = (e) => {
		const note = e.target.value;
		this.setState(() => ({note}));
	};
	onDateChange = (newDate) => {
		if (newDate) {
			this.setState(() => ({createdAt: newDate}));
		}
	};
	onCategoryChange = (category) => {
		this.setState(() => ({category: category.id}));
	};
	onCreateCategory = async (label) => {
		const newCategory = await this.props.dispatch(startAddCategory(label));
		this.setState(() => ({category: newCategory.id}));
	};
	onOwnerChange = (owner) => {
		this.setState(() => ({owner}));
	}
	onSplitChange = (split) => {
		this.setState(() => ({split}));
	};
	onFocusChange = (focused) => {
		this.setState(() => ({calendarFocused: focused.focused}));
	};
	onSubmit = (e) => {
		e.preventDefault();
		if (!this.state.description || !this.state.amount || !this.state.owner || !this.state.category) {
			this.setState(() => ({error: 'Please provide an amount, an owner, a category, and a description'}));
		} else {
			this.setState(() => ({error: ''}));
			this.props.onSubmit({
				description: this.state.description,
				amount: parseFloat(this.state.amount) * 100,
				createdAt: this.state.createdAt.valueOf(),
				split: this.state.split,
				category: this.state.category,
				owner: this.state.owner,
				note: this.state.note,
				verified: true,
			});
		}
	};
	render() {
		return (
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
				<RadioGroup 
					name="people" 
					selectedValue={this.state.owner} 
					onChange={this.onOwnerChange}
					className="form__radio-group"
				>
					<div><Radio value="colin" />Colin</div>
					<div><Radio value="nora" />Nora</div>
				</RadioGroup>
				<Slider 
					split={this.state.split} 
					onChange={this.onSplitChange}
				/>
				<div className="form__split-summary">
					<input 
						className="text-input"
						type="text"
						value={numeral((this.state.amount * (this.state.split / 100))).format('$0,0.00')}
						onChange={this.onDescriptionChange}
					/>
					<input 
						className="text-input"
						type="text"
						value={`${this.state.split}% | ${100 - this.state.split}%`}
						onChange={this.onDescriptionChange}
					/>
					<input 
						className="text-input"
						type="text"
						value={numeral((this.state.amount * ((100 - this.state.split) / 100))).format('$0,0.00')}
						onChange={this.onDescriptionChange}
					/>
				</div>
				<Select 
					options={this.props.categories} 
					onChange={this.onCategoryChange} 
					onCreateOption={this.onCreateCategory}
					value={getCategoryFromId(this.state.category, this.props.categories)}
					placeholder="Category" />
				<textarea
					className="textarea"
					placeholder="Add a note for your expense (optional)"
					value={this.state.note}
					onChange={this.onNoteChange} />
				<div>
					<button className="button">Save Expense</button>
				</div>
			</form>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		categories: state.categories
	};
};

export default connect(mapStateToProps)(ExpenseForm);
