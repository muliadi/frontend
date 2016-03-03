import React from 'react'

import RaisedButton from 'material-ui/lib/raised-button';
import Checkbox from 'material-ui/lib/checkbox';

export
const CustomComp = class extends React.Component {
    render() {
        return (
            <div>
                <RaisedButton label="Default" secondary={true} onTouchTap={this.handleRequestClose}/>
                <Checkbox />
            </div>
        );
    }
}
