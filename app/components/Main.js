/* jshint esversion: 6 */

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';

import CustomComp from './CustomComp.js';
import MainAppBar from './MainAppBar.js';
import {lang} from '../lang/heb.js';

const muiTheme = getMuiTheme({isRtl:true});

const action = [
{
ActionType : "CreateSession",
Action : 6
},
{
ActionType : "CreateUser",
Action : {
    requested_login_id : "skkjhrfel98675675",
    login_pssw_hash    : "45897gf8",
    full_name          : "Ariel Keselman",
    address            : "Tivon",
    phone_number       : null,
    mail               : "skariel@gmail.com",
    image_base64       : null
}
}];

const Main = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {a: 'bbbbbbbbbbbbbb'};
    }

    componentDidMount() {

        fetch('http://0.0.0.0:8080',
        {
            method : "POST",
            body   : JSON.stringify(action)
        })
        .then(r => r.json())
        .then(r => {
                this.setState({a: JSON.stringify(r)});
            });
        //setTimeout(function(){this.setState({a: 'ffffffffffffff'});}.bind(this), 5000);
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
};

document.title = lang.document_title;
injectTapEventPlugin();
ReactDOM.render( <Main /> , document.getElementById('app'));
