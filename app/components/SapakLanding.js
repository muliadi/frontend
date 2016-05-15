/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';

import joinRestaurantToChainMutation from '../mutations/joinRestaurantToChain.js'
import ReviewBasketMutation from '../mutations/reviewBasket.js'


import CommRound from './commRound.js'

class SapakLandingSub extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            communicating: {},
            remarks: {}
        }
    }
    componentWillMount() {
        this.props.relay.setVariables({
            show: true,
        });        
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.forceFetch) {
            this.props.relay.forceFetch()
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
    
    handleReviewBasketMutation(basketID, reviewStatus, reviewComment, key) {
        const mycomm = JSON.parse(JSON.stringify(this.state.communicating));
        mycomm[key] = true 
        this.setState({
            communicating: mycomm,
        })
        Relay.Store.commitUpdate(new ReviewBasketMutation({
            basketID: basketID,
            reviewStatus: reviewStatus,
            reviewComment: reviewComment,
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
                    console.log('basket successfuly reviewed!')
                    const mycomm = JSON.parse(JSON.stringify(this.state.communicating));
                    mycomm[key] = false
                    this.setState({
                        communicating: mycomm
                    })
                },
            });
    }

    render() {
        if (!('me' in this.props.view)) {
            return (
                <div/>
            )
        }
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
                <h5>רשימת הסלים המחכים לאישור:</h5>
                {
                    this.props.view.me.role_sapak.baskets.map((basket, i)=>{
                        return <div key={i}>
                            <h6>{basket.creator.full_name}</h6>
                            
                            <button
                                className="mdl-button mdl-js-button mdl-button--raised"
                                onClick={()=>{this.handleReviewBasketMutation.bind(this)(basket.id, "Approved", "just testing this comment, please change me!", "abc"+i)}}
                                style={{marginRight: "15px"}}>
                                אשר
                            </button>                                
                            
                            <button
                                className="mdl-button mdl-js-button mdl-button--raised"
                                onClick={()=>{this.handleReviewBasketMutation.bind(this)(basket.id, "Rejected", "just testing this comment, please change me!", "abcd"+i)}}
                                style={{marginRight: "15px"}}>
                                דחה
                            </button>                                
                            {
                                basket.items_in_basket.map((item, i)=>{
                                    return <div key={"abcde"+i}>
                                        {item.item.name} x {item.Amount} x {item.item.price_in_agorot} 
                                    </div>
                                })
                            }
                        </div>
                    })
                }                
            </div>
        );
    }
}

const SapakLanding = Relay.createContainer(SapakLandingSub, {
    initialVariables: {
        show: false,
    },    
    fragments: {
        view: () => Relay.QL`
            fragment on view {
                me @include(if: $show) {
                    role_type
                    role_sapak {
                        baskets(review_status: WithSapak) {
                            id
                            creator {
                                full_name
                            }
                            items_in_basket {
                                Amount
                                item {
                                    name
                                    price_in_agorot
                                }
                            }
                        }
                    }
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

