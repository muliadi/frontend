// /* jshint esversion: 6*/

import React from 'react';

class ItemCreateCard extends React.Component {
    componentDidMount() {
        this.setState({
            name: "",
            short_desc: "",
        });
    }
    render() {
        var handleName = function (event) {
            this.setState({name: event.target.value});
            console.log(this.state.name)
        }.bind(this);
        
        var handleShortDesc = function (event) {
            this.setState({short_desc: event.target.value});
            console.log(this.state.short_desc)
        }.bind(this);
        
        var style_card = {
            width: "100%;",
            maxWidth: "320px;",
            height: "320px;",
            background: "url('data:image;base64,"+this.props.image+"') center / cover",        
            flexDirection: "column-reverse;",
            marginLeft: "auto;",        
            marginRight: "auto;",
            paddingRight:"10px;",
        };
        var style_text_rtl = {
            textAlign: "right;",
        }
        return (
            <div style={style_card}>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input
                        className="mdl-textfield__input"
                        type="text"
                        id="sample3"
                        style={style_text_rtl}
                        onChange={handleName}></input>
                    <label className="mdl-textfield__label" for="sample3" style={style_text_rtl}>שם המוצר</label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input
                        className="mdl-textfield__input"
                        type="text"
                        id="sample4"
                        style={style_text_rtl}
                        onChange={handleShortDesc}></input>
                    <label className="mdl-textfield__label" for="sample4" style={style_text_rtl}>תאור קצר</label>
                </div>
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                    הוסף תמונה
                </button>
                <button className="mdl-button mdl-js-button mdl-js-ripple-effect">
                    הוסף תמונה
                </button>                                
            </div>
            
            
        );
    }
}

export default ItemCreateCard;

