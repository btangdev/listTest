import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import * as firebase from 'firebase';

import './css/UI.css';

export default class  UIUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            caption: '',
            description: '',
            datas: Object,
            fileVal: ''
        }

        this.onFileUpload = this.onFileUpload.bind(this);
        this.onDataSubmit = this.onDataSubmit.bind(this);
        this.onHandleChange = this.onHandleChange.bind(this);
    }

    onFileUpload(event) {
        var file = event.target.files[0];
        this.setState({
            datas: file
        });
    }

    onHandleChange(event) {
        let nextState = {};
        nextState[event.target.name] = event.target.value;
        this.setState(nextState);
    }

    onDataSubmit() {        
        var caption = this.state.caption;
        var description = this.state.description;
        var dataKey = firebase.database().ref('Posts/').push().key;
        var storageRef = firebase.storage().ref('thumbnail/' + dataKey);
        var task = storageRef.put(this.state.datas);        

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
                    userPhoto: firebase.auth().currentUser.photoURL,
                    userEmail: firebase.auth().currentUser.email,
                    description: description
                }
                updates['/Posts/'+postKey] = postData;
                firebase.database().ref().update(updates);    
            }
        );

        this.setState({
            caption: '',
            description: '',
            fileVal: ''
        });
    }

    render() {
        return(
            <div>
                <Paper zDepth={3} rounded={false} className="formStyle">
                    <TextField hintText="제목을 입력하세요" fullWidth={true} floatingLabelText="제목을 입력하세요" multiLine={false} id="Caption" name="caption" value={this.state.caption} onChange={this.onHandleChange} />
                    <TextField hintText="내용을 입력하세요" fullWidth={true} floatingLabelText="내용을 입력하세요" multiLine={true} id="Description" name="description" value={this.state.description} onChange={this.onHandleChange} />
                    <input type="file" onChange={this.onFileUpload} />
                    <RaisedButton onClick={this.onDataSubmit} value={this.state.fileVal} secondary={true} label="submit" ></RaisedButton>
                    {/* <RaisedButton onClick={this.props.onRemove} primary={true} label="REMOVE" ></RaisedButton> */}
                </Paper>
            </div>
        );
    }
}

UIUpload.defaultProps = {
    onRemove: () => { console.error('onRemove not defined'); }
}