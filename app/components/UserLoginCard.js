/* jshint esversion: 6*/

import React from "react"
import Relay from 'react-relay';

import LogInMutation from "../mutations/logIn.js"
import CommRound from './commRound.js' 

class UserLoginCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mail: "",
            pass1: "",
            communicating: false,
            error: null,
        }
    }
    handleMailChange(event) {
        this.setState({
            mail: event.target.value,
            error: null,
        });
    }
    handlePass1Change(event) {
        this.setState({
            pass1: event.target.value,
            error: null,
        });
    }
    handleLogin(event) {
        if (this.state.mail=="") {
            this.setState({error: "אנא הכנס מייל"});
            return
        }
        if (this.state.pass1=="") {
            this.setState({error: "אנא הכנס סיסמה"});
            return
        }
        this.setState({ communicating: true })
        Relay.Store.commitUpdate(new LogInMutation({
            mail: this.state.mail,
            password: this.state.pass1,
        }),
            {
                onFailure: (e) => {
                    this.setState({
                        communicating: false,
                        error: "שם משתמש או סיסמה שגויים",
                    })
                },
                onSuccess: () => {
                    this.setState({ communicating: false })
                    document.location="/#";
                },
            });
    }
    componentDidMount() {
        componentHandler.upgradeDom();
    }
    render() {
        const style_card = {
            width: "100%",
            maxWidth: "500px",
            marginLeft: "auto",
            marginRight: "auto",
            alignItems:"center",
        };
        const style_save_button = {
            margin: "10px",
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
                {
                    this.props.role_type != "Anonymous" ?
                        <h6>כנס עם משתמש אחר</h6>                    
                      :
                        <h6>כנס עם משתמש קיים</h6>
                }
                {
                    this.state.error != null ?
                        <h7 style={{color:"red"}}>{this.state.error}</h7> : null
                }
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input
                        className="mdl-textfield__input"
                        type="text"
                        id="user_login_card_1"
                        onKeyUp={(e)=>{if (e.keyCode==13) {this.handleLogin.bind(this)()}} }                        
                        onChange={this.handleMailChange.bind(this) }></input>
                    <label className="mdl-textfield__label" htmlFor="item_login_card_1">מייל</label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input
                        className="mdl-textfield__input"
                        type="password"
                        id="user_create_card_4"
                        onKeyUp={(e)=>{if (e.keyCode==13) {this.handleLogin.bind(this)()}} }                        
                        onChange={this.handlePass1Change.bind(this) }></input>
                    <label className="mdl-textfield__label" htmlFor="user_create_card_4">סיסמה</label>
                </div>

                <div className="mdl-card__actions" style={style_actions}>
                    {this.state.communicating ?
                        <CommRound style={{ margin: "10px"}}></CommRound>
                        :
                        <button
                            style={style_save_button}
                            className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                            onClick={this.handleLogin.bind(this) }
                            id="UserLoginCard_Login_Button">
                            כנס
                        </button>
                    }
                </div>
            </div>
        );
    }
}

export default UserLoginCard;

