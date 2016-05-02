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
                <div className="mdl-cell mdl-cell--3-col" style={{background:"green"}}>
                </div>            
                <div className="mdl-cell mdl-cell--9-col">
                    <div className="mdl-grid" style={style_grid}>                
                        {
                            this.props.view.items.edges.map((item, i) => {
                                return items.price < 0 ? nil :
                                    <div key={i} className="mdl-cell mdl-cell--3-col-desktop mdl-cell--4-col-tablet mdl-cell--4-col-phone" style={style_cell}>
                                        <ItemCard
                                            name={item.node.name}
                                            price={item.node.price_in_agorot/100}
                                            image_id={item.node.small_image.id}
                                            unitsName={item.node.units.name}
                                            vendor_image_id={item.node.vendor.small_image.id}
                                            amount={item.node.amount}>
                                        </ItemCard>
                                    </div>
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const ItemGrid = Relay.createContainer(ItemGridSub, {
    fragments: {
        view: () => Relay.QL`
            fragment on view {
                items(first: 30) {
                    edges{
                        node {
                            ... on item {
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
