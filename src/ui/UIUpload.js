import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import * as firebase from 'firebase';

export default class  UIUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: '',
            caption: '',
            description: ''
        }

        this.onFileUpload = this.onFileUpload.bind(this);
        this.onDescription = this.onDescription.bind(this);
        this.onCaption = this.onCaption.bind(this);
        this.onDataSubmit = this.onDataSubmit.bind(this);
    }

    onFileUpload(event) {
        var file = event.target.files[0];
        this.setState({
            url: file
        });
    }

    onDescription(event) {
        var value = event.target.value;
        this.setState({
            description: value
        });
    }

    onCaption(event) {
        var value = event.target.value;
        this.setState({
            caption: value
        });
    }

    onDataSubmit() {        
        var caption = this.state.caption;
        var description = this.state.description;

        var storageRef = firebase.storage().ref('thumbnail/' + this.state.url);
        var task = storageRef.put(this.state.url);

        task.on('state_changed', 
            function(snapshot) {},
            function(err) {},
            function() {
                var postKey = firebase.database().ref('Posts/').push().key;
                var downloadURL = task.snapshot.downloadURL;
                var updates = {};
                var postData = {
                    url: downloadURL,
                    caption: caption,
                    user: firebase.auth().currentUser.displayName,
                    description: description
                }
                updates['/Posts/'+postKey] = postData;
                firebase.database().ref().update(updates);    
            }
        );
    }

    render() {
        return(
            <div>
                <TextField multiLine={false} id="Caption" onChange={this.onCaption} />
                <TextField multiLine={true} id="Description" onChange={this.onDescription} />
                {/* <RaisedButton className="fileSearch" label="file search"> */}
                    <input type="file" onChange={this.onFileUpload} />
                {/* </RaisedButton> */}
                <RaisedButton onClick={this.onDataSubmit} secondary={true} label="submit"></RaisedButton>
            </div>
        );
    }
}