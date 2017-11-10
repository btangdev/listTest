import React, { Component } from 'react';

import * as firebase from 'firebase';
import { Card } from 'material-ui/Card';
import ThumbHeader from './ThumbHeader';
import ThumbTitle from './ThumbTitle';
import ThumbContent from './ThumbContent';

import './css/Thumb.css';

export default class Thumb extends Component { 
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
        
        this.database = firebase.database().ref().child('Posts/');    
        
        this.onClickDetailView = this.onClickDetailView.bind(this);
    }   

    componentDidMount() {
        const dataList = [];

        this.database.on('child_added', (snapshot) => {
            dataList.push({
                item: snapshot.val()
            });

            this.setState({
                data: dataList
            });
        })
    }

    onClickDetailView() {
        
    }

    render() {
        return(            
            <div className='cardContainer'>
                {
                    this.state.data.map((db,i) => {
                        console.log(db.item);
                        return(                            
                            <Card key={i} className='cardStyle' onClick={this.onClickDetailView}>
                                <ThumbHeader user={db.item.user} userEmail={db.item.userEmail} photoURL={db.item.userPhoto}></ThumbHeader>
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