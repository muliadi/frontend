/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';
import { Accordion, AccordionItem } from 'react-sanfona';
import OrderManagementListItem from './OrderManagementListItem.js'
import ItemInBasketForAccordion from './ItemInBasketForAccordion.js';

class OrderManagementAccordeonSub extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            openItemKeyAccordion: null,
            communicating: false,
            error: null,
        }
    }
    
    componentDidMount() {
        componentHandler.upgradeDom();
    } 
    
   
    componentWillReceiveProps(nextProps) {
        if (nextProps.forceFetch) {
            this.props.relay.forceFetch()
        }        
    }

 

    
    render() {
         const listbox_style = {
            
            margin: "0px",
            padding:   "0px",
            //display: "flex",
            //direction:"ltr",
            overflow:"auto",
            overflowX:"hidden",
            //width: "100%",
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
        
        const NoteOpened = (key)=>{
           this.setState({ openItemKeyAccordion: key})
       }
       
       const NoteClosed = ()=>{
           this.setState({ openItemKeyAccordion: null})
       }
        
        return (
                <Accordion activeItems={-1}>
                        {   this.props.baskets.filter((basket) => {
                    return basket.review_status == this.props.review_status
                    }).map((basket, x) => {
                        return ( 
                        <AccordionItem title={<OrderManagementListItem basket={basket}/>} slug={"476cbfh"+basket.id} key={"476cbfh"+basket.id}>
                            
                            <div style={listbox_style}>
                    <ul className="mdl-list" style={list_style}>
                        {                            
                            basket.items_in_basket.map((item, i) => {
                                return (<ItemInBasketForAccordion 
                                key={"m,nqwd89c76"+item.id} 
                                myKey={"09vxmcn"+item.id}
                                item={item} 
                                onOpen = {NoteOpened} 
                                onClose = {NoteClosed}
                                isNoteOpen ={this.state.openItemKeyAccordion == "09vxmcn"+item.id}/>)
                            })
                        }
                    </ul>
                </div>
                           
                        </AccordionItem>
                    );
                })
                }
                </Accordion>
        );
    }
}

const OrderManagementAccordeon = Relay.createContainer(OrderManagementAccordeonSub, {
    fragments: {
        view: () => Relay.QL`
            fragment on view {
                me {
                    baskets {
                        id
                        date_updated
                        review_status
                        sapak_remarks
                        items_in_basket{
                            id
                            Amount
                            remarks
                            item{
                                id
                                name
                                price_in_agorot
                                small_image{
                                id
                                }
                                
                            }
                        }
                        sapak {
                            name
                            small_image_id
                        }
                    }
                    role_type
                    role_restaurant {
                        is_company
                        name
                        company_name
                        company_num
                        street_address
                    }
                }
                chains(first: 100) {
                    edges {
                        node {
                            ... on chain {
                                id
                                name
                                small_image {
                                    id
                                }
                            }
                        }
                    }
                }
            }`,
    },
});



export default OrderManagementAccordeon
