import React from 'react';
import {connect} from 'react-redux';
import {startGoogleLogin, startAnonymousLogin} from './../actions/auth';

const LoginPage = (props) => {
   return (
      <div className="box-layout">
         <div className="box-layout__box">
            {/* <h1 className="box-layout__title">Finance 4 Us</h1> */}
            <button className="button" onClick={startGoogleLogin()}>Login with Google</button>
				{/* <button className="button" onClick={startAnonymousLogin()}>Login Anonymousely</button> */}
         </div>
      </div>
   );
}

const mapDispatchToProps = (dispatch) => ({
	startGoogleLogin,
	startAnonymousLogin
});

export default connect()(LoginPage);