/* jshint esversion: 6*/

import React from "react"
import Relay from 'react-relay';

class CommRound extends React.Component {
    componentDidMount() {
        componentHandler.upgradeDom();
    }
    render() {
        return (
            <div dir="ltr" style={this.props.style} className="mdl-spinner mdl-js-spinner is-active"></div>
        );
    }
}

export default CommRound;
