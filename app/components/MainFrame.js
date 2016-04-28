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
           e.target.style.color = "rgb(51, 172, 113)";
           // e.target.style.borderBottom = "5px solid red";
           // e.target.style.marginBottom = "-5px";
            
        }
        const style_nav_link_mouse_out = (e)=>{
            e.target.style.color = "rgb(66, 66, 66)";
           // e.target.style.borderBottom = "0px solid red";
           // e.target.style.marginBottom = "0px";
        }
        const style_page_content = {
            paddingTop: "0px",
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
                        document.location = "/#/loggedout";
                    },
                });            
        }                             
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <header className="mdl-layout__header" style={{paddingTop:"5px", paddingBottom:"5px", background:"#FFF", color:"#424242", padding:"0 60px"}}>
                    <div className="mdl-layout__header-row" >
                        <a href="/#">
                            <img src="static/Orderoo-logo.png" style={{height:"40px", float:"right"}}>
                            </img>
                        </a>
                         <div className="mdl-layout-spacer"></div>                       
                        <nav className="mdl-navigation mdl-layout--large-screen-only" style={{float:"left"}}>
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
                                    <div style={{flexDirection:"row", display:"flex", alignItems:"center", margin:"20px 0px 20px 0px"}}>
                                        <div style={style_avatar}
                                            id="avatar_user"
                                            onClick={()=>{document.location="/#/profile"}}>
                                        </div>
                                        <button style={{ marginRight:"10px",  maxHeight: "14px", lineHeight:"10px", fontSize:"11px"}} className="mdl-button mdl-js-button mdl-js-ripple-effect " onClick={()=>{logout()}}>         
                                        היתנתק
                                        </button>      
                                        
                                        <div className="mdl-tooltip mdl-tooltip--large" htmlFor="avatar_user">
                                            הינך מחובר כ-{this.props.view.me.full_name}
                                        </div>
                                                                                                                   
                                    </div>
                                :
                                <div style={{flexDirection:"row", display:"flex", alignItems:"center", margin:"20px 0px 20px 0px"}}>
                                    <div
                                        style={style_avatar}
                                        onClick={()=>{document.location="/#/login"}}
                                        href="/#/login"
                                        id="avatar_login11"
                                    ></div> 
                                    <button style={{ marginRight:"10px",  maxHeight: "14px", lineHeight:"10px", fontSize:"11px"}} className="mdl-button mdl-js-button mdl-js-ripple-effect " onClick={()=>{document.location="/#/login"}}>
                                        התחבר
                                    </button>  
                                                                     
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
                <div className="mdl-layout__drawer mdl-layout--small-screen-only">
                    <img src="static/Orderoo-logo.png" style={{height:"auto", width:"110px", marginTop:"20px", marginLeft:"auto", marginRight:"auto"}}></img>
                    <nav className="mdl-navigation">
                        {
                                 this.props.view.me.is_logged ?
                                    <div style={{flexDirection:"row", display:"flex", alignItems:"center", margin:"20px 0px 20px 0px"}}>
                                        <div style={style_avatar}
                                            id="avatar_user"
                                            onClick={()=>{document.location="/#/profile"; closeDrawer()}}>
                                        </div>
                                        <div style={{marginRight:"20px", fontSize:"14px"}}>
                                            {this.props.view.me.full_name}
                                        </div>
                                        <div className="mdl-layout-spacer"></div> 
                                        <button style={{ marginLeft:"10px", backgroundColor:"rgba(51,172,113,1)", maxHeight: "18px", lineHeight:"12px", fontSize:"12px"}} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={()=>{logout(); closeDrawer()}}>                                                                               
                                        היתנתק
                                </button>                                                                   
                                   </div>
                                :
                                <div style={{flexDirection:"row", display:"flex", alignItems:"center", margin:"20px 0px 20px 0px"}}>
                                    <div
                                        style={style_avatar}
                                        
                                        onClick={()=>{document.location="/#/login"; closeDrawer()}}
                                        href="/#/login"
                                        id="avatar_login11"
                                    ></div> 
                                    <div className="mdl-layout-spacer"></div> 
                                    <button style={{ marginLeft:"10px", backgroundColor:"rgba(51,172,113,1)", maxHeight: "18px", lineHeight:"12px", fontSize:"12px"}} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={()=>{document.location="/#/login"; closeDrawer()}}>
                                        התחבר
                                </button>                                    
                                    <div className="mdl-tooltip mdl-tooltip--large" htmlFor="avatar_login11">
                                        הירשם או כנס למערכת
                                    </div>                                    
                                    <ul style={{display:"none"}}>
                                        <li> belive it or not but this is needed to prevent an mdl vs react thingy. It's here so react doesn;t need to remove the nodes</li>
                                    </ul>                                                                            
                                </div>
                             }   
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
                
                <footer className="mdl-mini-footer" style={{ position:"relative", top:"400px"}} >
                
                
                    <div className="mdl-mini-footer--middle-section " style={{margin:"auto"}} >
                    <div style={{direction: "ltr"}}>  Copyright © 2016 CrazyDuck Ltd. All rights reserved.</div>
					    
					        <ul className="mdl-mini-footer--link-list">
						        <li style={{margin:"auto"}}><a href="#/terms_and_conditions">תנאי שימוש</a></li>
						        
					        </ul>
				        </div>
                
                </footer>
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
                    full_name
                    small_image {
                        id
                    }
                }
            }
        `,
    },
});

export default MainFrame
