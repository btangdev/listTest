import React, {Component} from 'react';
import {CardText} from 'material-ui/Card';

var style = {
    width:'100%'
};

export default class ThumbContent extends Component {
    render() {
        return(
            <div>
                <CardText>
                    <img style={style} src={this.props.url} alt=""/>
                    <p>{this.props.children}</p>
                </CardText>
            </div>
        );
    }
}