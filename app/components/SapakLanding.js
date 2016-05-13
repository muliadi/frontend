/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';

import joinRestaurantToChainMutation from '../mutations/joinRestaurantToChain.js'

import CommRound from './commRound.js'

class SapakLandingSub extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            communicating: {}
        }
    }
    componentDidMount() {
        componentHandler.upgradeDom();
    }    
    componentDidUpdate() {
        componentHandler.upgradeDom();
    }    
    handleJoinRestaurantToChainMutation(restaurantID, key) {
        const mycomm = JSON.parse(JSON.stringify(this.state.communicating));
        mycomm[key] = true 
        this.setState({
            communicating: mycomm,
        })
        Relay.Store.commitUpdate(new joinRestaurantToChainMutation({
            restaurantID: restaurantID,
        }),
            {
                onFailure: (e) => {
                    console.log(e.getError())
                    const mycomm = JSON.parse(JSON.stringify(this.state.communicating));
                    mycomm[key] = false
                    this.setState({
                        communicating: mycomm
                    })
                },
                onSuccess: () => {
                    console.log('restaurant successfuly joined chain!')
                    const mycomm = JSON.parse(JSON.stringify(this.state.communicating));
                    mycomm[key] = false
                    this.setState({
                        communicating: mycomm
                    })
                },
            });
    }
    
    render() {
        console.log(this.props.view.me.get_restaurants_pending_chain_join_from_all_chains)
        return (
            <div style={{margin:"25px"}}>
                <h5>רשימת המסעדות המחכות לאישור הצטרפות לרשת:</h5>
                {
                    this.props.view.me.get_restaurants_pending_chain_join_from_all_chains.edges.map((edge, i)=>{
                        return <div>
                            {edge.node.name} מבקש להצטרף ל {edge.node.chain.name}
                            {
                                this.state.communicating[i] ?
                                    <commRound style={{marginRight: "15px"}}/>
                                :
                                    <button
                                        className="mdl-button mdl-js-button mdl-button--raised"
                                        onClick={()=>{this.handleJoinRestaurantToChainMutation.bind(this)(edge.node.id, i)}}
                                        style={{marginRight: "15px"}}>
                                        אשר הצטרפות
                                    </button>                                
                            }
                        </div>
                    })
                }                
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
                                    id
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

