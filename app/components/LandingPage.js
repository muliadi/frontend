/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';

class LandingPage extends React.Component {
    render() {
        const style_big_background_image = {
            // TODO: optimize image size
            background: "url('/static/landing_big_bckground_image.jpg') 50% 50% / cover",
            height: "500px",
            marginTop: "-30px",
        }
        const style_heading1 = {
            color: "white",
            fontSize: "27px",
            textAlign: "center"
        }
        const style_heading_text1 = {
            color: "white",
            fontSize: "15px",
            textAlign:"center",
            marginTop:"15px",
        }
        return (
            <div>
                <div style={style_big_background_image}>
                    <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--4-col" style={{marginTop:"50px"}}>
                            <div style={style_heading1}>
                                הצטרפו עכשיו!
                            </div>
                            <div style={style_heading_text1}>
                                כע גכלחעי גלכחעי גכחלי עלגכחי עלגכחי עלחגכי עגכחלךיעלגכחי עלחגכי ג
                            </div>                            
                            <div style={{marginTop:"15px", textAlign:"center"}}>
                                <button style={{marginLeft:"15px"}} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                                    ספק
                                </button>                                
                                <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                                    מסעדן
                                </button>                                
                            </div>                            
                        </div>
                        <div className="mdl-cell mdl-cell--8-col">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage
