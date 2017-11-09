import React, { Component } from 'react';

import {Card} from 'material-ui/Card';
import ThumbHeader from './ThumbHeader';
import ThumbTitle from './ThumbTitle';
import ThumbContent from './ThumbContent';

import * as firebase from 'firebase';

// import './Thumb.css';

export default class Thumb extends Component { 
    constructor(props) {
        super(props);

        this.state = {
            photo: [], user: [], caption: [], description: [],
            isFileType: '', datas: []
        };

        this.database = firebase.database().ref().child('Posts/');
    }   

    componentWillMount() {
        const previousPhoto = this.state.photo;
        const previousCaption = this.state.caption;
        // const previousUser = this.state.user;
        const previousDescription = this.state.description;      
        const dataList = this.state.datas;
        
        this.database.on('value', (snapshot) => {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                
                var postData = {
                    url: childData.url,
                    caption: childData.caption,
                    user: childData.user,
                    description: childData.description
                }

                this.setState({
					// url: postData.url,
					// caption: postData.caption,
					// user: postData.user,
                    // description: postData.description
                    datas: postData
				});
			}.bind(this));                 
            // console.log('*' + this.state.datas);
            // dataList.push(snap.val());
            dataList.push({
                photoContent: snapshot.val().url,
                captionContent: snapshot.val().caption,
                userContent: snapshot.val().user,
                descriptionContent: snapshot.val().description
            });


            this.setState({
                datas: dataList
                // photo: previousPhoto,
                // caption: previousCaption,
                // user: snap.val().user,
                // description: previousDescription
            });
        });
        // console.log('@componentWillMount: ' + this.state.user)
        
    }

    render() {
        // let fileType = this.state.fileType;

        // if (fileType === 'mp4') {

        // }
        // console.log('@render: ' + this.state.user)
        return(
            <div>
                
                {
                    // console.log('@render, return: ' + Array(this.state.datas).description)
                    Array(this.state.datas).map((db, i) => {
                        console.log(db)
                        return(
                            <Card key={i} >
                                <ThumbHeader user={db.user}></ThumbHeader>
                                <ThumbTitle caption={db.caption}></ThumbTitle>
                                <ThumbContent url={db.photo}>{db.description}</ThumbContent>
                            </Card>
                        );
                    })
                    // this.state.caption.map((contact, i) => {
                    //     return (
                    //         <Card key={i} >
                    //             <ThumbHeader user={contact.userContent}></ThumbHeader>
                    //             <ThumbTitle caption={contact.captionContent}></ThumbTitle>
                    //             <ThumbContent url={contact.photoContent} filetype={contact.fileTypeContent}>{contact.descriptionContent}</ThumbContent>
                    //         </Card>
                    //     );
                    // })
                }
            </div>
        );
    }
}