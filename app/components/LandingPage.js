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
            fontSize: "2.625rem",
            textAlign:"center",
            margin: "1.75rem 0 2.625rem 0"
        }
        return (
            <div>
                <div className="hero hero--home" style={{position:"relative", textAlign:"center", verticalAlign:"middle"}}>
                    <div className="hero_bg-container" style={{backgroundImage:"url('/static/hero-bg-1200.jpg')",backgroundPosition: "bottom right", backgroundRepeat: "no-repeat", backgroundSize: "cover", display: "inline-block", width: "100%"}}>
                        <div className="hero_bg-container-overlay" style={{background: "none", padding: "12% 5%"}}>
                            <div style={style_heading1}>
                                    הצטרפו עכשיו חינם!
                            </div>
                            <div style={style_heading_text1}>
                                ניהול אספקה לעסק שלך
                            </div>   
                            <div style={{marginTop:"15px", textAlign:"center"}}>
                                <button style={{marginLeft:"15px", backgroundColor:"rgba(51,172,113,1)"}} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                                        ספק
                                </button>                                
                                <button style={{ backgroundColor:"rgba(51,172,113,1)"}} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                                        מסעדן
                                </button>                                
                            </div>     
                        </div>
                    </div>
                    <button className="hero__fab mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-shadow--4dp" style={{marginTop: "-1.75rem"}}>
                    <i className="material-icons"></i>
                    
                    </button>
                </div>
                <section className="section section--welcome section--text-left section--rev section--align-image-bottom">
                <div class="aux">
                </div>
                </section>
            </div>
        );
    }
}

export default LandingPage
