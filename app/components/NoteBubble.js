/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';



class NoteBubble extends React.Component {
    
    constructor(props){
        super(props)
         this.state ={
            noteContent: "",
            error: null,
        }
    }
    
    componentDidMount() {
        componentHandler.upgradeDom();
        
    }
   
      
   
   handlenoteContentChange(e){
       this.setState({
            noteContent: event.target.value,
            error: null,
        });
   }
   
   
    render() {
           const style_noteBubble = {
            border: "1px solid #828282",
            backgroundColor: "#ffffff",
            borderRadius: "5px",
            boxShadow: "0 0 6px #B2B2B2",
            display: "inline-block",
            padding: "10px 18px",
            position: "absolute",
            verticalAlign: "top",
            right:"0px",
            float: "left",   
            margin: "5px 45px 5px 20px", 
            top: "3px",
        }
        
         const style_noteCallOut = {
            float: "left",
            top: "-32px",
            backgroundImage: "url('/static/Callouts.gif')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left -33px",
            width: "11px",
            height: "11px",
            marginLeft: "-8px",
            position: "relative",
            marginTop: "10px",            
        }
        return (
            <div >
            <div className="NoteBubble" style={style_noteBubble} > 
                <div style={{display: "inline-block", width: "auto"}}>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style = {{width:"150px", }}>
                        <textarea className="mdl-textfield__input" type="text" rows="1" id="note1"
                        onChange={(e)=>{this.props.onNoteContentChange(e.target.value) }}
                        >{this.props.noteContent}</textarea>
                    <label className="mdl-textfield__label" htmlFor="note1">הערה</label>
                    </div>                
                    <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored"
                    onClick= {()=>{this.props.onClickSaveButton()}}
                    style = {{position:"absolute", bottom:"6px", left:"6px", maxHeight: "19px",     lineHeight: "13px", fontSize: "14px"}} >
                    שמור
                </button>
                <button className="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"
                    onClick= {()=>{this.props.onClickCloseButton()}} style = {{position:"absolute", top:"1px", left:"1px"}}>
                    <i className="material-icons">close</i>
                </button>                
                </div> 
            </div>
            <span className="callout" style={style_noteCallOut} ></span>            
            </div>                             
        )}
}

export default NoteBubble
