/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';


import AddItemToBasketMutation from "../mutations/addItemToBasket.js";
import NoteBubble from "./NoteBubble.js";



class ItemInBasket extends React.Component {
    
    constructor(props){
        super(props)
         this.state ={
            
            noteContent: this.props.item.node.remarks,
            error: null,
        }
    }
    
    
    
    componentDidMount() {
        componentHandler.upgradeDom();
    }
   
    handleNoteBubbleSave(){
        this.handleAddItemToBasket(this.props.item, 0, this.state.noteContent)
        this.props.onClose(this.props.myKey)
        
    }
   
    handleAddItemToBasket(item, amount, remarks) {
        Relay.Store.commitUpdate(new AddItemToBasketMutation({
            amount: amount,
            remarks: remarks==null? item.node.remarks : remarks,
            itemID: item.node.item.id,
        }),
            {
                onFailure: (e) => {
                    console.log(e.getError())
                },
                onSuccess: () => {
                    var notification = document.querySelector('.mdl-js-snackbar');
                    notification.MaterialSnackbar.showSnackbar(
                    {
                        message:  item.node.item.name +' הוסף בהצלחה',
                        timeout: 700
                    }
                    );
                },
            });
    }     
    render() {
        const listItem_style = {
            //opacity:"0.4",
            padding: "0px",
            listStyle: "none",
            //border: "1px solid rgba(78,176,82,0.2)",
            //display: "table-cell", 
            width: "auto",
            textAlign: "center",
            minHeight: "110px",
            overflow: "visible",
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
            //style_noteButton.position= "absolute"
            //style_noteButton.left="0px"
            //style_noteButton.top= "1px" 
           // style_noteButton.color= "rgb(220, 220, 0)"
            //style_noteButton.zIndex = "3"
                        
            style_binButton.display = "block"  
            //listItem_style.border= "1px solid rgba(78,176,82,0.8)"
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
            <li className="mdl-list__item basketlistItem" style={listItem_style}>
                <span className="mdl-list__item-primary-content" style={{position:"relative", minHeight: "110px"}}>
                    <img src={"/static/content/" + item.node.item.small_image.id} alt="Shopping Cart" style={{ width: "70px", marginTop: "1px" }}></img>
                    <span className="mdl-list__item-text-body" style={{width:"100%", textAlign:"right", marginRight:"10px"}}>
                        {item.node.item.name}
                </span>
                    <div>x{item.node.Amount}</div>
                    
                    <span style={{minWidth:"110px", marginRight:"4px"}}>{item.node.item.price_in_agorot * item.node.Amount/ 100} &#8362;</span>
                        
                        <div  className= "basket-noteButton" style={style_noteButtonDiv}>
                            <button className="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" style={style_noteButton} 
                            onClick= {()=>{this.props.onOpen(this.props.myKey)}}>
                                <i className="material-icons">description</i>
                            </button>
                            {
                                this.props.isNoteOpen?
                               <NoteBubble 
                               noteContent = {this.state.noteContent} 
                               onClickCloseButton ={()=>{this.props.onClose()}} 
                               onClickSaveButton ={()=>{this.handleNoteBubbleSave()}}
                               onNoteContentChange={(newContent)=>{this.setState({noteContent: newContent})}}
                               />
                                :
                                null
                                
                            }
                        </div>
                    <div className= "basket-binButton" style={style_binButton}>
                        <div >
                        <span>
                        </span>
                        <span style={{display: "inline-block", width: "140px"}}>
                            
                            <button className="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"
                                onClick={()=>{this.handleAddItemToBasket(item, -1, null); this.props.onClose()}} >
                                <i className="material-icons">remove</i>
                            </button>
                            <button className="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"
                                onClick={()=>{this.handleAddItemToBasket(item, 1, null); this.props.onClose()}} >
                                <i className="material-icons">add</i>
                            </button>
                                <button className="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"
                                onClick={()=>{this.handleAddItemToBasket(item, -item.node.Amount, null); this.props.onClose()}} >
                                <i className="material-icons">delete </i>
                            </button>
                        </span>
                        </div>
                    </div>
                     
                </span>
               
                </li>
        )}
}



export default ItemInBasket
