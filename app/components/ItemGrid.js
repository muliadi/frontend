/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';

import ItemCard from './ItemCard.js'
import ItemCreateCard from './ItemCreateCard.js'

// TODO: get items in basket only when user is logged as rest. It used to be this way but there was a bug, amount of items in basket not updating in item card  

class ItemGridSub extends React.Component {
   componentWillMount() {
        this.props.relay.setVariables({
            maxPriceInAgorot: this.props.maxPriceInAgorot,
            minPriceInAgorot: this.props.minPriceInAgorot,
            includeCategories: this.props.includeCategories,
            excludeCategories: this.props.excludeCategories,
            includeVendors: this.props.includeVendors,
            excludeVendors: this.props.excludeVendors,
            includePackagings: this.props.includePackagings,
            excludePackagings: this.props.excludePackagings,
            show: true,
            show_num_in_basket: this.props.view.me.role_type=="Restaurant",
        });
    }
    componentWillReceiveProps(nextProps) {
        if (
            (!nextProps.maxPriceInAgorot.equals(this.props.maxPriceInAgorot)) ||
            (!nextProps.minPriceInAgorot.equals(this.props.minPriceInAgorot)) ||
            (!nextProps.includeCategories.equals(this.props.includeCategories)) ||
            (!nextProps.excludeCategories.equals(this.props.excludeCategories)) ||
            (!nextProps.includeVendors.equals(this.props.includeVendors)) ||
            (!nextProps.excludeVendors.equals(this.props.excludeVendors)) ||
            (!nextProps.includePackagings.equals(this.props.includePackagings)) ||
            (!nextProps.excludePackagings.equals(this.props.excludePackagings)) ||
            (nextProps.view.me.role_type != this.props.view.me.role_type)
            ) {
            this.props.relay.setVariables({
                maxPriceInAgorot: nextProps.maxPriceInAgorot,
                minPriceInAgorot: nextProps.minPriceInAgorot,
                includeCategories: nextProps.includeCategories,
                excludeCategories: nextProps.props.excludeCategories,
                includeVendors: nextProps.includeVendors,
                excludeVendors: nextProps.excludeVendors,
                includePackagings: nextProps.includePackagings,
                excludePackagings: nextProps.excludePackagings,                
                show: true,
                show_num_in_basket: this.props.view.me.role_type=="Restaurant",
            });
        }
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
        // if (`current_items_in_baskets` in this.props.view) {
            this.props.view.current_items_in_baskets.edges.map((itemInBasket)=>{
                amount_in_basket[itemInBasket.node.itemID] = itemInBasket.node.Amount;
            })            
        // }
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
        maxPriceInAgorot: [],
        minPriceInAgorot: [],
        includeCategories: [],
        excludeCategories: [],
        includeVendors: [],
        excludeVendors: [],
        includePackagings: [],
        excludePackagings: [],
        show: false,
        show_num_in_basket: false,
    },
    fragments: {
        view: () => Relay.QL`
            fragment on view {
                me {
                    role_type
                }
                current_items_in_baskets(first: 100) {
                    edges {
                        node {
                            ... on item_in_basket {
                              Amount
                              itemID
                            }
                        }
                    }
                }
                items(first: 30,
                        maxPriceInAgorot: $maxPriceInAgorot,
                        minPriceInAgorot: $minPriceInAgorot,
                        includeCategoriesID: $includeCategories,
                        excludeCategoriesID: $excludeCategories,
                        includeVendorsID: $includeVendors,
                        excludeVendorsID: $excludeVendors,
                        includePackagingsID: $includePackagings,
                        excludePackagingsID: $excludePackagings,
                    ) @include(if: $show) {
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
