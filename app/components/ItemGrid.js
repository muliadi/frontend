/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';

import ItemCard from './ItemCard.js'
import ItemCreateCard from './ItemCreateCard.js'

// TODO: get items in basket only when user is logged as rest. It used to be this way but there was a bug, amount of items in basket not updating in item card  
// TODO: bug for items in basket has an ugly solution!
class ItemGridSub extends React.Component {
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
            this.props.relay.setVariables(newVars);
         }
    }
    componentDidMount() {
        componentHandler.upgradeDom();
    }
    cpmponentDidUpdate() {
        this.props.relay.setVariables(newVars);        
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
        this.props.view.current_items_in_baskets.edges.map((itemInBasket)=>{
            amount_in_basket[itemInBasket.node.itemID] = itemInBasket.node.Amount;
        })            
        
        // sort filtering data
        // inserting categories AND vendors in the same interface        
        const categories = this.props.view.weighted_filtering_data.categories.map((c)=>({filtering_prefix:"/include_category_", data:c}));
        this.props.view.weighted_filtering_data.vendors.map((v)=>(categories.push({filtering_prefix:"/include_vendor_", data:v})));        
        var categoryWeights = this.props.view.weighted_filtering_data.category_weights.splice(0);
        categoryWeights = categoryWeights.concat(this.props.view.weighted_filtering_data.vendor_weights.splice(0))

        // TODO: sort categories in server!
        categoryWeights=[]
        if ((categoryWeights.length==0)&&(categories.length>0)) {
            // mock category weights. Failsafe for a bug
            categories.map((c,i)=>{categoryWeights.push(i)})
        }


        const sortedCategories = categoryWeights.map((e,i)=>(i))
                        .sort((a,b)=>(categoryWeights[b] - categoryWeights[a]))
                        .map((e)=>(categories[e]));
        const sortedCategoryWeights = categoryWeights.sort((a,b)=>(b-a));
        
        // make singular interface for current filtering too
        const categoriesInFilter = this.props.view.weighted_filtering_data.categories_in_filter.map((c)=>({filtering_prefix:"/include_category_", data:c}))
        this.props.view.weighted_filtering_data.vendors_in_filter.map((v)=>{categoriesInFilter.push({filtering_prefix:"/include_vendor_", data:v})})
                            
        const style_select_category = {
            cursor: "pointer",
            color: "white",
            background: "black",
            borderRadius:"6px",
            paddingLeft:"5px",
            paddingRight:"5px",
            paddingBottom:"2px",
        }   
        const style_filtering_category = {
            color: "white",
            background: "rgba(0,128,0,0.7)",
            borderRadius:"6px",
            paddingLeft:"5px",
            paddingBottom:"2px",
            marginRight:"10px",
            display: "flex",
            height:"18px",
        }   
        return (
            <div>
                {
                    categoriesInFilter.length > 0 ?
                <div style={{paddingTop:"15px", paddingRight:"20px", display:"flex", flexDirection:"row"}}>
                    <div style={{width:"150px", textAlign:"left"}}>סינון נוכחי</div> 
                    <div style={{flexWrap:"wrap", flexDirection:"row", display:"flex"}}>
                        {
                            categoriesInFilter.map((category, i) => {
                                return <div key={"_^_"+category.id} style={style_filtering_category}>
                                            <div style={{
                                                cursor: "pointer",
                                                borderRadius: "50px",
                                                marginLeft: "5px",
                                                backgroundColor: "rgba(0, 70, 0, 0.701961)",
                                                paddingRight: "5px",
                                                paddingLeft: "5px",
                                                height: "20px",
                                            }}
                                            onClick={()=>{document.location.hash = document.location.hash.replace(category.filtering_prefix+category.data.id, "")}}                                    
                                            >
                                                x
                                            </div>
                                            {category.data.full_name}
                                        </div>
                            })
                        }
                    </div>
                </div>                    
                    :
                        null
                }
                {
                    sortedCategories.length > 0 ?
                        <div style={{paddingTop:"15px", paddingRight:"20px", display:"flex", flexDirection:"row"}}>
                            <div style={{width:"150px", textAlign:"left"}}>בחר קטגוריות לסינון</div>
                            <div style={{flexWrap:"wrap", flexDirection:"row", display:"flex"}}>                     
                                {
                                    sortedCategories.map((category, i) => {
                                        if (category.filtering_prefix.indexOf("vendor")>0) {
                                            return;
                                        }
                                        return <div key={"_"+i} style={{marginRight:"10px"}}>
                                                <span
                                                    style={style_select_category}
                                                    onClick={()=>{document.location.hash += category.filtering_prefix+category.data.id}}>{category.data.full_name}
                                                </span>
                                            </div>
                                    })
                                }
                            </div>
                        </div>
                    :
                        null
                }
                <div className="mdl-grid" style={style_grid}>
                    {
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
                weighted_filtering_data(
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
                    categories_in_filter {
                        id
                        full_name
                    }
                    category_weights
                    
                    vendors {
                        id
                        full_name
                    }
                    vendors_in_filter {
                        id
                        full_name
                    }
                    vendor_weights
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
                    ) {
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
