import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({id, description, amount, createdAt, owner, verified, dispatch}) => (
	<Link className={verified ? "list-item" : "list-item--unverified"} to={`/edit/${id}`}>
		<div>
			<h3 className="list-item__title">{description}</h3>
			<span className="list-item__subtitle">{moment(createdAt).format('MMMM Do, YYYY')}</span>
		</div> 
		<h3 className="list-item__data">{owner} - {numeral(amount / 100).format('$0,0.00')}</h3>
	</Link>
);

export default ExpenseListItem;