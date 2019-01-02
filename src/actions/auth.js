import {firebase, googleAuthProvider} from '../firebase/firebase';

export const login = uid => ({
   type: 'LOGIN',
   uid
});

export const startGoogleLogin = () => {
   return () => firebase.auth().signInWithPopup(googleAuthProvider);
};

export const startAnonymousLogin = () => {
   return () => firebase.auth().signInAnonymously().catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// ...
		console.log(errorCode, errorMessage);
	 });
};

export const logout = () => ({
   type: 'LOGOUT'
});

export const startLogout = () => {
   return () => firebase.auth().signOut();
}