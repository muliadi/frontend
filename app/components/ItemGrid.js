/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';

import ItemCard from './ItemCard.js'
import ItemCreateCard from './ItemCreateCard.js'

// TODO: get items in basket only when user is logged as rest. It used to be this way but there was a bug, amount of items in basket not updating in item card  
// TODO: bug for items in basket has an ugly solution!
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
            // show_num_in_basket: this.props.view.me.role_type=="Restaurant",
        });
    }
    componentWillReceiveProps(nextProps) {
         const newVars = {show: true}
         var set = false;
         if (('maxPriceInAgorot' in nextProps)&&(!nextProps.maxPriceInAgorot.equals(this.props.maxPriceInAgorot))) {
            newVars.maxPriceInAgorot = nextProps.maxPriceInAgorot;
            set = true;
         }
         if (('minPriceInAgorot' in nextProps)&&(!nextProps.minPriceInAgorot.equals(this.props.minPriceInAgorot))) {
            newVars.minPriceInAgorot = nextProps.minPriceInAgorot
            set = true;
         }
         if (('includeCategories' in nextProps)&&(!nextProps.includeCategories.equals(this.props.includeCategories))) {
            newVars.includeCategories = nextProps.includeCategories;
            set = true;
         }
         if (('excludeCategories' in nextProps)&&(!nextProps.excludeCategories.equals(this.props.excludeCategories))) {
            newVars.excludeCategories = nextProps.props.excludeCategories;
            set = true;
         }
         if (('includeVendors' in nextProps)&&(!nextProps.includeVendors.equals(this.props.includeVendors))) {
            newVars.includeVendors = nextProps.includeVendors;
            set = true;
         }
         if (('excludeVendors' in nextProps)&&(!nextProps.excludeVendors.equals(this.props.excludeVendors))) {
            newVars.excludeVendors = nextProps.excludeVendors
            set = true;
         }
         if (('includePackagings' in nextProps)&&(!nextProps.includePackagings.equals(this.props.includePackagings))) {
            newVars.includePackagings = nextProps.includePackagings
            set = true;
         }
         if (('excludePackagings' in nextProps)&&(!nextProps.excludePackagings.equals(this.props.excludePackagings))) {
            newVars.excludePackagings = nextProps.excludePackagings                
            set = true;
         }
         if (set) {
             console.log("setting new variables!")
             console.log(newVars)
            this.props.relay.setVariables(newVars);
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
        
        // sort weighted_categories:
        var categories = this.props.view.weighted_categories.categories.splice(0);
        var weights = this.props.view.weighted_categories.weights.splice(0);
        const sortedCategories = weights.map((e,i)=>(i))
                        .sort((a,b)=>(weights[b] - weights[a]))
                        .map((e)=>(categories[e]));
        const sortedWeights = weights.sort((a,b)=>(b-a)); 
            
        const style_select_category = {
            cursor: "pointer",
            color: "white",
            background: "black",
            borderRadius:"6px",
            paddingLeft:"5px",
            paddingRight:"5px",
            paddingBottom:"2px",
        }                                                
        return (
            <div>
                <div style={{paddingTop:"20px", paddingRight:"20px", display:"flex", flexDirection:"row"}}>
                בחר קטגוריות לסינון: 
                {
                    sortedCategories.map((category, i) => {
                        return <div key={"_"+i} style={{marginRight:"10px"}}>
                                <span style={style_select_category} onClick={()=>{document.location.hash += "/include_category_"+category.id}}>{category.full_name}</span>
                            </div>
                    })                    
                }
                </div>
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
                                            packagingName={item.node.packaging.name}
                                            vendor_image_id={item.node.vendor.small_image.id}
                                            itemID={item.node.id}
                                            amount_in_basket={amount_in_basket[item.node.id]}
                                            amount={item.node.amount}
                                            shortDesc = {item.node.short_desc}>
                                        </ItemCard>
                                    </div>
                                    :
                                    null
                            })
                        :
                            null
                    }
                </div>
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
                weighted_categories(
                        maxPriceInAgorot: $maxPriceInAgorot,
                        minPriceInAgorot: $minPriceInAgorot,
                        includeCategoriesID: $includeCategories,
                        excludeCategoriesID: $excludeCategories,
                        includeVendorsID: $includeVendors,
                        excludeVendorsID: $excludeVendors,
                        includePackagingsID: $includePackagings,
                        excludePackagingsID: $excludePackagings,                    
                ) {
                    categories {
                        id
                        full_name
                    }
                    weights
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
                                short_desc
                                packaging{
                                    name
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
