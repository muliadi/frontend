import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'

import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';

import {CustomComp} from './CustomComp.js'
import {MainAppBar} from './MainAppBar.js'

const muiTheme = getMuiTheme({isRtl:true})

const Main = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {a: 'bbbbbbbbbbbbbb'};
    }

    componentDidMount() {
        setTimeout(function(){this.setState({a: 'ffffffffffffff'})}.bind(this), 5000);
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <MainAppBar />
                    {this.state.a}
                    <CustomComp a={7} />
                </div>
            </MuiThemeProvider>
        );
    }
}

injectTapEventPlugin();
ReactDOM.render( <Main /> , document.getElementById('app'))
