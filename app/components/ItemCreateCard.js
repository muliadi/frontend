/* jshint esversion: 6*/

import React from "react"

class ItemCreateCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_uploading: false,
            empty_image: true,
        };
        this.__name = "";
        this.__shortDesc = "";
        this.__fileName = "";
    }    

    handleNameChange(event) {
        this.__name = event.target.value;
        console.log(this.__name);
    }
    handleShortDescChange(event) {
        this.__shortDesc = event.target.value;
        console.log(this.__shortDesc);
    }
    handleFileChange(event) {
        this.__fileName = event.target.value;
        console.log(this.__fileName);
    }
    render() {
        const style_card = {
            width: "100%;",
            maxWidth: "320px;",
            marginTop: "50px;",
            flexDirection: "column;",
            marginLeft: "auto;",        
            marginRight: "auto;",
            paddingRight:"10px;",
            paddingLeft:"10px;",
        };
        const style_small_image = {
            width : "100%",
            height: "100px",
            display: "flex;",
            alignItems: "center;",
            marginBottom: "20px;",
            background: "rgba(0,0,0,0.1);",
        };
        const style_save_button = {
            marginBottom: "0px;",
        }
        const style_add_image = {
            marginRight: "15px;",
            marginLeft: "15px;",
        }
        const style_actions = {
            display: "flex;",
            flexDirection: "row-reverse;",
        }
        
        return (
            <div className="mdl-card mdl-shadow--4dp" style={style_card}>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input
                        className="mdl-textfield__input"
                        type="text"
                        id="sample3"
                        onChange={this.handleNameChange.bind(this)}></input>
                    <label className="mdl-textfield__label" for="sample3">שם המוצר</label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input
                        className="mdl-textfield__input"
                        type="text"
                        id="sample4"
                        onChange={this.handleShortDescChange.bind(this)}></input>
                    <label className="mdl-textfield__label" for="sample4">תאור קצר</label>
                </div>
                
                <input id="fileinput1" type="file" style={{display:"None"}} onChange={this.handleFileChange.bind(this)}></input>
                                
                <div style={style_small_image}>
                    <button
                        className="mdl-button mdl-js-button mdl-button--fab"
                        style={style_add_image}
                        onClick={()=>(document.getElementById('fileinput1').click())}>
                        <i className="material-icons">add</i>
                    </button>
                    הוסף תמונה
                </div>
                
                <div className="mdl-card__actions mdl-card--border" style={style_actions}>
                    <button style={style_save_button}
                        className="mdl-button mdl-js-button mdl-js-ripple-effect"
                        onClick={this.props.clicked}>
                        שמור
                    </button>
                </div>                
            </div> 
        );
    }
}

// TODO: add propTypes

export default ItemCreateCard;

