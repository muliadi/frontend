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

const MainSub = class extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            pageToRender: null,
        }
        window.onhashchange = this.getPageToRender.bind(this);
        SetSapakimCookie(this.props.view.current_session)
    } 
    componentWillMount() {
        this.getPageToRender();                
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
                    this.setState({pageToRender: <TermsAndConditions view={this.props.view}></TermsAndConditions> });            
                    return;
                case "login":
                    this.setState({pageToRender: <LogInOrCreateUser role_type={this.props.view.me.role_type}></LogInOrCreateUser> });
                    return;  
                    
                case "sapakim":
                    this.setState({pageToRender: <SapakGrid view={this.props.view}></SapakGrid>})
                    return;      
                case "items":
                    this.setState({pageToRender:
                        <ItemGrid view={this.props.view}
                            includeCategories={includeCategories}
                            excludeCategories={excludeCategories}
                            includeVendors={includeVendors}
                            excludeVendors={excludeVendors}
                            includePackagings={includePackagings}
                            excludePackagings={excludePackagings}
                            maxPriceInAgorot={maxPrices}
                            minPriceInAgorot={minPrices}
                        >
                        </ItemGrid>})
                    return;                      
                case "mail_verification":
                    if (argNum!=2) {
                        this.setState({pageToRender: <div>404 Not Found</div> });
                        break;
                    }
                    this.setState({pageToRender: <MailVerification hash={arg2}></MailVerification> });
                    return;                        
                default:
                    this.setState({pageToRender: <LandingPage view={this.props.view}></LandingPage> });            
                    return;
            }
        }

        // user is logged
        
        if ((this.props.view.me.role_type=="Restaurant")||(this.props.view.me.role_type=="New")) {        
            if (argNum>0) {
                switch (arg1) {
                    case "terms_and_conditions":
                        this.setState({pageToRender: <TermsAndConditions view={this.props.view}></TermsAndConditions>});            
                        break;
                    case "admin":
                        this.setState({pageToRender: <AdminPage view={this.props.view}></AdminPage>});
                        break;
                    case "items":
                        this.setState({pageToRender:<ItemGrid
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
                            </ItemGrid>});
                        break;
                    case "users":
                        this.setState({pageToRender: <UserGrid view={this.props.view}></UserGrid>});
                        break;
                    case "sapakim":
                        this.setState({pageToRender: <SapakGrid view={this.props.view}></SapakGrid>});
                        break;                        
                    case "login":
                        this.setState({pageToRender: <LogInOrCreateUser role_type={this.props.view.me.role_type}></LogInOrCreateUser> });
                        break;                        
                    case "profile":
                        this.setState({pageToRender: <ProfilePage view={this.props.view}></ProfilePage>});
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
        
        if (this.props.view.me.role_type=="Sapak") {     
            console.log("is sapak!")  
            console.log(argNum) 
            console.log(arg1) 
            if (argNum>0) {
                switch (arg1) {
                    case "terms_and_conditions":
                        this.setState({pageToRender: <TermsAndConditions view={this.props.view}></TermsAndConditions>});            
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
                this.setState({pageToRender: <SapakLanding view={this.props.view}></SapakLanding> });            
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
                {this.state.pageToRender}
            </MainFrame>
        );
    }
};

const Main = Relay.createContainer(MainSub, {
    fragments: {
        view: (variables) => Relay.QL`
            fragment on view {
                ${MainFrame.getFragment('view')},
                ${ItemGrid.getFragment('view')},
                ${UserGrid.getFragment('view')},
                ${SapakGrid.getFragment('view')},
                ${ProfilePage.getFragment('view')},
                ${SapakLanding.getFragment('view')},
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






