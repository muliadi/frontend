/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';

import RestaurantCreateCard from './RestaurantCreateCard.js'


class OrderManagementSub extends React.Component {
    componentDidMount() {
        componentHandler.upgradeDom();
    } 
    
    PretyfiDate(date){
        console.log(date);
        var formDate = date.slice(8, 10)+"/"+date.slice(5, 7)+"/"+date.slice(0, 4);
        return formDate;
}

 PretyfiBsketStatus(status)
 {
     switch (status) {
          case "WithSapak":     
            return <span className="mdl-list__item-primary-content" style={{ textAlign:"right", marginRight:"5px", marginLeft:"5px"}}>
                        <i className="material-icons mdl-list__item-icon">query_builder</i>
                    ממתין לאישור
                    </span>;
          case "WithUser":      
            return <span className="mdl-list__item-primary-content" style={{textAlign:"right", marginRight:"5px", marginLeft:"5px"}}>
                    <i className="material-icons mdl-list__item-icon">shopping_cart</i>
                   לא נשלח
                    </span>;
          case "approved":      return <i className="material-icons mdl-list__item-icon">done</i>;
          case "rejected":      return <i className="material-icons mdl-list__item-icon">not_interested</i>;
          default:      return <i className="material-icons mdl-list__item-icon">shopping_cart</i>;;
        }
    
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
        
        return (
            <div className="mdl-grid" style={style_grid}>        
                <div className="mdl-cell mdl-cell--1-col-desktop mdl-cell--1-col-tablet mdl-cell--1-col-phone">
                </div>
                <div className="mdl-cell mdl-cell--10-col-desktop mdl-cell--4-col-tablet mdl-cell--4-col-phone">
                  {console.log(this.props.view)}
              <h1>ניהול הזמנות</h1>
              <div style={listbox_style}>
                    <ul className="mdl-list" style={list_style}>
                        {                            
                            
                            this.props.view.me.baskets.map((basket, i) => {
                                return  <li key={i} className="mdl-list__item basketlistItem" >
                                        <span className="mdl-list__item-primary-content" >
                                            <span className="mdl-list__item-text-body" style={{width:"100%", textAlign:"right", marginRight:"5px", marginLeft:"5px"}}> 
                                              {this.PretyfiDate(basket.date_updated)}  
                                        </span>
                                              {this.PretyfiBsketStatus(basket.review_status)} 
                                              <span className="mdl-list__item-primary-content" >
                                                    {basket.sapak.name}
                                              </span> 
                                        </span>
                                    </li>
                            })
                        }
                    </ul>
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
                me {
                    baskets {
                        id
                        date_updated
                        review_status
                        sapak {
                            name
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
