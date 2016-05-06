/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';

import EmptyBasketsMutation from '../mutations/emptyBaskets.js'

class ItemsInBasketListSub extends React.Component {
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
                    console.log("success!!!");
                },
            });
    }
    render() {
        
        const style_show_div_mouse_over = (e)=>{
         var element = e.target.querySelector("#binB");
         console.log(element);
          e.target.querySelector("#binB").style.display = "inline";
          
           
        }
        const style_hide_div_mouse_out = (e)=>{
            e.target.querySelector("#binB").style.display = "none";
           
        }
        const totalPrice = this.props.view.current_items_in_baskets.edges.map((item, i) => (item.node.Amount*item.node.item.price_in_agorot)).reduce((a,b)=>(a+b), 0)/100;

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
            <div className="ItemsBasket" style={{ background: "#FFF", margin: "0px 4px 0px 4px" }}>
            
                <div>

                    <div className="mdl-grid" style={{ border: "2px solid rgba(78,176,82,0.3)", background: "rgba(78,176,82,0.1)" }}>


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

                        <div className="mdl-cell mdl-cell--2-col-desktop mdl-cell--2-col-tablet mdl-cell--2-col-phone" >
                            <img src="/static/shopping-cart.png" alt="Shopping Cart" style={{ height: "30px", marginTop: "-3px", position: "absolute" }}></img>
                        </div>

                    </div>

                </div>
                
                <div style={listbox_style}>
                    <ul className="mdl-list" style={list_style}>
                        {
                            this.props.view.current_items_in_baskets.edges.map((item, i) => {
                                return  <li name={i} key={i} className="mdl-list__item basketlistItem" style={listItem_style} 
                                >
                                <span className="mdl-list__item-primary-content"
                                
                                >
                                    <img src={"/static/content/" + item.node.item.small_image.id} alt="Shopping Cart" style={{ width: "70px", marginTop: "-0px" }}></img>
                                    <span className="mdl-list__item-text-body" style={{width:"100%", textAlign:"right"}}>
                                     {item.node.item.name}
                                    </span>
                                    <span>x{item.node.Amount}</span>
                                    <span style={{width:"100px", marginRight:"4px"}}>{item.node.item.price_in_agorot / 100} &#8362;</span>
                                    
                                    <div id="binB" className= "basket-binButton" ><button className="mdl-button mdl-js-button mdl-button--icon">
                                            <i className="material-icons">delete </i>
                                        </button>
                                        <div className="mdl-layout-spacer"></div>
                                        <button className="mdl-button mdl-js-button mdl-button--icon">
                                            <i className="material-icons">note_add </i>
                                        </button>
                                    
                                    </div>
                                </span>
                                </li>
                           
                         })
                        }
                    </ul>
                </div>
                
                <div>{totalPrice} &#8362;</div>
            </div>
        );
    }
}

const ItemsInBasketList = Relay.createContainer(ItemsInBasketListSub, {
    fragments: {
        view: () => Relay.QL`
            fragment on view {
                current_items_in_baskets(first: 100) {
                    edges {
                        node {
                            ... on item_in_basket {
                              Amount
                              remarks
                                item {
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
