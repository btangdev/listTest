import React, {Component} from 'react';
import {CardTitle} from 'material-ui/Card';

export default class ThumbTitle extends Component {
    render() {
        return (
            <div>
                <CardTitle title={this.props.caption} subtitle="Card subtitle" />
            </div>
        );
    }
}



