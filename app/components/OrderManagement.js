/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';
import { Accordion, AccordionItem } from 'react-sanfona';
import OrderManagementListItem from './OrderManagementListItem.js'
import RestaurantCreateCard from './RestaurantCreateCard.js'

import OrderManagementAccordeon from './OrderManagementAccordeon.js'


class OrderManagementSub extends React.Component {
    componentDidMount() {
        componentHandler.upgradeDom();
    } 
    
    PretyfiDate(date){
        var formDate = date.slice(8, 10)+"/"+date.slice(5, 7)+"/"+date.slice(0, 4);
        return formDate;
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.forceFetch) {
            this.props.relay.forceFetch()
        }        
    }

 PretyfiBsketStatus(status)
 {
     switch (status) {
          case "WithSapak":     
            return <span className="mdl-list__item-primary-content" style={{ textAlign:"right", marginRight:"5px", marginLeft:"5px"}}>
                        <i className="material-icons mdl-list__item-icon">query_builder</i>
                    </span>;
          case "WithUser":      
            return <span className="mdl-list__item-primary-content" style={{textAlign:"right", marginRight:"5px", marginLeft:"5px"}}>
                        <i className="material-icons mdl-list__item-icon">shopping_cart</i>
                    </span>;
          case "Approved":      
            return <span className="mdl-list__item-primary-content" style={{ textAlign:"right", marginRight:"5px", marginLeft:"5px"}}> 
                        <i className="material-icons mdl-list__item-icon">done</i>
                    </span>;
          case "Rejected":      
            return  <span className="mdl-list__item-primary-content" style={{ textAlign:"right", marginRight:"5px", marginLeft:"5px"}}>
                        <i className="material-icons mdl-list__item-icon">not_interested</i>
                    </span>;
          default:      return <i className="material-icons mdl-list__item-icon">shopping_cart</i>;;
        }
    
 }
 
 getWithSapakBaskets(baskets){
    baskets.filtermap((basket) => {
        return basket.review_status == "WithSapak"
    })
 }

    
    render() {
        const style_grid = {
            top: "0px",
            bottom: "0px",
            marginBottom:"0px",
            marginTop:"20px",
        }
        
         const listbox_style = {
            margin: "0px",
            padding:   "0px",
            //display: "flex",
            //direction:"ltr",
            overflow:"auto",
            overflowX:"hidden",
            width: "100%",
            //flexGrow: "1",            
            wordWrap: "break-word",
            //wordBreak: "break-all",

        }
        const list_style ={
            margin: "0px",
            padding: "0px",
            //display: "table-row",
            //background: "#fff",
            width: "100%",
        }
        const sapak_style = {
             width: "35px",
            height: "35px",
            marginLeft:"10px",
            
        }
        
        return (
            <div className="mdl-grid" style={style_grid}>        
                <div className="mdl-cell mdl-cell--1-col-desktop mdl-cell--1-col-tablet mdl-cell--1-col-phone">
                </div>
                <div className="mdl-cell mdl-cell--10-col-desktop mdl-cell--8-col-tablet mdl-cell--4-col-phone">
              
              <div style={listbox_style}>
              <div style={{display:"flex",background: "rgb(237,247,238)"}}>
              <i className="material-icons" style = {{marginTop:"auto", marginBottom:"auto", marginLeft: "30px", marginRight:"30px"}}>query_builder</i>
              <h2>הזמנות ממתינות לאישור הספק</h2>
               
              </div>
                    <OrderManagementAccordeon
                    view = {this.props.view} 
                   baskets = {this.props.view.me.baskets}
                   review_status = "WithSapak"/>
                    
            <div style={{display:"flex",background: "rgb(237,247,238)"}}>
              <i className="material-icons" style = {{marginTop:"auto", marginBottom:"auto", marginLeft: "30px", marginRight:"30px"}}>done</i>
              <h2>הזמנות שאושרו</h2>
                </div>
                    <OrderManagementAccordeon 
                    view = {this.props.view} 
                   baskets = {this.props.view.me.baskets}
                   review_status = "Approved"/>
                    
                    <div style={{display:"flex",background: "rgb(237,247,238)"}}>
              <i className="material-icons" style = {{marginTop:"auto", marginBottom:"auto", marginLeft: "30px", marginRight:"30px"}}>not_interested</i>
              <h2>הזמנות שנדחו</h2>
                </div>
                
                   <OrderManagementAccordeon 
                    view = {this.props.view} 
                   baskets = {this.props.view.me.baskets}
                   
                   review_status = "Rejected"/>
                </div>
                  
                   
                </div>
                <div className="mdl-cell mdl-cell--1-col-desktop mdl-cell--1-col-tablet mdl-cell--1-col-phone">
                </div>
            </div>
        );
    }
}

// TODO: optimize fetches with the `show` variable
const OrderManagement = Relay.createContainer(OrderManagementSub, {
    fragments: {
        view: () => Relay.QL`
            fragment on view {
                ${OrderManagementAccordeon.getFragment('view')},
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

export default OrderManagement
