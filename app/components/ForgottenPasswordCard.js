/* jshint esversion: 6*/

import React from "react"
import Relay from 'react-relay';

// TODO: write the corresponding mutation!
//import LogInMutation from "../mutations/logIn.js"
import Comm from './comm.js'
import CommRound from './commRound.js'

class ForgottenPasswordCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mail: "",
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
    handleResetPassword(event) {
        if (this.state.mail=="") {
            this.setState({error: "אנא הזן מייל"});
            return
        }
        // TODO: implement!
        // this.setState({ communicating: true })
        // Relay.Store.commitUpdate(new LogInMutation({
        //     login_id: this.state.login_id,
        //     password: this.state.pass1,
        // }),
        //     {
        //         onFailure: (e) => {
        //             this.setState({
        //                 communicating: false,
        //                 error: "שם משתמש או סיסמה שגויים",
        //             })
        //         },
        //         onSuccess: () => {
        //             this.setState({ communicating: false })
        //             document.location.hash = "#/users"
        //         },
        //     });
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
                <h6>הזן מייל כדי לאפס סיסמה</h6>                    
                {
                    this.state.error != null ?
                        <h7 style={{color:"red"}}>{this.state.error}</h7> : null
                }
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input
                        className="mdl-textfield__input"
                        type="text"
                        onChange={this.handleMailChange.bind(this) }></input>
                    <label className="mdl-textfield__label">מייל</label>
                </div>
                
                <div className="mdl-card__actions" style={style_actions}>
                    {this.state.communicating ?
                        <CommRound style={{ margin: "10px"}}></CommRound>
                        :
                        <button
                            style={style_save_button}
                            className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                            onClick={this.handleResetPassword.bind(this) }
                            id="PasswordForgottenCard_Send_Button">
                            אפס סיסמה
                        </button>
                    }
                </div>
            </div>
        );
    }
}

export default ForgottenPasswordCard;

