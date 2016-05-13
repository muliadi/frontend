/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';

class SapakLandingSub extends React.Component {
    render() {
        return (
            <div>
                Hello {this.props.view.me.full_name}!
            </div>
        );
    }
}

const SapakLanding = Relay.createContainer(SapakLandingSub, {
    fragments: {
        view: () => Relay.QL`
            fragment on view {
                me {
                    role_type
                    full_name
                    get_restaurants_pending_chain_join_from_all_chains(first: 30) {
                        edges {
                            node {
                                ... on restaurant {
                                    name
                                    chain {
                                        name
                                    }                                    
                                }
                            }
                        }                        
                    }
                }
            }`,
    },
});

export default SapakLanding

