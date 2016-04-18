/* jshint esversion: 6*/

import React from "react"
import Relay from 'react-relay';

class Comm extends React.Component {
    componentDidMount() {
        componentHandler.upgradeDom();
    }
    render() {
        return (
            <div id="p2" className="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
        );
    }
}

export default Comm;
