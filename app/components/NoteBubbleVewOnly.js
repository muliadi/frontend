/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';


var __notebubbleReadOnlyidCount = 0

class NoteBubbleVewOnly extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "NoteBubbleVewOnly_"+__notebubbleReadOnlyidCount,
        }
        __notebubbleReadOnlyidCount += 1
    }
    componentDidMount() {
        componentHandler.upgradeDom();
        
    }    
    render() {        
           const style_noteBubble = {
            border: "1px solid rgba(78,176,82,0.2)",
            //border: "1px solid #828282",
            backgroundColor: "#fef3bb ",
            borderRadius: "0px",
            boxShadow: "0 0 0px #B2B2B2",
            display: "inline-block",
            padding: "1px 10px",
            position: "absolute",
            verticalAlign: "top",
            right:"0px",
            float: "left",   
            margin: "0px 40px 0px 0px", 
            top: "-1px",
        }
        
        return (
            <div >
            <div className="NoteBubble" style={style_noteBubble} > 
                <div style={{display: "inline-block", width: "auto"}}>
                <div className="mdl-textfield mdl-js-textfield" style = {{width:"176px", }}>
                        <textarea disabled className="mdl-textfield__input" type="text" rows="3" id={this.state.id}
                        value={this.props.noteContent}
                        >{this.props.noteContent}</textarea>
                    <label className="mdl-textfield__label" htmlFor={this.state.id}>הערה</label>
                    </div>                
                <button className="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"
                    onClick= {()=>{this.props.onClickCloseButton()}} style = {{position:"absolute", top:"1px", left:"1px"}}>
                    <i className="material-icons">close</i>
                </button>                
                </div> 
            </div>
                  
            </div>                             
        )}
}

export default NoteBubbleVewOnly
