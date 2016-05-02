/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';

class LandingPage extends React.Component {
    componentDidMount() {
        componentHandler.upgradeDom();
    } 
    render() {
        const style_big_background_image = {
            // TODO: optimize image size
            background: "url('/static/landing_big_bckground_image.jpg') 50% 50% / cover",
            height: "500px",
            marginTop: "0px",
        }
        const style_heading1 = {
            color: "white",
            fontSize: "3.625rem",
            textAlign: "center",
            margin: "1.75rem 0 2.625rem 0"
        }
        const style_heading_text1 = {
            color: "white",
            fontSize: "3.025rem",
            textAlign:"center",
            margin: "1.75rem 0 2.625rem 0"
        }
        return (
            <div>
                <div className="hero hero--home" style={{position:"relative", textAlign:"center", verticalAlign:"middle"}}>
                    <div className="hero_bg-container" style={{backgroundImage:"url('/static/hero-bg-1200.jpg')",backgroundPosition: "bottom right", backgroundRepeat: "no-repeat", backgroundSize: "cover", display: "inline-block", width: "100%"}}>
                        <div className="hero_bg-container-overlay" style={{background: "none", padding: "12% 5%"}}>
                            
                            <div style={style_heading1}>
                                  חסוך בעלויות המזון ונהל אספקה לעסק שלך 
                            </div>
                            <div style={style_heading1}>
                                    
                            </div>
                            <div style={style_heading_text1}>
                                    הצטרפו עכשיו חינם!
                            </div>
                             
                            <div style={{marginTop:"15px", textAlign:"center"}}>
                                <button style={{marginLeft:"15px", backgroundColor:"rgba(51,172,113,1)"}} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                                        ספק
                                </button>                                
                                <button style={{ backgroundColor:"rgba(51,172,113,1)" }} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={()=>{document.location="/#/login"}}>
                                        מסעדן
                                </button>                                
                            </div>     
                        </div>
                    </div>
                    <button className="hero__fab mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-shadow--4dp" style={{marginTop: "-1.75rem"}}>
                        <i className="material-icons"></i>
                    </button>
                    </div>
                    <section className="section section--welcome" style={{align:"center"}}>
                        <div className="mdl-grid">
                        <div className="mdl-layout-spacer"></div>
                        <div className="mdl-cell mdl-cell--4-col mdl-cell--7-col-tablet" style={{backgroundImage:"url('/static/screenshot1.png')", backgroundPosition: "50% 20%", backgroundRepeat: "no-repeat", minWidth:"400px",minHeight: "400px",  backgroundSize: "contain", align:"center"}}>
                            </div>
                            <div className="mdl-cell mdl-cell--4-col mdl-cell--7-col-tablet" >
                            
                                
                                <div style={{display: "block", color: "#808080", fontSize: "38px",fontWeight: "500", lineHeight: "1.3", margin: "0 30px", textAlign: "right"}}>
                               orderoo מחבר בין המסעדה לספק<br/> באופן ישיר ומקצועי
                                </div>
                                <ul className='mdl-list' style={{marginRight: "30px"}}>
                                    <li className="mdl-list__item">
                                    <i className="material-icons" style={{marginLeft: "10px"}}>phone_missed</i>
                                        <span className="mdl-list__item-primary-content">חיבור ישיר ומיידי, ללא סוכנים ומתווכים</span>
                                    </li>
                                    <li className="mdl-list__item">
                                    <i className="material-icons" style={{marginLeft: "10px"}}>query_builder</i>
                                        <span className="mdl-list__item-primary-content">התחבר ובצעה הזמנה בכל שעה שנוח לך</span>
                                    </li>
                                    <li className="mdl-list__item">
                                    <i className="material-icons" style={{marginLeft: "10px"}}>assignment_turned_in</i>
                                        <span className="mdl-list__item-primary-content">עבוד עם מערכת חכמה וידידותית, המתאימה לצרכיך</span>
                                    </li>
                                    <li className="mdl-list__item">
                                    
                                    <i className="material-icons" style={{marginLeft: "10px"}}>add_shopping_cart</i>
                                        <span className="mdl-list__item-primary-content">בנה לך סל הזמנות מתוזמן וקבועה</span>
                                    </li>
                                </ul>
                                
                            
                            </div>
                            <div className="mdl-layout-spacer"></div>
                         </div>
                    </section>
                
                
                <section className="section section--welcome section--text-left section--rev section--align-image-bottom">
                <div class="aux">
                </div>
                </section>
            </div>
        );
    }
}

export default LandingPage
