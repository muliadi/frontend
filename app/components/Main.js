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
            sidebar: false,
            argNum: 0,
            arg1: "",
            arg2: "",
            maxPrices: [],
        }
        window.onhashchange = this.getPageToRender.bind(this);        
    }    
    getPageToRender() {        
        const args = document.location.hash.slice(1).split("/").filter((s)=>(s!=""));
        const argNum = args.length;
        const arg1 = argNum >= 1 ? args[0] : null;
        const arg2 = argNum >= 2 ? args[1] : null;
        

        const includeCategories = args.filter((p)=>(p.startsWith("include_category_"))).map((p)=>(p.slice(length("include_category_".length))))
        const excludeCategories = args.filter((p)=>(p.startsWith("exclude_category_"))).map((p)=>(p.slice(length("exclude_category_".length))))
        
        const includeVendors = args.filter((p)=>(p.startsWith("include_vendor_"))).map((p)=>(p.slice(length("include_vendor_".length))))
        const excludeVendors = args.filter((p)=>(p.startsWith("exclude_vendor_"))).map((p)=>(p.slice(length("exclude_vendor_".length))))

        const includePackagings = args.filter((p)=>(p.startsWith("include_packaging_"))).map((p)=>(p.slice(length("include_packaging_".length))))
        const excludePackagings = args.filter((p)=>(p.startsWith("exclude_packaging_"))).map((p)=>(p.slice(length("exclude_packaging_".length))))

        const maxPrices = args.filter((p)=>(p.startsWith("max_price_"))).map((p)=>(p.slice(length("max_price_".length))))
        const minPrices = args.filter((p)=>(p.startsWith("min_price_"))).map((p)=>(p.slice(length("min_price_".length))))
        
        console.log(includeCategories)
        console.log(excludeCategories)
        console.log(includeVendors)
        console.log(excludeVendors)
        console.log(includePackagings)
        console.log(excludePackagings)
        console.log(maxPrices)
        console.log(minPrices)


        this.setState({sidebar: false, argNum: argNum, arg1: arg1, arg2: arg2, maxPrices: maxPrices.slice(0)});
        
        if (this.props.view.me.role_type=="Anonymous") {
            
            // user is not logged:
                  console.log("anon: ");
                  console.log(maxPrices);      
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
                    this.setState({pageToRender:<ItemGrid view={this.props.view}></ItemGrid>});
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
    componentWillMount() {
        setSapakimCookie(this.props.view.current_session)
        this.getPageToRender();
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






