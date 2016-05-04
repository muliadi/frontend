/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';

class ItemsInBasketListSub extends React.Component {
    componentDidMount() {
        componentHandler.upgradeDom();
    } 
    render() {
        const style_list = {
        };
        const style_list_item = {
            marginLeft: "auto",
            marginRight: "auto",
        };        
        return (
            <div>
                <div>
                    <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--5-col-desktop mdl-cell--5-col-tablet mdl-cell--4-col-phone">
                            <h6>  סל הקניות שלי</h6>
                        </div>
                            <div className="mdl-cell mdl-cell--5-col-desktop mdl-cell--5-col-tablet mdl-cell--4-col-phone">
                            <button className="mdl-button mdl-js-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" style={{ marginRight:"0px",  maxHeight: "25px", lineHeight:"11px", fontSize:"12px"}}>נקה סל
                                <i className="material-icons">delete_forever</i>
                            </button>
                        </div>
                        
                        <div className="mdl-cell mdl-cell--2-col-desktop mdl-cell--2-col-tablet mdl-cell--2-col-phone" >
                            <img src="/static/shopping-cart.png" alt="Shopping Cart" style={{height:"30px"}}></img>
                        </div> 
                                                        
                    </div>
                </div> 
                <ul className="mdl-list" style={style_list}>                
                    {
                        this.props.view.current_items_in_baskets.edges.map((item, i) => {
                            return <li key={i} className="mdl-list__item" style={style_list_item}>
                                    {item.node.item.name}
                                </li>
                        })
                    }
                </ul>
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
                                item {
                                    name
                                }
                            }
                        }
                    }
                }
            }`,
    },
});

export default ItemsInBasketList
