import React, { Component } from 'react';

import {Card} from 'material-ui/Card';
import ThumbHeader from './ThumbHeader';
import ThumbTitle from './ThumbTitle';
import ThumbContent from './ThumbContent';

import * as firebase from 'firebase';

export default class Thumb extends Component { 
    constructor(props) {
        super(props);

        this.state = {
            photo: [], user: [], caption: [], description: []
        };

        this.database = firebase.database().ref().child('Posts/');
    }   

    componentWillMount() {
        const previousPhoto = this.state.photo;
        const previousCaption = this.state.caption;
        const previousUser = this.state.user;
        const previousDescription = this.state.description;

        this.database.on('child_added', snap => {
            previousCaption.push({
                photoContent: snap.val().url,
                captionContent: snap.val().caption,
                userContent: snap.val().user,
                descriptionContent: snap.val().description
            });

            this.setState({
                photo: previousPhoto,
                caption: previousCaption,
                user: previousUser,
                description: previousDescription
            });
        });
    }

    render() {
        return(
            <div>
                {
                    this.state.caption.map((contact, i) => {
                        return (
                            <Card key={i}>
                                <ThumbHeader user={contact.userContent}></ThumbHeader>
                                <ThumbTitle caption={contact.captionContent}></ThumbTitle>
                                <ThumbContent url={contact.photoContent}>{contact.descriptionContent}</ThumbContent>
                            </Card>
                        );
                    })
                }
            </div>
        );
    }
}