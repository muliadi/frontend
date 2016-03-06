/* jshint esversion: 6*/

import React from 'react';

import RaisedButton from 'material-ui/lib/raised-button';
import Checkbox from 'material-ui/lib/checkbox';

class CustomComp extends React.Component {
    render() {
        return (
            <div>
                <RaisedButton label="Default" secondary={true} onTouchTap={this.handleRequestClose}/>
                <Checkbox />
            </div>
        );
    }
}

export default CustomComp;
