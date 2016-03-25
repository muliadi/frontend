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
        this.state = {a: 'bbbbbbbbbbbbbb', imgdata: 'R0lGODlhUAAPAKIAAAsLav///88PD9WqsYmApmZmZtZfYmdakyH5BAQUAP8ALAAAAABQAA8AAAPbWLrc/jDKSVe4OOvNu/9gqARDSRBHegyGMahqO4R0bQcjIQ8E4BMCQc930JluyGRmdAAcdiigMLVrApTYWy5FKM1IQe+Mp+L4rphz+qIOBAUYeCY4p2tGrJZeH9y79mZsawFoaIRxF3JyiYxuHiMGb5KTkpFvZj4ZbYeCiXaOiKBwnxh4fnt9e3ktgZyHhrChinONs3cFAShFF2JhvCZlG5uchYNun5eedRxMAF15XEFRXgZWWdciuM8GCmdSQ84lLQfY5R14wDB5Lyon4ubwS7jx9NcV9/j5+g4JADs='};
    }

    componentDidMount() {

        fetchql('{current_session}')
        .then(r => {
                this.setState({a: r.data.current_session});
            });
        fetchql(`
        {
            user(id: "BY99ipEqrIAklhYOXlmZl8kjWaz3zs8Mw/4oR2newpw=") {
                small_image {
                    base64data
                }
            }
        }`)
        .then(r => {
                this.setState({imgdata: r.data.user.small_image.base64data});
            });
        //setTimeout(function(){this.setState({a: 'ffffffffffffff'});}.bind(this), 5000);
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <div className="sec2">
                        <div className="row">
                            <img src={"data:image;base64,"+this.state.imgdata} style={{width: "300px", height:"auto", margin:"20px"}}/>
                            <img src={"data:image;base64,"+this.state.imgdata} style={{width: "300px", height:"auto", margin:"20px"}}/>
                            <img src={"data:image;base64,"+this.state.imgdata} style={{width: "300px", height:"auto", margin:"20px"}}/>
                            <img src={"data:image;base64,"+this.state.imgdata} style={{width: "300px", height:"auto", margin:"20px"}}/>
                            <img src={"data:image;base64,"+this.state.imgdata} style={{width: "300px", height:"auto", margin:"20px"}}/>
                            <img src={"data:image;base64,"+this.state.imgdata} style={{width: "300px", height:"auto", margin:"20px"}}/>
                            <img src={"data:image;base64,"+this.state.imgdata} style={{width: "300px", height:"auto", margin:"20px"}}/>
                            <img src={"data:image;base64,"+this.state.imgdata} style={{width: "300px", height:"auto", margin:"20px"}}/>
                            <img src={"data:image;base64,"+this.state.imgdata} style={{width: "300px", height:"auto", margin:"20px"}}/>
                            <img src={"data:image;base64,"+this.state.imgdata} style={{width: "300px", height:"auto", margin:"20px"}}/>
                            <img src={"data:image;base64,"+this.state.imgdata} style={{width: "300px", height:"auto", margin:"20px"}}/>
                            <img src={"data:image;base64,"+this.state.imgdata} style={{width: "300px", height:"auto", margin:"20px"}}/>
                            <img src={"data:image;base64,"+this.state.imgdata} style={{width: "300px", height:"auto", margin:"20px"}}/>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
};

document.title = lang.document_title;
injectTapEventPlugin();
ReactDOM.render( <Main /> , document.getElementById('app'));
