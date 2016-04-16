/* jshint esversion: 6*/

import React from "react"
import Relay from 'react-relay';

import AddUserMutation from "../mutations/addUser.js"

class UserCreateCard extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            base64data: null,
            full_name: "",
            login_id: "",
            mail: "",
            pass1: "",
            pass2: "",
        }
    }    
    handleFullNameChange(event) {
        this.setState({full_name: event.target.value});
    }
    handleMailChange(event) {
        this.setState({mail: event.target.value});
    }
    handleLoginIDChange(event) {
        this.setState({login_id: event.target.value});
    }
    handlePass1Change(event) {
        this.setState({pass1: event.target.value});
    }
    handlePass2Change(event) {
        this.setState({pass2: event.target.value});
    }
    handleFileChange(event) {
        this.__fileName = event.target.value;
        var file = event.target.files[0]
        if (file) {
            // create reader
            var reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = function(e) {
                // browser completed reading file - display it
                const data = e.target.result.split(",")[1];
                this.setState({base64data: data})
            }.bind(this);
        }
    }
    handleSaveItem(event) {
        this.props.savedCallback();
        Relay.Store.commitUpdate(new AddUserMutation({
            full_name: this.state.full_name,
            login_id: this.state.login_id,
            mail: this.state.mail,
            password: this.state.pass1,
            imageBase64Data: this.state.base64data,
        }));
    }
    componentDidMount() {
        // consider doing this in component did update too
        // This upgrades all upgradable components (i.e. with 'mdl-js-*' class)
        componentHandler.upgradeDom();

        // We could have done this manually for each component
        /*
        * var submitButton = this.refs.submit.getDOMNode();
        * componentHandler.upgradeElement(submitButton, "MaterialButton");
        * componentHandler.upgradeElement(submitButton, "MaterialRipple");
        */
    }    
    render() {
        const style_card = {
            width: "100%",
            maxWidth: "320px",
            marginTop: "10px",
            flexDirection: "column",
            marginLeft: "auto",        
            marginRight: "auto",
            paddingRight:"10px",
            paddingLeft:"10px",
            backgroundColor:"rgba(0,0,0,0.0)",
        };
        const style_small_image = {
            width : "100%",
            height: "100px",
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
        };
        const style_save_button = {
            marginBottom: "0px",
        }
        const style_add_image = {
            marginRight: "15px",
            marginLeft: "15px",
        }
        const style_actions = {
            display: "flex",
            flexDirection: "row-reverse",
        }
        if (this.state.base64data != null) {
            style_small_image.background = "url('data:image;base64,"+this.state.base64data+"') center / cover";
            style_small_image.height = "300px";
            style_small_image.alignItems = "flex-end";
            style_add_image.background = "rgba(200,200,200,1.0)"          
        }
        else {
            style_small_image.background = "rgba(0,0,0,0.1)";             
        }
        return (
            <div className="mdl-card" style={style_card}>
                <p>הרשם כמשתמש חדש במערכת</p>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input
                        className="mdl-textfield__input"
                        type="text"
                        id="user_create_card_1"
                        onChange={this.handleFullNameChange.bind(this)}></input>
                    <label className="mdl-textfield__label" htmlFor="item_create_card_1">שם מלא</label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input
                        className="mdl-textfield__input"
                        type="text"
                        id="user_create_card_2"
                        onChange={this.handleLoginIDChange.bind(this)}></input>
                    <label className="mdl-textfield__label" htmlFor="user_create_card_2">שם משתמש</label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input
                        className="mdl-textfield__input"
                        type="mail"
                        id="user_create_card_3"
                        onChange={this.handleMailChange.bind(this)}></input>
                    <label className="mdl-textfield__label" htmlFor="user_create_card_3">מייל</label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input
                        className="mdl-textfield__input"
                        type="password"
                        id="user_create_card_4"
                        onChange={this.handlePass1Change.bind(this)}></input>
                    <label className="mdl-textfield__label" htmlFor="user_create_card_4">סיסמה</label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input
                        className="mdl-textfield__input"
                        type="password"
                        id="user_create_card_4"
                        onChange={this.handlePass2Change.bind(this)}></input>
                    <label className="mdl-textfield__label" htmlFor="user_create_card_4">שוב אותה סיסמה</label>
                </div>
                
                <input id="fileinput2" type="file" style={{display:"None"}} onChange={this.handleFileChange.bind(this)}></input>
                                
                <div style={style_small_image}>
                    {this.state.base64data == null ? <div>
                        <button
                            className="mdl-button mdl-js-button mdl-button--fab"
                            style={style_add_image}
                            onClick={()=>(document.getElementById('fileinput2').click())}>                        
                            <i className="material-icons">add</i>
                        </button>
                        הוסף תמונה                        
                    </div> : null}
                </div>
                
                <div className="mdl-card__actions" style={style_actions}>
                    <button
                        style={style_save_button}
                        className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                        onClick={this.handleSaveItem.bind(this)}
                        id="UserCreateCard_Save_Button">
                        הרשם
                    </button>
                    
                    {this.state.base64data != null ? 
                        <button
                            style={style_save_button}
                            className="mdl-button mdl-js-button mdl-js-ripple-effect"
                            onClick={()=>(document.getElementById('fileinput1').click())}>                        
                            שנה תמונה
                        </button> : null}                         
                </div>                
            </div> 
        );
    }
}

export default UserCreateCard;

