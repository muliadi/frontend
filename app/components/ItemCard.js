// /* jshint esversion: 6*/

import React from 'react';

class ItemCard extends React.Component {
    render() {
        var style_card = {
            width: "320px;",
            height: "320px;",
            margin: "20px 20px 20px 20px;",
            background: "url('data:image;base64,"+this.props.image+"') center / cover",        
            flexDirection: "column-reverse;"        
        };
        var style_shadow = {
            width: "320px;",
            height: "75px;",
            margin: "0px 0px 0px 0px;",
            background: "rgba(0,0,0,0.75)",
            padding: "20px 20px 20px 20px;",
            color: "rgba(255,255,255,0.95);",
            fontSize: "25px;"
        };
        var style_short_desc = {
            marginTop: "10px;",
            color: "rgba(215,215,215,0.95);",
            fontSize: "15px;"
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

