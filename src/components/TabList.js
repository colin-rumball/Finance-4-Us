import React from 'react';
import {connect} from 'react-redux';
import {getCurrentPage} from '../selectors/pages';
import {setCurrentPage, startAddPage} from '../actions/pages';

class TabList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newTabLabel: '',
			newTabLabelVisible: false
		};
	};
	onLabelChange = (e) => {
		e.stopPropagation();
		const newTabLabel = e.target.value;
		this.setState(() => ({newTabLabel}));
	};
	onNewPageRequested = () => {
		const label = this.state.newTabLabel;
		if (label) {
			this.props.startAddPage(this.state.newTabLabel);
			this.setState(() => ({newTabLabel: ''}));
		}
	};
	onMouseEnterNewPage= () => {
		this.setState(() => ({newTabLabelVisible: true}));
	};
	onMouseExitNewPage= () => {
		this.setState((prevState) => {
			const newTabLabelVisible = !!prevState.newTabLabel;
			return {
				newTabLabelVisible
			};
		});
	};
	render = () => {
		return (
			<div className="tabs">
				{this.props.pages.map(page => (
					<button 
						key={page.id}
						className={page.current ? "tabs__tab--selected" : "tabs__tab"} 
						onClick={() => {this.props.onTabClicked(page.id)}}
					>
						<h3>{page.label}</h3>
					</button>
				))}
				<div 
					className="tabs__add-tab"
					onMouseEnter={this.onMouseEnterNewPage}
					onMouseLeave={this.onMouseExitNewPage}
				>
					{this.state.newTabLabelVisible &&
					<input 
						className={"text-input"}
						type="text"
						placeholder="Name"
						value={this.state.newTabLabel}
						onClick={(e) => {e.stopPropagation()}}
						onClickCapture={(e) => {e.stopPropagation()}}
						onChange={this.onLabelChange}
					/>}
					<button 
						className="button" 
						onClick={this.onNewPageRequested}
						
					>
						<h3>+</h3>
					</button>
				</div>
			</div>
		);
	};
}

const mapStateToProps = (state) => {
	return {
		pages: state.pages,
		currentPage: getCurrentPage(state.pages)
	};
}

const mapDispatchToProps = (dispatch, props) => {
   return({
		onTabClicked: (pageId) => {
			dispatch(setCurrentPage(pageId))
		},
		startAddPage: label => {dispatch(startAddPage({label}))}
   });
}

export default connect(mapStateToProps, mapDispatchToProps)(TabList);