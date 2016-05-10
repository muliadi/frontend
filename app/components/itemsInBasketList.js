/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';

import EmptyBasketsMutation from '../mutations/emptyBaskets.js';
import ItemInBasket from './ItemInBasket.js';

class ItemsInBasketListSub extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            openItemKey: null
        }
    }
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
    render() {
        
        
        // if (!('current_items_in_baskets' in this.props.view)) {
        //     return (
        //         <div></div>
        //     );
        // }

        const totalPrice = this.props.view.current_items_in_baskets.edges.map((item, i) => (item.node.Amount*item.node.item.price_in_agorot)).reduce((a,b)=>(a+b), 0)/100;
        const totalAmount = this.props.view.current_items_in_baskets.edges.map((item, i) => (item.node.Amount)).reduce((a,b)=>(a+b), 0);

        const listbox_style = {
            margin: "0px",
            height: "54px" ,
            padding:   "0px",
            display: "table",
            width: "100%",
            
            wordWrap: "break-word",
            //wordBreak: "break-all",

        }
        const list_style ={
            margin: "0px",
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
       
       const NoteOpened = (key)=>{
           this.setState({ openItemKey: key})
       }
       
       const NoteClosed = ()=>{
           this.setState({ openItemKey: null})
       }
       
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
                                return <ItemInBasket 
                                key={i} 
                                myKey={i}
                                item={item} 
                                onOpen = {NoteOpened} 
                                onClose = {NoteClosed}
                                isNoteOpen ={this.state.openItemKey == i}/>
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
                current_items_in_baskets(first: 100) {
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
