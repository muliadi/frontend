/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';

class ItemsInBasketListSub extends React.Component {
    componentDidMount() {
        componentHandler.upgradeDom();
    } 
    render() {
        
        const table_style = {
            tableLayout:"fixed",
            width:"100%",
            
            border:"1px solid rgba(78,176,82,0.3)",
            wordWrap:"break-word",
            wordBreak: "break-all",
            
            }
        const style_list = {
            padding: "1px",
            WebkitMarginBefore: "1px",
        };
        const dt_small = {
            padding: "1px",
            WebkitMarginBefore: "1px",
            width:"33px"
        };
        const th_item = {
            padding: "1px",
            WebkitMarginBefore: "1px",
            fontSize: "16px",
            verticalAlign: "middle"
        };
         const th_price = {
            padding: "1px",
            WebkitMarginBefore: "1px",
            width:"43px",
            fontSize: "16px",
            verticalAlign: "middle"
        };
        
        const th_amount = {
            padding: "1px",
            WebkitMarginBefore: "1px",
            width:"43px",
            fontSize: "16px",
            verticalAlign: "middle"
        };
        const th_pic = {
            padding: "1px",
            WebkitMarginBefore: "1px",
            width:"60px"
        };
        const style_list_item = {
            marginLeft: "auto",
            marginRight: "auto",
            padding: "1px",
            
        };        
        return (
            <div className="ItemsBasket" style={{background:"#FFF", margin:"0px 4px 0px 4px"}}>
                <div>

                <div className="mdl-grid" style={{border:"2px solid rgba(78,176,82,0.3)", background:"rgba(78,176,82,0.1)"}}>
                                  
                                      
                                        <div className="mdl-cell mdl-cell--5-col-desktop mdl-cell--5-col-tablet mdl-cell--4-col-phone" style={{fontSize:"16px", color:"rgba(0,0,0,.54)", lineHeight:"25px"}}>
                                            סל הקניות שלי
                                        </div>
                                         <div className="mdl-cell mdl-cell--5-col-desktop mdl-cell--5-col-tablet mdl-cell--4-col-phone">
                                            <button className="mdl-button mdl-js-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" style={{ marginRight:"0px",  maxHeight: "25px", lineHeight:"11px", fontSize:"12px"}}>נקה סל
                                                <i className="material-icons">delete_forever</i>
                                            </button>
                                        </div>
                                        
                                        <div className="mdl-cell mdl-cell--2-col-desktop mdl-cell--2-col-tablet mdl-cell--2-col-phone" >
                                          <img src="/static/shopping-cart.png" alt="Shopping Cart" style={{height:"30px",marginTop:"-3px",position:"absolute"}}></img> 
                                        </div> 
                                                                
                                </div>
                               
                    
                    
                
                    

                   

                </div> 
              <table className="mdl-data-table mdl-js-data-table  mdl-shadow--2dp " style={table_style} >
                            <thead style={style_list}>
                                <tr>
                                <th className="mdl-data-table__cell--non-numeric" style={th_pic}></th>
                                <th className="mdl-data-table__cell--non-numeric " style={th_item}>מוצר</th>
                                <th style={th_amount}>קמות</th>
                                <th style={th_price}>מחיר</th>
                                <th className="mdl-data-table__cell--non-numeric" style={dt_small}></th>
                                </tr>
                            </thead>   
                             <tbody>              
                    {
                        this.props.view.current_items_in_baskets.edges.map((item, i) => {
                            return <tr key={i} style={style_list}>
                                    <td style={style_list}>
                                    
                                        <img src={"/static/content/"+item.node.item.small_image.id} alt="Shopping Cart" style={{width:"50px",marginTop:"-0px"}}></img> 
                                    </td>
                                    <td className="mdl-data-table__cell--non-numeric control-width" style={style_list}>
                                    <div style={{wordWrap:"break-word", width: "5em"}}>
                                       {item.node.item.name} 
                                        </div></td>
                                    <td style={style_list}>{item.node.Amount}</td>
                                    <td style={style_list}>{item.node.item.price_in_agorot/100} &#8362;</td>
                                    <td style={dt_small}>
                                        <button className="mdl-button mdl-js-button mdl-button--icon">
                                                <i className="material-icons">delete</i>
                                        </button></td>
                                    </tr>
                                
                           
                        })
                    }
                             </tbody>
                            </table>
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
