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
import SapakLanding from './SapakLanding.js'
import SetSapakimCookie from '../utils/cookies.js'
import OrderManagement from './OrderManagement.js'

const MainSub = class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mock: false
        }
        window.onhashchange = ()=>{this.setState({mock: !this.state.mock})}
        SetSapakimCookie(this.props.view.current_session)
    } 
    componentWillMount() {
        // check for updates every 10 seconds
        const checkForUpdates = ()=>{setTimeout(()=>{
            this.props.relay.setVariables({forceFetchCount: this.props.relay.variables.forceFetchCount+1})
            checkForUpdates();
        }, 10000)};
        checkForUpdates();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.view.has_updates) {
            this.props.relay.forceFetch()
        }        
    }
    getPageToRender() {   
        const args = document.location.hash.slice(1).split("/").filter((s)=>(s!=""));
        const argNum = args.length;
        const arg1 = argNum >= 1 ? args[0] : null;
        
        const getFilterArgs = (name) => (args.filter((p)=>(p.startsWith(name))).map((p)=>(p.slice(name.length))));
        const includeCategories = getFilterArgs("include_category_");
        const excludeCategories = getFilterArgs("exclude_category_");        
        const includeVendors = getFilterArgs("include_vendor_");
        const excludeVendors = getFilterArgs("exclude_vendor_");
        const includePackagings = getFilterArgs("include_packaging_");
        const excludePackagings = getFilterArgs("exclude_packaging_");
        const maxPrices = getFilterArgs("max_price_");
        const minPrices = getFilterArgs("min_price_");
        
        if (this.props.view.me.role_type=="Anonymous") {
            
            // user is not logged:
            switch (arg1) {
                case "terms_and_conditions":
                    return <TermsAndConditions view={this.props.view}></TermsAndConditions>            
                case "login":
                    return <LogInOrCreateUser role_type={this.props.view.me.role_type}></LogInOrCreateUser>                    
                case "sapakim":
                    return <SapakGrid view={this.props.view}></SapakGrid>
                case "items":
                    return <ItemGrid view={this.props.view}
                            includeCategories={includeCategories}
                            excludeCategories={excludeCategories}
                            includeVendors={includeVendors}
                            excludeVendors={excludeVendors}
                            includePackagings={includePackagings}
                            excludePackagings={excludePackagings}
                            maxPriceInAgorot={maxPrices}
                            minPriceInAgorot={minPrices}
                        >
                        </ItemGrid>
                case "mail_verification":
                    if (argNum!=2) {
                        return <div>404 Not Found</div>
                    }
                    return <MailVerification hash={arg2}></MailVerification>
                default:
                    return <LandingPage view={this.props.view}></LandingPage>            
            }
        }

        // user is logged
        
        if ((this.props.view.me.role_type=="Restaurant")||(this.props.view.me.role_type=="New")) {        
            if (argNum>0) {
                switch (arg1) {
                    case "orders":
                        return <OrderManagement view={this.props.view} forceFetch={this.props.view.has_updates}></OrderManagement>
                    case "terms_and_conditions":
                        return <TermsAndConditions view={this.props.view}></TermsAndConditions>            
                    case "admin":
                        return <AdminPage view={this.props.view}></AdminPage>
                    case "items":
                        return <ItemGrid
                            includePackagings={includeCategories}
                                view={this.props.view}
                                includeCategories={includeCategories}
                                excludeCategories={excludeCategories}
                                includeVendors={includeVendors}
                                excludeVendors={excludeVendors}
                                includePackagings={includePackagings}
                                excludePackagings={excludePackagings}
                                maxPriceInAgorot={maxPrices}
                                minPriceInAgorot={minPrices}
                                >
                            </ItemGrid>
                    case "users":
                        return <UserGrid view={this.props.view}></UserGrid>
                    case "sapakim":
                        return <SapakGrid view={this.props.view}></SapakGrid>
                    case "login":
                        return <LogInOrCreateUser role_type={this.props.view.me.role_type}></LogInOrCreateUser>
                    case "profile":
                        return <ProfilePage view={this.props.view}></ProfilePage>
                    case "mail_verification":
                        if (argNum!=2) {
                            return <div>404 Not Found</div>
                        }
                        return <MailVerification hash={arg2}></MailVerification>
                    default:
                        return <div>404 Not Found</div>
                }
            }
            else {
                return <ItemGrid view={this.props.view}></ItemGrid>            
            }
        }
        
        if (this.props.view.me.role_type=="Sapak") {     
            if (argNum>0) {
                switch (arg1) {
                    case "terms_and_conditions":
                        return <TermsAndConditions view={this.props.view}></TermsAndConditions>            
                    case "mail_verification":
                        if (argNum!=2) {
                            return <div>404 Not Found</div>
                        }
                        return <MailVerification hash={arg2}></MailVerification>
                    default:
                        return <div>404 Not Found</div>
                }
            }
            else {
                return <SapakLanding view={this.props.view} forceFetch={this.props.view.has_updates}></SapakLanding>            
            }
        }
                    
    }        
    fixFooter() {
        const c = document.getElementsByClassName("page-content")[0]
        const p = document.getElementsByClassName("footer-pusher")[0]
        const m = document.getElementsByClassName("mdl-layout__content")[0]
        const f = document.getElementsByClassName("mdl-mini-footer")[0]
        var p_height = m.clientHeight - f.clientHeight - c.clientHeight 
        if (p_height < 0) {
            p_height = 0
        }        
        p.style.height = p_height+"px";                    
    }    
    componentDidMount() {
        this.fixFooter();
        const e = document.getElementsByClassName("page-content")[0];
        addResizeListener(e, this.fixFooter);
        window.addEventListener("resize", this.fixFooter);        
    }
    componentDidUpdate() {
        this.fixFooter();
    }
    render() {   
        return (
            <MainFrame view={this.props.view} sidebar={this.state.sidebar}>
                {this.getPageToRender()}
            </MainFrame>
        );
    }
};

const Main = Relay.createContainer(MainSub, {
    initialVariables: {
        forceFetchCount: 0,
    },    
    fragments: {
        view: (variables) => Relay.QL`
            fragment on view {
                ${MainFrame.getFragment('view')},
                ${ItemGrid.getFragment('view')},
                ${UserGrid.getFragment('view')},
                ${SapakGrid.getFragment('view')},
                ${ProfilePage.getFragment('view')},
                ${SapakLanding.getFragment('view')},
                ${OrderManagement.getFragment('view')},
                has_updates(key: $forceFetchCount)
                me {
                    is_founder
                    role_type
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






