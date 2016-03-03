import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';

import {CustomComp} from './CustomComp.js'

var Main = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {a: 'bbbbbbbbbbbbbb'};
    }

    componentDidMount() {
        setTimeout(function(){this.setState({a: 'ffffffffffffff'})}.bind(this), 5000);
    }

    render() {
        return (
            <div >
                {this.state.a}
                <CustomComp a={7} />
            </div>
        )
    }
}

injectTapEventPlugin();
ReactDOM.render( <Main /> , document.getElementById('app'))
