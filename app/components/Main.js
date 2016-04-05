/* jshint esversion: 6 */

import React from 'react';
import ReactDOM from 'react-dom';

import CustomComp from './CustomComp.js';
import {lang} from '../lang/heb.js';

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
            user(id: "aqSqhI0jm55f7ibhPUTyeBL+rPTTDJj3ckuCJUM1OaA=") {
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
                        {this.state.imgdata}
                        <CustomComp></CustomComp>
                    </div>
                </div>
            </div>
        );
    }
};

document.title = lang.document_title;
ReactDOM.render( <Main /> , document.getElementById('app'));
