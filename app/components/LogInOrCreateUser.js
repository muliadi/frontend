/* jshint esversion: 6*/

import React from "react"
import Relay from 'react-relay';

import AddUserMutation from "../mutations/addUser.js"
import UserCreateCard from './UserCreateCard.js';
import UserLoginCard from './UserLoginCard.js';
import ForgottenPasswordCard from './ForgottenPasswordCard.js';

class LogInOrCreateUser extends React.Component {
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
        return (
            <div className="mdl-card mdl-shadow--8dp" style={style_card}>
                <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
                    {
                        this.props.is_logged ?
                            <div>
                                <div className="mdl-tabs__tab-bar">
                                    <a href="#login-panel" className="mdl-tabs__tab is_active">שינוי משתמש</a>
                                </div>
                                <div className="mdl-tabs__panel is-active" id="login-panel">
                                    <UserLoginCard is_logged={true}></UserLoginCard>
                                </div>
                            </div>
                            :
                            <div>
                                <div className="mdl-tabs__tab-bar">
                                    <a href="#new-user-panel" className="mdl-tabs__tab is-active">רישום</a>
                                    <a href="#login-panel" className="mdl-tabs__tab">כניסה</a>
                                    <a href="#forgotten-password-panel" className="mdl-tabs__tab">שכחתי סיסמה</a>
                                </div>
                                <div className="mdl-tabs__panel is-active" id="new-user-panel">
                                    <UserCreateCard></UserCreateCard>
                                </div>
                                <div className="mdl-tabs__panel" id="login-panel">
                                    <UserLoginCard is_logged={false}></UserLoginCard>
                                </div>
                                <div className="mdl-tabs__panel" id="forgotten-password-panel">
                                    <ForgottenPasswordCard></ForgottenPasswordCard>
                                </div>
                            </div>
                    }
                </div>
            </div>
        );
    }
}

export default LogInOrCreateUser;
