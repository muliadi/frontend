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
            <ul className="mdl-list" style={style_list}>                
                {
                    this.props.view.current_items_in_baskets.edges.map((item, i) => {
                        return <li key={i} className="mdl-list__item" style={style_list_item}>
                                {item.node.item.name}
                            </li>
                    })
                }
            </ul>
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
