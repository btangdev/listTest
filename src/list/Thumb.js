import React, { Component } from 'react';

import {Card} from 'material-ui/Card';
import ThumbHeader from './ThumbHeader';
import ThumbTitle from './ThumbTitle';
import ThumbContent from './ThumbContent';

export default class Thumb extends Component {
    render() {
        return(
            <div>
                <Card >
                    <ThumbHeader user={this.props.user}></ThumbHeader>
                    <ThumbTitle caption={this.props.caption}></ThumbTitle>
                    <ThumbContent url={this.props.url}>{this.props.description}</ThumbContent>
                </Card>
            </div>
        );
    }
}