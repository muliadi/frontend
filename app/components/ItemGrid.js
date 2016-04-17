/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';

import ItemCard from './ItemCard.js'
import ItemCreateCard from './ItemCreateCard.js'

class ItemGridSub extends React.Component {
    render() {
        const style_grid = {
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "1400px"
        };
        const style_cell = {
            marginLeft: "auto",
            marginRight: "auto",
        };        
        return (
            <div className="mdl-grid" style={style_grid}>
                {
                    this.props.view.items.edges.map(item => {
                        return <div className="mdl-cell mdl-cell--3-col-desktop mdl-cell--4-col-tablet mdl-cell--4-col-phone" style={style_cell}>
                            <ItemCard
                                name={item.node.name}
                                short_desc={item.node.short_desc}
                                image_id={item.node.small_image.id}>
                            </ItemCard>
                        </div>
                    })
                }
                <ItemCreateCard></ItemCreateCard>
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
                                short_desc
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

export default ItemGrid
