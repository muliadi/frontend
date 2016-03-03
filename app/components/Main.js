import * as React from 'react'
import * as ReactDOM from 'react-dom'

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

ReactDOM.render( <Main /> , document.getElementById('app'))
