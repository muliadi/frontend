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
            mock: false,
            selectedItem: null,
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
                    return {page: <TermsAndConditions view={this.props.view}></TermsAndConditions>, type:"termsAndConditions"}            
                case "login":
                    return {page: <LogInOrCreateUser role_type={this.props.view.me.role_type}></LogInOrCreateUser>, type:"logInOrCreateUser"}
                case "sapakim":
                    return {page: <SapakGrid view={this.props.view}></SapakGrid>, type: "sapakGrid"}
                case "items":
                    return {page: <ItemGrid view={this.props.view}
                            includeCategories={includeCategories}
                            excludeCategories={excludeCategories}
                            includeVendors={includeVendors}
                            excludeVendors={excludeVendors}
                            includePackagings={includePackagings}
                            excludePackagings={excludePackagings}
                            maxPriceInAgorot={maxPrices}
                            minPriceInAgorot={minPrices}
                        >
                        </ItemGrid>, type:"itemGrid"}
                case "mail_verification":
                    if (argNum!=2) {
                        return {page: <div>404 Not Found</div>, type: "404"}
                    }
                    return {page: <MailVerification hash={arg2}></MailVerification>, type: "mailVerification"}
                default:
                    return {page: <LandingPage view={this.props.view}></LandingPage>, type: "landing"}            
            }
        }

        // user is logged
        
        if ((this.props.view.me.role_type=="Restaurant")||(this.props.view.me.role_type=="New")) {        
            if (argNum>0) {
                switch (arg1) {
                    case "orders":
                        return {page: <OrderManagement view={this.props.view} forceFetch={this.props.view.has_updates}></OrderManagement>, type: "orderManagement"}
                    case "terms_and_conditions":
                        return {page: <TermsAndConditions view={this.props.view}></TermsAndConditions>, type: "termsAndConditions"}            
                    case "admin":
                        return {page: <AdminPage view={this.props.view}></AdminPage>, type: "adminPage"}
                    case "items":
                        return {page: <ItemGrid
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
                            </ItemGrid>, type: "itemGrid"}
                    case "users":
                        return {page: <UserGrid view={this.props.view}></UserGrid>, type: "userGrid"}
                    case "sapakim":
                        return {page: <SapakGrid view={this.props.view}></SapakGrid>, type: "sapakGrid"}
                    case "login":
                        return {page: <LogInOrCreateUser role_type={this.props.view.me.role_type}></LogInOrCreateUser>, type: "login"}
                    case "profile":
                        return {page: <ProfilePage view={this.props.view}></ProfilePage>, type: "profilePage"}
                    case "mail_verification":
                        if (argNum!=2) {
                            return {page: <div>404 Not Found</div>, type: "404"}
                        }
                        return {page: <MailVerification hash={arg2}></MailVerification>, type:"mailVerification"}
                    default:
                        return {page: <div>404 Not Found</div>, type:"404"}
                }
            }
            else {
                document.location="/#/items"
            }
        }
        
        if (this.props.view.me.role_type=="Sapak") {
            if (argNum>0) {
                switch (arg1) {
                    case "terms_and_conditions":
                        return {page: <TermsAndConditions view={this.props.view}></TermsAndConditions>, type: "termsAndConditions"}            
                    case "mail_verification":
                        if (argNum!=2) {
                            return {page: <div>404 Not Found</div>, type: "404"}
                        }
                        return {page: <MailVerification hash={arg2}></MailVerification>, type: "mailVerification"}
                    case "items":
                        return {page: <ItemGrid
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
                                selectedItem={this.state.selectedItem}
                                onItemSelected={(item)=>{
                                    this.setState({
                                        selectedItem: item,
                                    })     
                                }}
                                >
                            </ItemGrid> , type: "itemGrid" }                      
                    default:
                        return {page: <div>404 Not Found</div>, type:"404"}
                }
            }
            else {
                return {page: <SapakLanding view={this.props.view} forceFetch={this.props.view.has_updates}></SapakLanding>, type:"landing"}            
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
        const pageToRender = this.getPageToRender()
        return (
            <MainFrame
                view={this.props.view}
                type={pageToRender.type}
                selectedItem={this.state.selectedItem}
                onItemSelected={(item)=>{
                    this.setState({
                        selectedItem: item,
                    })     
                }}
            >
                {pageToRender.page}
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






