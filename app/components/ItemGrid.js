/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';

import ItemCard from './ItemCard.js'
import ItemCreateCard from './ItemCreateCard.js'

class ItemGridSub extends React.Component {
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
        return (
            <div className="mdl-grid" style={style_grid}>                
                {
                    this.props.view.items.edges.map((item, i) => {
                        return <div key={i} className="mdl-cell mdl-cell--3-col-desktop mdl-cell--4-col-tablet mdl-cell--4-col-phone" style={style_cell}>
                                <ItemCard
                                    is_logged={this.props.view.me.is_logged}
                                    name={item.node.name}
                                    price={item.node.price_in_agorot/100}
                                    image_id={item.node.small_image.id}
                                    unitsName={item.node.units.name}
                                    vendor_image_id={item.node.vendor.small_image.id}
                                    itemID={item.node.id}
                                    amount={item.node.amount}>
                                </ItemCard>
                            </div>
                    })
                }
            </div>
        );
    }
}

const ItemGrid = Relay.createContainer(ItemGridSub, {
    fragments: {
        view: () => Relay.QL`
            fragment on view {
                me {
                    is_logged
                }
                items(first: 30) {
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
