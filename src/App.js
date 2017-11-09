import React, { Component } from 'react';

import { DB_CONFIG } from './asset/Config';
import * as firebase from 'firebase';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UIUpload from './ui/UIUpload';
import Thumb from './list/Thumb';

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
			} else {
				// No user is signed in.
				auth.signInWithPopup(authProvider);
			}
		});

		// this.state = {
		// 	data: []
		// }
	}

	componentWillMount() {
		
	}

	componentDidMount() {
		// this.db.on('value', (snapshot) => {
		// 	snapshot.forEach(function(childSnapshot) {
		// 		var childData = childSnapshot.val();

        //         var postData = {
        //             url: childData.url,
        //             caption: childData.caption,
        //             user: childData.user,
        //             description: childData.description
		// 		}
				
		// 		this.setState({
		// 			data: postData
		// 		});
		// 	}.bind(this));
		// });
	}

	render() {		
		return (			
			<div>
				<MuiThemeProvider>
					<UIUpload></UIUpload>
				</MuiThemeProvider>
				<MuiThemeProvider>
					<Thumb></Thumb>
					{/* <Thumb data={this.state.data}></Thumb> */}
				</MuiThemeProvider>
			</div>
		);
	}
}

export default App;
