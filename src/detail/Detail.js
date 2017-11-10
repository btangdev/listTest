import React, { Component } from 'react';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

// import './css/Detail.css';

export default class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }

    render() {
        return(
            <div>
                <Drawer width={'100%'} openSecondary={true} open={this.state.open} >
                </Drawer>
            </div>
        );
    }
}