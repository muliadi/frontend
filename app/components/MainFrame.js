/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';

import {lang} from '../lang/heb.js';

import LogOutMutation from '../mutations/logOut.js'

import ItemsInBasketList from './itemsInBasketList.js'
import ItemsEditor from './ItemsEditor.js'

class MainFrameSub extends React.Component {
    componentDidMount() {
        componentHandler.upgradeDom();
    } 
    
     GenerateChainOrRestLogoDiv()
 {
     var retVar;
     const style_logo = {
            width: "65px",
            height: "35px",
            marginRight:"10px",
            borderRadius: "5px",
           // cursor:"pointer",
        } 
        switch (this.props.view.me.role_type) {
          case "Restaurant":   
          {
            if (this.props.view.me.restaurants[0].was_accepted_to_chain){
            const logo_path =  "/static/content/"+this.props.view.me.restaurants[0].chain.small_image_id;
            style_logo.background = "url('"+logo_path+"') 50% 50% / contain no-repeat";
             
             } else {
            const logo_path =  "/static/content/"+this.props.view.me.restaurants[0].small_image.id;
            style_logo.background = "url('"+logo_path+"') 50% 50% / contain no-repeat"; 
            }
            retVar = <div style={style_logo}/>;
            return retVar;
          }
          case "Sapak": 
          {
            const logo_path =  "/static/content/"+this.props.view.me.role_sapak.small_image_id;
            style_logo.background = "url('"+logo_path+"') 50% 50% / contain no-repeat"; 
            
            retVar = <div style={style_logo}/>; 
            return retVar;
          }
          
          default:      return retVar;
        }
    
 }
    
    render() {
        const avatar_path = this.props.view.me.role_type != "Anonymous" ?
            "/static/content/"+this.props.view.me.small_image.id
        :
            "static/login.png";
        const style_avatar = {
            width: "35px",
            height: "35px",
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
        const style_sidebar = {
            backgroundColor: "#fff",
            marginTop: "0px",
            marginRight: "-7px",
            marginBottom: "-20px",
            paddingRight: "0px",
            flex:"0 0 410px",
            position:"relative",
            zIndex:"100",
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
            paddingBottom: "20px",
            maxWidth: "auto",
            marginRight: "auto",
            marginLeft: "auto",
            display: "flex",
        }  
        const logout = (e)=>{
            Relay.Store.commitUpdate(new LogOutMutation({}),
                {
                    onFailure: (e) => {
                        console.log(e)
                    },
                    onSuccess: () => {
                        document.location = "/#/";
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
                            {
                                this.props.view.me.is_founder?
                                    <a className="mdl-navigation__link"
                                        style={style_nav_link}
                                        onMouseOver={style_nav_link_mouse_over}
                                        onMouseOut={style_nav_link_mouse_out}
                                        href="/#/admin">אדמין</a>
                                :
                                    null
                            }
                            
                            {
                                this.props.view.me.role_type == "Restaurant" ?
                                <a className="mdl-navigation__link"
                                        style={style_nav_link}
                                        onMouseOver={style_nav_link_mouse_over}
                                        onMouseOut={style_nav_link_mouse_out}
                                        href="/#/orders">ניהול הזמנות</a>
                                        :
                                        null
                            }
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
                               
                             {
                                 this.props.view.me.role_type != "Anonymous" ?
                                    <div style={{flexDirection:"row", display:"flex", alignItems:"center", margin:"20px 0px 20px 0px"}}>
                                        <div style={style_avatar}
                                            id="avatar_user"
                                            onClick={()=>{document.location="/#/profile"}}>
                                        </div>
                                        <div >
                                        {this.GenerateChainOrRestLogoDiv()}
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
                                 this.props.view.me.role_type != "Anonymous" ?
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
                             
                             
                        {
                            this.props.view.me.is_founder?
                                <a className="mdl-navigation__link"
                                    onClick={closeDrawer}
                                    href="/#/admin">אדמין</a>
                            :
                                null
                        }
                        
                        {
                                this.props.view.me.role_type == "Restaurant" ?
                                <a className="mdl-navigation__link"
                                        onClick={closeDrawer}
                                        href="/#/orders">ניהול הזמנות</a>
                                        :
                                        null
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
                        {
                            (this.props.view.me.role_type=="Restaurant") ?
                                <div style={style_sidebar}>
                                    <ItemsInBasketList view={this.props.view} />
                                </div>
                            :
                                ((this.props.type=="itemGrid") && (this.props.view.me.role_type=="Sapak"))?
                                    <div style={style_sidebar}>
                                        <ItemsEditor
                                            item={this.props.selectedItem}
                                            onItemSelected={this.props.onItemSelected}
                                            chains={this.props.view.me.role_sapak.chains}
                                            categories={this.props.view.categories.edges}
                                            units={this.props.view.units.edges}
                                            />
                                    </div>
                                :
                                    null
                        }                    
                        <div style={{position:"relative", width:"100%", zIndex:"1"}}>
                            {this.props.children}
                        </div>                                                            
                    </div>
                    <div className="footer-pusher" />
                    <footer className="mdl-mini-footer" style={{marginRight: (this.props.view.me.role_type=="Restaurant" )? "404px":"0px" }}>
                        <div
                            className="mdl-mini-footer--middle-section" style={{margin:"auto"}} >
                        <div style={{direction: "ltr"}}>  Copyright © 2016 CrazyDuck Ltd. All rights reserved.</div>
                                <ul className="mdl-mini-footer--link-list">
                                    <li style={{margin:"auto"}}><a href="#/terms_and_conditions">תנאי שימוש</a></li>
                                </ul>
                            </div>
                    </footer>
                </main>
                <div aria-live="assertive" aria-atomic="true" aria-relevant="text" className="mdl-snackbar mdl-js-snackbar">
                    <div className="mdl-snackbar__text"></div>
                    <button type="button" className="mdl-snackbar__action"></button>
                </div>
            </div>    
        );
    }
}

const MainFrame = Relay.createContainer(MainFrameSub, {
    fragments: {
        view: () => Relay.QL`
            fragment on view {
                ${ItemsInBasketList.getFragment('view')},
                categories(first:100) {
                    edges {
                        node {
                            ... on item_category {
                                id
                                full_name
                            }
                        }
                    }
                }   
                units(first:100) {
                    edges {
                        node {
                            ... on item_units_of_measure {
                                id
                                name
                            }
                        }
                    }
                }                                             
                me {
                    role_sapak{
                        small_image_id
                        chains {
                            name
                        }
                    }
                    role_type
                    is_founder
                    mail
                    full_name
                    restaurants {
                        small_image_id
                        small_image{
                            id
                        }
                        was_accepted_to_chain
                        chain {
                        name
                        small_image_id
                        }
                    }                   
                    small_image {
                        id
                    }
                }
            }
        `,
    },
});

export default MainFrame
