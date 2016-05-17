/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';


var __notebubbleidCount = 0

class NoteBubble extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "NoteBubble_"+__notebubbleidCount,
        }
        __notebubbleidCount += 1
    }    
    componentDidMount() {
        componentHandler.upgradeDom();
        
    }
    render() {
        const style_saveButton={
            position:"absolute",
            bottom:"3px",
            left:"3px",
            maxHeight: "18px",
            lineHeight: "13px",
            fontSize: "14px"
        }
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
            <div id={this.state.id}>
            <div className="NoteBubble" style={style_noteBubble} > 
                <div style={{display: "inline-block", width: "auto"}}>
                <div className="mdl-textfield mdl-js-textfield" style = {{width:"176px", }}>
                        <textarea className="mdl-textfield__input" type="text" rows="3" id={this.state.id}
                        onChange={(e)=>{this.props.onNoteContentChange(e.target.value) }}
                        value={this.props.noteContent}
                        >{this.props.noteContent}</textarea>
                    <label className="mdl-textfield__label" htmlFor={this.state.id}>הערה</label>
                    </div>                
                    <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored"
                    onClick= {()=>{this.props.onClickSaveButton()}}
                    style = {style_saveButton} >
                    שמור
                </button>
                <button className="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"
                    onClick= {()=>{this.props.onClickCloseButton()}} style = {{position:"absolute", top:"1px", left:"1px"}}>
                    <i className="material-icons">close</i>
                </button>                
                </div> 
            </div>
                  
            </div>                             
        )}
}

export default NoteBubble
