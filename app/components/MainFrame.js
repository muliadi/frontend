/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';

import {lang} from '../lang/heb.js';

import LogOutMutation from '../mutations/logOut.js'

class MainFrameSub extends React.Component {
    componentDidMount() {
        componentHandler.upgradeDom();
    } 
    render() {
        const avatar_path = this.props.view.me.is_logged ?
            "/static/content/"+this.props.view.me.small_image.id
        :
            "static/login.png";
        const style_avatar = {
            width: "30px",
            height: "30px",
            marginRight:"25px",
            borderRadius: "100px",
            cursor:"pointer",
            background: "url('"+avatar_path+"') center / cover",        
        }
        document.title = lang.document_title;
        const closeDrawer = ()=>{
            document.getElementsByClassName("mdl-layout__drawer-button")[0].click()
        }
        const style_nav_link = {
            color:"rgb(66,66,66)",
            fontSize: "17px",
        }       
        const style_nav_link_mouse_over = (e)=>{
           e.target.style.color = "rgb(68,138,255)";
           // e.target.style.borderBottom = "5px solid red";
           // e.target.style.marginBottom = "-5px";
            
        }
        const style_nav_link_mouse_out = (e)=>{
            e.target.style.color = "rgb(66, 66, 66)";
           // e.target.style.borderBottom = "0px solid red";
           // e.target.style.marginBottom = "0px";
        }
        const style_page_content = {
            paddingTop: "30px",
            maxWidth: "auto",
            marginRight: "auto",
            marginLeft: "auto",
        }  
        const logout = (e)=>{
            Relay.Store.commitUpdate(new LogOutMutation({}),
                {
                    onFailure: (e) => {
                        // TODO: implement
                    },
                    onSuccess: () => {
                        document.location = "/#";
                    },
                });            
        }                             
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <header className="mdl-layout__header" style={{paddingTop:"5px", paddingBottom:"5px", background:"#FFF", color:"#424242"}}>
                    <div className="mdl-layout__header-row">
                        <span className="mdl-layout-title">שוק הספקים</span>
                        <div className="mdl-layout-spacer"></div>                        
                        <nav className="mdl-navigation" >
                            <a className="mdl-navigation__link"
                               style={style_nav_link}
                               onMouseOver={style_nav_link_mouse_over}
                               onMouseOut={style_nav_link_mouse_out}
                               href="/#/items">מוצרים</a>
                            <a className="mdl-navigation__link"
                               style={style_nav_link}
                               onMouseOver={style_nav_link_mouse_over}
                               onMouseOut={style_nav_link_mouse_out}
                               href="/#/sapakim">ספקים</a>
                            <a className="mdl-navigation__link"
                               style={style_nav_link}
                               onMouseOver={style_nav_link_mouse_over}
                               onMouseOut={style_nav_link_mouse_out}
                               href="/#/users">משתמשים</a>
                               
                             {
                                 this.props.view.me.is_logged ?
                                    <div>
                                        <div style={style_avatar}
                                            id="avatar_user">
                                        </div>
                                        <div className="mdl-tooltip mdl-tooltip--large" htmlFor="avatar_user">
                                            הינך מחובר כ-{this.props.view.me.mail}
                                        </div>
                                        <ul className="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect"
                                            htmlFor="avatar_user">
                                            <li className="mdl-menu__item"
                                                onClick={logout}>
                                                צא</li>
                                        </ul>                                                                            
                                    </div>
                                :
                                <div>
                                    <div
                                        style={style_avatar}
                                        onClick={()=>{document.location="/#/login"}}
                                        href="/#/login"
                                        id="avatar_login11"
                                    ></div>                                    
                                    <div className="mdl-tooltip mdl-tooltip--large" htmlFor="avatar_login11">
                                        הירשם או כנס למערכת
                                    </div>                                    
                                    <ul style={{display:"none"}}>
                                        <li> belive it or not but this is needed to prevent an mdl vs react thingy. It's here so react doesn;t need to remove the nodes</li>
                                    </ul>                                                                            
                                </div>
                             }   
                        </nav>
                    </div>
                </header>
                <div className="mdl-layout__drawer">
                    <span className="mdl-layout-title">שוק הספקים</span>
                    <nav className="mdl-navigation">
                    <a className="mdl-navigation__link"
                        onClick={closeDrawer}
                        href="/#/items">מוצרים</a>
                    <a className="mdl-navigation__link"
                        onClick={closeDrawer}
                        href="/#/sapakim">ספקים</a>
                    <a className="mdl-navigation__link"
                        onClick={closeDrawer}
                        href="/#/users">משתמשים</a>
                    </nav>
                </div>
                <main className="mdl-layout__content">
                    <div className="page-content" style={style_page_content}>
                        {this.props.children}
                    </div>
                </main>
            </div>    
        );
    }
}

const MainFrame = Relay.createContainer(MainFrameSub, {
    fragments: {
        view: () => Relay.QL`
            fragment on view {
                me {
                    is_logged
                    mail
                    small_image {
                        id
                    }
                }
            }
        `,
    },
});

export default MainFrame
