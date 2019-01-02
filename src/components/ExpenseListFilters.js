import React from 'react';
import {connect} from 'react-redux';
import {DateRangePicker} from 'react-dates';
import Select from 'react-select';
import {mapIdToCategory} from './../selectors/categories';
import {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate, setCategory, setOwner} from './../actions/filters';
import { getCurrentPage } from '../selectors/pages';

class ExpenseListFilters extends React.Component {
   state = {
      calendarFocused: null
   };
   onDatesChange = ({startDate, endDate}) => {
      this.props.dispatch(setStartDate(startDate));
      this.props.dispatch(setEndDate(endDate));
   };
   onFocusChange = (calendarFocused) => {
      this.setState(() => ({calendarFocused}));
   };
   onCategoryChange = (category) => {
      this.props.dispatch(setCategory(category));
   };
   onOwnerChange = (owner) => {
      this.props.dispatch(setOwner(owner));
   };
   render() {
      return (
         <div className="content-container">
            <div className="input-group">
               <div className="input-group__item">
                  <input 
                     type="text" 
                     className="text-input"
                     placeholder="Search Expenses"
                     value={this.props.filters.text} 
                     onChange={(e) => {
                        this.props.dispatch(setTextFilter(e.target.value));
                     }}
                  />
               </div>
               <div className="input-group__item">
                  <select 
                     className="select"
                     value={this.props.filters.sortBy}
                     onChange={(e) => {
                        const sortByAction = e.target.value === 'date' ? sortByDate() : sortByAmount();
                        this.props.dispatch(sortByAction);
                     }}
                  >
                     <option value="date">Date</option>
                     <option value="amount">Amount</option>
                  </select>
               </div>
               <div className="input-group__item">
                  <DateRangePicker
                     startDate={this.props.filters.startDate}
                     startDateId="your_unique_start_date_id"
                     endDate={this.props.filters.endDate}
                     endDateId="your_unique_end_date_id"
                     onDatesChange={this.onDatesChange}
                     focusedInput={this.state.calendarFocused}
                     onFocusChange={this.onFocusChange}
                     showClearDates={true}
                     numberOfMonths={1}
                     isOutsideRange={() => false}
                  />
               </div>
               <div style={{'flexGrow': '1'}} className="input-group__item">
                  <Select 
                     options={this.props.categories} 
                     onChange={this.onCategoryChange} 
                     value={this.props.filters.category}
                     isClearable={true}
                     placeholder="Category" />
               </div>
               <div style={{'flexGrow': '1'}} className="input-group__item">
                  <Select 
                     options={[{value: 'colin', label: 'Colin'}, {value: 'nora', label: 'Nora'}]} 
                     onChange={this.onOwnerChange} 
                     value={this.props.filters.owner}
                     isClearable={true}
                     placeholder="Owner" />
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      categories: state.categories,
      filters: state.filters
   };
};

export default connect(mapStateToProps)(ExpenseListFilters);