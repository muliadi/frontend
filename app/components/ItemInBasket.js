/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';


import AddItemToBasketMutation from "../mutations/addItemToBasket.js";



class ItemInBasket extends React.Component {
    
    componentDidMount() {
        componentHandler.upgradeDom();
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
        };
        
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
                        
                        <div  className= "basket-noteButton" >
                        <button className="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" style={{color: "rgb(220, 220, 0)"}} 
                        >

                                <i className="material-icons">note_add </i>
                            </button>
                        </div>
                    <div id="binB" className= "basket-binButton" >
                        <div >
                        <span>
                        </span>
                        <span style={{display: "inline-block", width: "140px"}}>
                            
                            <button className="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"
                                onClick={()=>{this.handleAddItemToBasket(item, -1, null)}} >
                                <i className="material-icons">remove</i>
                            </button>
                            <button className="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"
                                onClick={()=>{this.handleAddItemToBasket(item, 1, null)}} >
                                <i className="material-icons">add</i>
                            </button>
                                <button className="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"
                                onClick={()=>{this.handleAddItemToBasket(item, -item.node.Amount, null)}} >
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
