import React, { Component } from 'react';

import { DB_CONFIG } from './asset/Config';
import * as firebase from 'firebase';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UIUpload from './ui/UIUpload';
import Thumb from './list/Thumb';
import AppHeader from './layout/AppHeader';
import AppBottom from './layout/AppBottom';
import Detail from './detail/Detail';

import update from 'react-addons-update';

class App extends Component {
	constructor(props) {
		super(props);
		
		this.app = firebase.initializeApp(DB_CONFIG);		
		this.db = this.app.database().ref().child('Posts/');

		var auth = firebase.auth();
		var authProvider = new firebase.auth.GoogleAuthProvider();

		auth.onAuthStateChanged(function(user) {
			user = firebase.auth().currentUser;
			if (user) {
				// User is signed in.
				// console.log(user.displayName);
				// console.log('uid: ' + user.uid);
				console.log(user.photoURL);
			} else {
				// No user is signed in.
				auth.signInWithPopup(authProvider);
			}
		});
	}

	render() {		
		return (			
			<div>
				<MuiThemeProvider>
					<AppHeader title={this.props.title}></AppHeader>
				</MuiThemeProvider>				
				<MuiThemeProvider>
					<UIUpload onRemove={this.handleRemove}></UIUpload>
				</MuiThemeProvider>
				<MuiThemeProvider>
					<Thumb></Thumb>
				</MuiThemeProvider>
				{/* <MuiThemeProvider>
					<AppBottom></AppBottom>
				</MuiThemeProvider> */}
				<MuiThemeProvider>
					<Detail></Detail>
				</MuiThemeProvider>
			</div>
		);
	}
}

App.defaultProps = {
	title: 'React & Firebase Post'
}

export default App;