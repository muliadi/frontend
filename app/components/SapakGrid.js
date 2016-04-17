/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';

import SapakCard from './UserCard.js'
import SapakCreateCard from './SapakCreateCard.js'

class SapakGridSub extends React.Component {
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
            <div>
                <div className="mdl-grid" style={style_grid}>
                    {
                        this.props.view.sapakim.edges.map(sapak => {
                            return <div className="mdl-cell mdl-cell--3-col-desktop mdl-cell--4-col-tablet mdl-cell--4-col-phone" style={style_cell}>
                                <SapakCard
                                    name={sapak.node.name}
                                    mail={sapak.node.mail}
                                    city={sapak.node.city}
                                    shortDesc={sapak.node.short_desc}
                                    creator_img_id={sapak.node.creator.small_image.id}
                                    image_id={sapak.node.small_image.id}>
                                </SapakCard>
                            </div>
                        })

                    }
                </div>
                {this.props.view.me.is_logged ?
                    <SapakCreateCard></SapakCreateCard>
                :
                    null
                }
            </div>
        );
    }
}

const SapakGrid = Relay.createContainer(SapakGridSub, {
    fragments: {
        view: () => Relay.QL`
            fragment on view {
                me {
                    is_logged
                }
                sapakim(first:30) {
                    edges {
                        node {
                            ... on sapak {
                                name
                                City
                                mail
                                short_desc
                                small_image {
                                    id
                                }
                                creator {
                                    small_image {
                                        id
                                    }
                                }
                            }
                        }
                    }
                }      
            }
        `,
    },
});

export default SapakGrid
