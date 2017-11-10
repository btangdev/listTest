import React, {Component} from 'react';
import {CardHeader} from 'material-ui/Card';

export default class ThumbHeader extends Component {
    render() {
        // console.log(this.props.photoURL);
        return (
            <div>
                <CardHeader title={this.props.userEmail} subtitle={this.props.user} avatar={this.props.photoURL} />
            </div>
        );
    }
}

ThumbHeader.defaultProps = {

}