/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';

import SapakCard from './SapakCard.js'
import SapakCreateCard from './SapakCreateCard.js'

class SapakGridSub extends React.Component {
    componentWillMount() {
        this.props.relay.setVariables({show: true});
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
        return (
            <div className="mdl-grid" style={style_grid}>
                {
                    'sapakim' in this.props.view ?                    
                        this.props.view.sapakim.edges.map((sapak, i) => {
                            return <div key={i} className="mdl-cell mdl-cell--3-col-desktop mdl-cell--4-col-tablet mdl-cell--4-col-phone" style={style_cell}>
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
                    :
                        null
                }
            </div>
        );
    }
}

const SapakGrid = Relay.createContainer(SapakGridSub, {
    initialVariables: {
        show: false,
    },
    fragments: {
        view: () => Relay.QL`
            fragment on view {
                sapakim(first:30) @include(if: $show) {
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
