/* jshint esversion: 6*/

import React from "react"
import Relay from 'react-relay';

import AddUserMutation from "../mutations/addUser.js"
import UserCreateCard from './UserCreateCard.js';
import UserLoginCard from './UserLoginCard.js';

class LogInOrCreateUser extends React.Component {
    componentDidMount() {
        componentHandler.upgradeDom();
    }
    render() {
        return (
            <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
                {
                    this.props.is_logged ?
                        <div>
                            <div className="mdl-tabs__tab-bar">
                                <a href="#login-panel" className="mdl-tabs__tab is_active">שינוי משתמש</a>
                            </div>
                            <div className="mdl-tabs__panel is-active" id="login-panel">
                                <UserLoginCard is_logged={this.props.is_logged}></UserLoginCard>
                            </div>
                        </div>
                        :
                        <div>
                            <div className="mdl-tabs__tab-bar">
                                <a href="#new-user-panel" className="mdl-tabs__tab is-active">רישום</a>
                                <a href="#login-panel" className="mdl-tabs__tab">כניסה</a>
                            </div>
                            <div className="mdl-tabs__panel is-active" id="new-user-panel">
                                <UserCreateCard savedCallback={this.props.callback}></UserCreateCard>
                            </div>
                            <div className="mdl-tabs__panel" id="login-panel">
                                <UserLoginCard is_logged={this.props.is_logged}></UserLoginCard>
                            </div>
                        </div>
                }
            </div>
        );
    }
}

export default LogInOrCreateUser;
