/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';

import ItemCard from './ItemCard.js'
import ItemCreateCard from './ItemCreateCard.js'

class ItemGridSub extends React.Component {
   constructor(props) {
        super(props)
        this.props.relay.setVariables({
            show: true,
            show_num_in_basket: this.props.view.me.role_type=="Restaurant",
        });
    }
    componentWillReceiveProps(nextProps) {
        this.props.relay.setVariables({
            parentCategoryID: nextProps.category
        });
    }
    componentDidMount() {
        componentHandler.upgradeDom();
    }
    render() {
        const style_grid = {
        };
        const style_cell = {
            marginLeft: "auto",
            marginRight: "auto",
        };
        
        if (!('items' in this.props.view)) {
            return (<div />);
        }
        
        const amount_in_basket = {}
        this.props.view.items.edges.map((item)=>{
            amount_in_basket[item.node.id] = 0;
        })
        if (`current_items_in_baskets` in this.props.view) {
            this.props.view.current_items_in_baskets.edges.map((itemInBasket)=>{
                amount_in_basket[itemInBasket.node.itemID] = itemInBasket.node.Amount;
            })            
        }
        return (
            <div className="mdl-grid" style={style_grid}>
                {
                    'items' in this.props.view ?
                        this.props.view.items.edges.map((item, i) => {
                            return item.node.small_image.id != "0" ?
                                <div key={i} className="mdl-cell mdl-cell--3-col-desktop mdl-cell--4-col-tablet mdl-cell--4-col-phone" style={style_cell}>
                                    <ItemCard
                                        role_type={this.props.view.me.role_type}
                                        name={item.node.name}
                                        price={item.node.price_in_agorot/100}
                                        image_id={item.node.small_image.id}
                                        unitsName={item.node.units.name}
                                        vendor_image_id={item.node.vendor.small_image.id}
                                        itemID={item.node.id}
                                        amount_in_basket={amount_in_basket[item.node.id]}
                                        amount={item.node.amount}>
                                    </ItemCard>
                                </div>
                                :
                                null
                        })
                    :
                        null
                }
            </div>
        );
    }
}

const ItemGrid = Relay.createContainer(ItemGridSub, {
    initialVariables: {
        show: false,
        show_num_in_basket: false,
    },
    fragments: {
        view: () => Relay.QL`
            fragment on view {
                me {
                    role_type
                }
                current_items_in_baskets(first: 100) @include(if: $show_num_in_basket) {
                    edges {
                        node {
                            ... on item_in_basket {
                              Amount
                              itemID
                            }
                        }
                    }
                }
                items(first: 30) @include(if: $show) {
                    edges{
                        node {
                            ... on item {
                                id
                                name
                                amount
                                price_in_agorot
                                small_image {
                                    id
                                }
                                units {
                                    name
                                }
                                vendor {
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

export default ItemGrid
