/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';


import AddItemToBasketMutation from "../mutations/addItemToBasket.js";
import NoteBubbleVewOnly from "./NoteBubbleVewOnly.js";


var __ItemInBasketElementID = 0
class ItemInBasketForAccordion extends React.Component {
    constructor(props){
        super(props)
         this.state ={            
            isTranslated: false,
            itemInBasketElementID: "elementInAccBasketID_"+__ItemInBasketElementID,
            error: null,
        }
        __ItemInBasketElementID += 1;
    }
    componentDidMount() {
        componentHandler.upgradeDom();
    }
    componentDidUpdate() {
        if ((this.props.isNoteOpen)&&(!this.state.isTranslated)) {
            document.getElementById(this.state.itemInBasketElementID).style.transform = 'translateX(0px)';
            this.setState({isTranslated: true})
            return 
        }
        if ((!this.props.isNoteOpen)&&(this.state.isTranslated)) {
            document.getElementById(this.state.itemInBasketElementID).style.transform = 'translateX(0px)';
            this.setState({isTranslated: false})
            return 
        }        
    }
    
       
    render() {
        const listItem_style = {
            //opacity:"0.4",
            padding: "0px",
            paddingRight:"100px",
            listStyle: "none",
            //border: "1px solid rgba(78,176,82,0.2)",
            //display: "table-cell", 
            width: "500px",
            textAlign: "center",
            minHeight: "110px",
            overflow: "visible",
            direction: "rtl",
            display: "relative",
            transition: "transform 0.2s",
        };
        
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
            overflow: "visible",
            top: "3px",
        }
        
         
        const style_noteButtonDiv ={            
        }
        const style_binButton = {            
        }
        
                
        if ((this.state.noteContent!=null)&&(this.state.noteContent!=""))
        {
             style_noteButtonDiv.display = "block"             
        }        
        if(this.props.isNoteOpen){
            style_noteButtonDiv.display = "block" 
            style_binButton.display = "block"  
            listItem_style.opacity = "1"            
        }
        const style_noteButton = {
            color: "rgb(255, 229, 96)",
        }
        const style_list_item = {
            marginLeft: "auto",
            marginRight: "auto",
            padding: "1px",           
        };
       
        const item = this.props.item;
        return (
            <li id={this.state.itemInBasketElementID} className="mdl-list__item basketlistItem" style={listItem_style}>
                <span className="mdl-list__item-primary-content" style={{position:"relative", minHeight: "110px", width:"410px"}}>
                    <span style={{  minHeight: "90px", minWidth:"90px", background:"url('/static/content/" + item.item.small_image.id+"') 50% 50% / contain no-repeat "}}/>
                    <span className="mdl-list__item-text-body" style={{width:"100%", textAlign:"right", marginRight:"5px", marginLeft:"5px"}}> 
                        {item.item.name}
                </span>
                    <div>x{item.Amount}</div>
                    
                    <span style={{minWidth:"110px", marginRight:"4px"}}>{item.item.price_in_agorot * item.Amount/ 100} &#8362;</span>
                        
                        <div  className= "basket-noteButton" style={style_noteButtonDiv}>
                            <button className="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" style={style_noteButton} 
                            onClick= {()=>{this.props.onOpen(this.props.myKey)}}>
                                <i className="material-icons">description</i>
                            </button>
                            {this.props.isNoteOpen?
                               <NoteBubbleVewOnly 
                               noteContent = {item.remarks} 
                               onClickCloseButton ={()=>{this.props.onClose()}} 
                               onClickSaveButton ={()=>{this.handleNoteBubbleSave()}}
                               onNoteContentChange={(newContent)=>{this.setState({noteContent: newContent})}}
                               />
                            :
                               null
                            }
                        </div>                   
                     
                </span>
               
                </li>
        )}
}



export default ItemInBasketForAccordion
