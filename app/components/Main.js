/* jshint esversion: 6 */

import React from 'react';
import Relay from 'react-relay';

import MainFrame from './MainFrame.js';
import ItemGrid from './ItemGrid.js';
import LandingPage from './LandingPage.js';
import TermsAndConditions from './TermsAndConditions.js';
import UserGrid from './UserGrid.js';
import SapakGrid from './SapakGrid.js';
import MailVerification from './MailVerification.js';
import LogInOrCreateUser from './LogInOrCreateUser.js'
import ProfilePage from './ProfilePage.js'
import AdminPage from './AdminPage.js'

// TODO: move two functions below to own module...
function writeCookie (key, value, days) {
    var date = new Date();
    // Default at 365 days.
    days = days || 365;
    // Get unix milliseconds at current time plus number of days
    date.setTime(+ date + (days * 86400000)); //24 * 60 * 60 * 1000
    document.cookie = key + "=" + value + "; expires=" + date.toGMTString()+"; path=/";
};
function setSapakimCookie(val) {
  writeCookie("SAPAKIM", val, 101)
}


const MainSub = class extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            pageToRender: null,
        }
        window.onhashchange = this.getPageToRender.bind(this);        
    }    
    getPageToRender() {
        const args = document.location.hash.slice(1).split("/").filter((s)=>(s!=""));
        const argNum = args.length;
        const arg1 = argNum >= 1 ? args[0] : null;
        const arg2 = argNum >= 2 ? args[1] : null;        

        if (!this.props.view.me.is_logged) {
            
            switch (arg1) {
                case "terms_and_conditions":
                    this.setState({pageToRender: <TermsAndConditions view={this.props.view}></TermsAndConditions> });            
                    break;
                case "login":
                    this.setState({pageToRender: <LogInOrCreateUser is_logged={this.props.view.me.is_logged}></LogInOrCreateUser> });
                    break;                        
                case "mail_verification":
                    if (argNum!=2) {
                        this.setState({pageToRender: <div>404 Not Found</div> });
                        break;
                    }
                    this.setState({pageToRender: <MailVerification hash={arg2}></MailVerification> });
                    break;                        
                default:
                    this.setState({pageToRender: <LandingPage view={this.props.view}></LandingPage> });            
                    break;
            }
            return;
        }

        // User is logged in:
        
        if (argNum>0) {
            switch (arg1) {
                case "terms_and_conditions":
                    this.setState({pageToRender: <TermsAndConditions view={this.props.view}></TermsAndConditions> });            
                    break;
                case "admin":
                    this.setState({pageToRender: <AdminPage view={this.props.view}></AdminPage> });
                    break;
                case "items":
                    this.setState({pageToRender: <ItemGrid view={this.props.view}></ItemGrid> });
                    break;
                case "users":
                    this.setState({pageToRender: <UserGrid view={this.props.view}></UserGrid> });
                    break;
                case "sapakim":
                    this.setState({pageToRender: <SapakGrid view={this.props.view}></SapakGrid> });
                    break;                        
                case "login":
                    this.setState({pageToRender: <LogInOrCreateUser is_logged={this.props.view.me.is_logged}></LogInOrCreateUser> });
                    break;                        
                case "profile":
                    this.setState({pageToRender: <ProfilePage view={this.props.view}></ProfilePage> });
                    break;                        
                case "mail_verification":
                    if (argNum!=2) {
                        this.setState({pageToRender: <div>404 Not Found</div> });
                        break;
                    }
                    this.setState({pageToRender: <MailVerification hash={arg2}></MailVerification> });
                    break;                        
                default:
                    this.setState({pageToRender: <div>404 Not Found</div> });
                    break;
            }
        }
        else {
            this.setState({pageToRender: <ItemGrid view={this.props.view}></ItemGrid> });            
        }            
    }        
    componentWillMount() {
        setSapakimCookie(this.props.view.current_session)
        this.getPageToRender();        
    }
    render() {        
        return (
            <MainFrame view={this.props.view}>
                {this.state.pageToRender}
            </MainFrame>
        );
    }
};

const Main = Relay.createContainer(MainSub, {
    fragments: {
        view: () => Relay.QL`
            fragment on view {
                ${MainFrame.getFragment('view')},
                ${ItemGrid.getFragment('view')},
                ${UserGrid.getFragment('view')},
                ${SapakGrid.getFragment('view')},
                ${ProfilePage.getFragment('view')},
                me {
                    is_logged
                    is_founder
                    small_image {
                        id
                    }
                }
                current_session
            }
        `,
    },
});

export default Main






