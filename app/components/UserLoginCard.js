/* jshint esversion: 6*/

import React from "react"
import Relay from 'react-relay';

import AddUserMutation from "../mutations/addUser.js"

class UserLoginCard extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            login_id: "",
            pass1: "",
        }
    }    
    handleLoginIDChange(event) {
        this.setState({login_id: event.target.value});
    }
    handlePass1Change(event) {
        this.setState({pass1: event.target.value});
    }
    handleLogin(event) {
        console.log("logging in now!")
        this.props.loginCallback();
        // TODO: implement!
        // Relay.Store.commitUpdate(new AddUserMutation({
        //     full_name: this.state.full_name,
        //     login_id: this.state.login_id,
        //     mail: this.state.mail,
        //     password: this.state.pass1,
        //     imageBase64Data: this.state.base64data,
        // }));
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
        const style_save_button = {
            marginBottom: "0px",
        }        
        const style_login_button = {
            marginBottom: "0px",
        }
        const style_actions = {
            display: "flex",
            flexDirection: "row-reverse",
        }
        return (
            <div className="mdl-card" style={style_card}>
                <p>כנס עם משתמש קיים</p>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input
                        className="mdl-textfield__input"
                        type="text"
                        id="user_login_card_1"
                        onChange={this.handleLoginIDChange.bind(this)}></input>
                    <label className="mdl-textfield__label" htmlFor="item_login_card_1">שם משתמש</label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input
                        className="mdl-textfield__input"
                        type="password"
                        id="user_create_card_4"
                        onChange={this.handlePass1Change.bind(this)}></input>
                    <label className="mdl-textfield__label" htmlFor="user_create_card_4">סיסמה</label>
                </div>
                
                <div className="mdl-card__actions" style={style_actions}>
                    <button
                        style={style_save_button}
                        className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                        onClick={this.handleLogin.bind(this)}
                        id="UserLoginCard_Login_Button">
                        כנס
                    </button>                    
                </div>                
            </div> 
        );
    }
}

export default UserLoginCard;

