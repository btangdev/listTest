import React, {Component} from 'react';
import {CardHeader} from 'material-ui/Card';

export default class ThumbHeader extends Component {
    render() {
        return (
            <div>
            <CardHeader title="URL Avatar" subtitle={this.props.user} avatar="images/jsa-128.jpg" />
            </div>
        );
    }
}