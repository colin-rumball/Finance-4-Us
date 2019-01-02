import React from 'react';
import Modal from 'react-modal';
import csv from 'csv';
import Dropzone from 'react-dropzone'
import moment from 'moment';
import Select from 'react-select';
import {connect} from 'react-redux';
import {startAddExpense} from './../actions/expenses';
import {setModal} from './../actions/modals';

class CSVModal extends React.Component {
	state = {
		owner: {value: 'colin', label: 'Colin'}
	};
	onOwnerChange = (owner) => {
      this.setState(() => ({
			owner
		}));
   };
	render() {
		return (
			<Modal
				isOpen={this.props.currentModal === 'csv'}
				onRequestClose={this.props.onRequestClose}
				contentLabel="Upload CSV Data"
				closeTimeoutMS={200}
				className="modal"
			>
				<div>
					<Select 
                  options={[{value: 'colin', label: 'Colin'}, {value: 'nora', label: 'Nora'}]} 
						onChange={this.onOwnerChange} 
						value={this.state.owner}
						isClearable={false}
						placeholder="Owner" />
					<Dropzone 
						onDropAccepted={
							(files) => {
								const reader = new FileReader();
								reader.onload = () => {
									csv.parse(reader.result ,{delimiter: ','}, (err, values) => {
										values.forEach(value => {
											value[2] *= -1;
											if (value[2] > 0) {
												this.props.startAddExpense({
													description: value[1], 
													amount: value[2] * 100, 
													createdAt: moment(value[0], 'MM/DD/YYYY').valueOf(),
													owner: this.state.owner.value
												});
											}
										});
									});
								};
								reader.onabort = () => console.log('file reading was aborted');
								reader.onerror = () => console.log('file reading has failed');
								
								reader.readAsText(files[0]);
							}
						}
					>
						Drag and drop your CSV file here
					</Dropzone>
				</div>
			</Modal>
		);
	};
};

const mapStateToProps = (state) => {
   return({
		currentModal: state.modal
   });
}

const mapDispatchToProps = (dispatch) => {
   return({
		onRequestClose: () => {dispatch(setModal(''))},
		startAddExpense: (expense) => {dispatch(startAddExpense(expense))}
   });
}

export default connect(mapStateToProps, mapDispatchToProps)(CSVModal);