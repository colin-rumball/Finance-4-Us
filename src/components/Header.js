import React from "react";
import {Link} from 'react-router-dom';
import {startLogout} from './../actions/auth';

const Header = () => (
	<header className="header">
		<div className="content-container">
			<div className="header__content">
				<Link className="header__title" to="/dashboard">
					<h1>Finance 4 Us</h1>
				</Link>
				<button className="button button--link" onClick={startLogout()}>Logout</button>
			</div>
		</div>
	</header>
);

export default Header;