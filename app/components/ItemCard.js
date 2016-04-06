// /* jshint esversion: 6*/

import React from 'react';

class ItemCard extends React.Component {
    render() {
        var style_card = {
            width: "100%;",
            maxWidth: "320px;",
            height: "320px;",
            background: "url('data:image;base64,"+this.props.image+"') center / cover",        
            flexDirection: "column-reverse;",
            marginLeft: "auto;",        
            marginRight: "auto;",        
        };
        var style_shadow = {
            width: "94%;",
            margin: "0px 0px 0px 0px;",
            background: "rgba(0,0,0,0.75)",
            paddingTop: "10px;",
            paddingRight: "3%;",
            paddingLeft: "3%;",
            paddingBottom: "10px;",
            color: "rgba(255,255,255,0.95);",
            fontSize: "22px;"
        };
        var style_short_desc = {
            marginTop: "7px;",
            color: "rgba(215,215,215,0.95);",
            fontSize: "13px;",
            lineHeight: "1.2;",
        };
        return (
            <div className="mdl-card mdl-shadow--4dp" style={style_card}>
                <div style={style_shadow}>
                    <div>
                        {this.props.name}
                    </div>
                    <div style={style_short_desc}>
                        {this.props.short_desc}
                    </div>
                </div>
            </div>
            
        );
    }
}

export default ItemCard;

