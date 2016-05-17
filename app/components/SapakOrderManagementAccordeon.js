/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';
import { Accordion, AccordionItem } from 'react-sanfona';
import SapakOrderManagementListItem from './SapakOrderManagementListItem.js'
import ItemInBasketForAccordion from './ItemInBasketForAccordion.js';

class SapakOrderManagementAccordeonSub extends React.Component {
    
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
                        <AccordionItem title={<SapakOrderManagementListItem key = {x} basket={basket}/>} slug={x} key={x}>
                            
                            <div style={listbox_style}>
                    <ul className="mdl-list" style={list_style}>
                        {                            
                            basket.items_in_basket.map((item, i) => {
                               //console.log(item);
                                return <ItemInBasketForAccordion 
                                key={i} 
                                myKey={i}
                                item={item} 
                                onOpen = {NoteOpened} 
                                onClose = {NoteClosed}
                                isNoteOpen ={this.state.openItemKeyAccordion == i}/>
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

const SapakOrderManagementAccordeon = Relay.createContainer(SapakOrderManagementAccordeonSub, {
    fragments: {
        view: () => Relay.QL`
            fragment on view {
                me {
                    baskets {
                        id
                        date_updated
                        review_status
                        items_in_basket{
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



export default SapakOrderManagementAccordeon
