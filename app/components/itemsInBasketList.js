/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';

import EmptyBasketsMutation from '../mutations/emptyBaskets.js';
import ItemInBasket from './ItemInBasket.js';
import SubmitOrderInBasketMutation from '../mutations/submitOrderInBasketMutation.js';
import CommRound from './commRound.js' 

class ItemsInBasketListSub extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            openItemKey: null,
            communicating: false,
            error: null,
        }
    }
    
     
    
    componentWillMount() {
        this.props.relay.setVariables({show:true});
    }
    componentDidMount() {
        componentHandler.upgradeDom();
    }
    handleEmptyBaskets() {
        Relay.Store.commitUpdate(new EmptyBasketsMutation({}),
            {
                onFailure: (e) => {
                    console.log(e.getError())
                },
                onSuccess: () => {
                },
            });
    }
    
    handleSubmitOrderInBasketMutation() {
        this.setState({
            communicating: true
        })
        Relay.Store.commitUpdate(new SubmitOrderInBasketMutation({
            basketID: this.props.view.current_baskets.edges[0].node.id,
        }),
            {
                onFailure: (e) => {
                    console.log(e.getError())
                    this.setState({
                        communicating: false
                    })
                },
                onSuccess: () => {
                    this.setState({
                        communicating: false
                    })
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
            padding:   "0px",
            display: "flex",
            direction:"ltr",
            overflow:"auto",
            overflowX:"hidden",
            width: "100%",
            flexGrow: "1",            
            wordWrap: "break-word",
            //wordBreak: "break-all",

        }
        const list_style ={
            margin: "0px",
            padding: "0px",
            display: "table-row",
            //background: "#fff",
        }
        
         const total_style = {
            width: "auto",
            textAlign: "center",
            minHeight: "50px",
            marginBottom:"60px",
            padding:"10px",
            background: "rgba(78,176,82,0.1)",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: "25px",
            fontSize: "15px",                                    
         }
       
       const NoteOpened = (key)=>{
           this.setState({ openItemKey: key})
       }
       
       const NoteClosed = ()=>{
           this.setState({ openItemKey: null})
       }
       
        return (

            <div className="ItemsBasket" style={{
                background: "#FFF",
                margin: "0px 2px 0px 2px",
                position:"fixed",
                height:"100%",
                width:"405px",
                display: "flex",
                marginRight:"5px",
                flexDirection:"column",                                
            }}>
            
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
                    </ul>
                </div>
                
                <div style={total_style}>
                    סה"כ: {totalPrice} &#8362;
                  {
                    totalAmount>0 ?
                    this.state.communicating ?
                        <CommRound style={{ margin: "10px"}}></CommRound>
                        :
                        <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
                        style={{minWidth:"100px", marginRight:"15px"}}
                        onClick={this.handleSubmitOrderInBasketMutation.bind(this) }> 
                            הזמן
                        </button>
                    
                  :
                  null
                  }
                    
                   
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
                current_baskets(first:1){
                    edges{
                        node{
                        ... on basket
                            {
                                id
                                review_status
                            }
                        }
                    }
                }
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
