/* jshint esversion: 6*/

import React from "react"
import Relay from 'react-relay';

import AddUserMutation from "../mutations/addUser.js"
import UserCreateCard from './UserCreateCard.js';
import UserLoginCard from './UserLoginCard.js';

class LogInOrCreateUser extends React.Component {
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
        return (
            <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
                <div className="mdl-tabs__tab-bar">
                    <a href="#new-user-panel" className="mdl-tabs__tab is-active">רישום</a>
                    <a href="#login-panel" className="mdl-tabs__tab">כניסה</a>
                </div>

                <div className="mdl-tabs__panel is-active" id="new-user-panel">
                    <UserCreateCard savedCallback={this.props.callback}></UserCreateCard>
                </div>
                <div className="mdl-tabs__panel" id="login-panel">
                    <UserLoginCard loginCallback={this.props.callback}></UserLoginCard>
                </div>
            </div>
        );
    }
}

export default LogInOrCreateUser;
