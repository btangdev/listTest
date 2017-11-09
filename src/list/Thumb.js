import React, { Component } from 'react';

import * as firebase from 'firebase';
import { Card } from 'material-ui/Card';
import ThumbHeader from './ThumbHeader';
import ThumbTitle from './ThumbTitle';
import ThumbContent from './ThumbContent';

export default class Thumb extends Component { 
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
        
        this.database = firebase.database().ref().child('Posts/');        
    }   

    componentDidMount() {
        const dataList = [];

        this.database.on('value', (snapshot) => {
            snapshot.forEach(function(childSnapshot){
                dataList.push({ 
                    item: childSnapshot.val()
                });
            }.bind(this));

            this.setState({
                data: dataList
            });
        })
    }

    render() {
        return(            
            <div>
                {
                    this.state.data.map((db,i) => {
                        console.log(db.item.user);
                        return(
                            <Card key={i}>
                                <ThumbHeader user={db.item.user}></ThumbHeader>
                                <ThumbTitle caption={db.item.caption}></ThumbTitle>
                                <ThumbContent photo={db.item.url}>{db.item.description}</ThumbContent>
                            </Card>
                        )
                    })
                }
            </div>
        );
    }
}