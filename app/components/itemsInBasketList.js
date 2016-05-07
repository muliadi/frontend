/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';

import EmptyBasketsMutation from '../mutations/emptyBaskets.js'

import AddItemToBasketMutation from "../mutations/addItemToBasket.js"


class ItemsInBasketListSub extends React.Component {
    componentWillMount() {
        this.props.relay.setVariables({show:true});
    }
    componentDidMount() {
        componentHandler.upgradeDom();
    }
    handleEmptyBaskets() {
        console.log("emptying baskets...");
        Relay.Store.commitUpdate(new EmptyBasketsMutation({}),
            {
                onFailure: (e) => {
                    console.log(e.getError())
                },
                onSuccess: () => {
                },
            });
    }
    handleAddItemToBasket(item) {
        console.log("Adding!")
        Relay.Store.commitUpdate(new AddItemToBasketMutation({
            amount: "1",
            remarks: "just testing remarks",
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
                        message:  item.node.item.name +' הוסף בהצלחה'
                    }
                    );
                },
            });
    } 
    handleRemoveItemFromBasket(item, amountToRemove) {
        console.log("Removing!")
        Relay.Store.commitUpdate(new AddItemToBasketMutation({
            amount: amountToRemove*-1,
            remarks: "just testing remarks",
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
                        message:  item.node.item.name +' הוסר בהצלחה'
                    }
                    );
                },
            });
    }     
    render() {
        
        if (!('current_items_in_baskets' in this.props.view)) {
            return (
                <div></div>
            );
        }

        const style_show_div_mouse_over = (e)=>{
         var element = e.target.querySelector("#binB");
          e.target.querySelector("#binB").style.display = "inline";
          
           
        }
        const style_hide_div_mouse_out = (e)=>{
            e.target.querySelector("#binB").style.display = "none";
           
        }
        const totalPrice = this.props.view.current_items_in_baskets.edges.map((item, i) => (item.node.Amount*item.node.item.price_in_agorot)).reduce((a,b)=>(a+b), 0)/100;
        const totalAmount = this.props.view.current_items_in_baskets.edges.map((item, i) => (item.node.Amount)).reduce((a,b)=>(a+b), 0);

        const listbox_style = {
            margin: "0",
            height: "54px" ,
            padding:   "0px",
            display: "table",
            width: "100%",
            
            wordWrap: "break-word",
            //wordBreak: "break-all",

        }
        const list_style ={
            margin: "0",
            height: "54px",
            padding: "0px",
            display: "table-row",
            //background: "#fff",
        }
        
         const total_style = {
           padding: "0px",
            listStyle: "none",
            //border: "1px solid rgba(78,176,82,0.2)",
            //display: "table-cell", 
            width: "auto",
            textAlign: "center",
            minHeight: "110px",
            background: "rgba(78,176,82,0.1)",
         }
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
        const dt_small = {
            padding: "1px",
            WebkitMarginBefore: "1px",
            width: "33px"
        };
        

       
        const th_pic = {
            padding: "1px",
            WebkitMarginBefore: "1px",
            width: "60px"
        };
        const style_list_item = {
            marginLeft: "auto",
            marginRight: "auto",
            padding: "1px",

        };
        return (

            <div className="ItemsBasket" style={{ background: "#FFF", margin: "0px 2px 0px 2px" }}>
            
                <div>

                    <div className="mdl-grid" style={{ background: "rgba(78,176,82,0.1)" }}>


                        <div className="mdl-cell mdl-cell--5-col-desktop mdl-cell--5-col-tablet mdl-cell--4-col-phone" style={{ fontSize: "16px", color: "rgba(0,0,0,.54)", lineHeight: "25px" }}>
                            סל הקניות שלי
                        </div>
                        <div className="mdl-cell mdl-cell--5-col-desktop mdl-cell--5-col-tablet mdl-cell--4-col-phone">
                            <button
                                className="mdl-button mdl-js-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                                onClick={this.handleEmptyBaskets.bind(this) }
                                style={{ marginRight: "0px", maxHeight: "25px", lineHeight: "11px", fontSize: "12px" }}>
                                נקה סל
                                <i className="material-icons">delete_forever</i>
                            </button>
                        </div>

                        <div className="mdl-cell mdl-cell--2-col-desktop mdl-cell--2-col-tablet mdl-cell--2-col-phone " style={{position: "relative", }} >
                            <div className="material-icons mdl-badge mdl-badge--overlap " data-badge={totalAmount} style={{position: "absolute", left:"58px", top:"4px",zIndex:"2",color:"#fff"}} > </div>
                            <img src="/static/shopping-cart.png" alt="Shopping Cart" style={{ height: "35px", marginTop: "-3px", position: "absolute", left:"10px", top:"0px",}}></img>
                               
                        </div>

                    </div>

                </div>
                
                <div style={listbox_style}>
                    <ul className="mdl-list" style={list_style}>
                        {                            
                            this.props.view.current_items_in_baskets.edges.map((item, i) => {
                                return  <li name={i} key={i} className="mdl-list__item basketlistItem" style={listItem_style}>
                                <span className="mdl-list__item-primary-content" style={{position:"relative", minHeight: "110px"}}>
                                    <img src={"/static/content/" + item.node.item.small_image.id} alt="Shopping Cart" style={{ width: "70px", marginTop: "-0px" }}></img>
                                    <span className="mdl-list__item-text-body" style={{width:"100%", textAlign:"right", marginRight:"10px"}}>
                                     {item.node.item.name}
                                    </span>
                                    <div>x{item.node.Amount}</div>
                                    
                                    
                                    
                                    
                                    <span style={{minWidth:"110px", marginRight:"4px"}}>{item.node.item.price_in_agorot * item.node.Amount/ 100} &#8362;</span>
                                     
                                     <div  className= "basket-noteButton" >
                                      <button className="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" style={{color: "rgb(220, 220, 0)"}} >

                                                <i className="material-icons">note_add </i>
                                            </button>
                                     </div>
                                    <div id="binB" className= "basket-binButton" >
                                        <div >
                                        <span>
                                            
                                        </span>
                                        <span style={{display: "inline-block", width: "140px"}}>

                                          
                                            <button className="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"
                                                onClick={()=>{this.handleRemoveItemFromBasket(item,1)}} >
                                                <i className="material-icons">remove</i>
                                            </button>
                                            <button className="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"
                                                onClick={()=>{this.handleAddItemToBasket(item)}} >
                                                <i className="material-icons">add</i>
                                            </button>
                                            

                                             <button className="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"
                                                onClick={()=>{this.handleRemoveItemFromBasket(item,item.node.Amount)}} >

                                                <i className="material-icons">delete </i>
                                            </button>
                                        </span>
                                        </div>
                                    </div>
                                </span>
                                </li>
                        
                        })
                        }
                         <li   className="mdl-list__item " style={total_style}>
                                <span className="mdl-list__item-primary-content" style={{position:"relative", minHeight: "110px"}}>
                                   
                                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" style={{minWidth:"100px", marginRight:"15px"}}> 
                                                הזמן
                                    </button>
                                    <span className="mdl-list__item-text-body" style={{width:"100%", textAlign:"left"}}>
                                    סה"כ: 
                                    </span>
                                    <div> </div>
                                                                        
                                    <span style={{minWidth:"110px", marginRight:"4px"}}>{totalPrice} &#8362;</span>
                                    
                                  
                                    
                                </span>
                                </li>
                    </ul>
                </div>
                
            </div>
        );
    }
}

const ItemsInBasketList = Relay.createContainer(ItemsInBasketListSub, {
    initialVariables: {
        show: false,
    },
    fragments: {
        view: () => Relay.QL`
            fragment on view {
                current_items_in_baskets(first: 100) @include(if: $show) {
                    edges {
                        node {
                            ... on item_in_basket {
                              Amount
                              remarks
                                item {
                                    id
                                    name
                                    price_in_agorot
                                    small_image {
                                        id
                                    }
                                    
                                }
                            }
                        }
                    }
                }
            }`,
    },
});

export default ItemsInBasketList
