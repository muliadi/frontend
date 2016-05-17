/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';

import joinRestaurantToChainMutation from '../mutations/joinRestaurantToChain.js'
import ReviewBasketMutation from '../mutations/reviewBasket.js'
import SapakOrderManagementAccordeon from './SapakOrderManagementAccordeon.js'

import CommRound from './commRound.js'

class SapakLandingSub extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            communicating: {},
            remarks: {}
        }
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
    handleRemarksChange(key, remarks) {
        //console.log(key)
        const myremarks = JSON.parse(JSON.stringify(this.state.remarks));
        myremarks[key] = remarks 
        this.setState({
            remarks: myremarks,
        })    
        //console.log(myremarks)    
    }
    handleReviewBasketMutation(basketID, reviewStatus, reviewComment, key) {
        console.log(reviewComment)
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
        
        const style_grid = {
            top: "0px",
            bottom: "0px",
            marginBottom:"0px",
            marginTop:"20px",
        }
        
         const listbox_style = {
            margin: "0px",
            padding:   "0px",
            //display: "flex",
            //direction:"ltr",
            overflow:"auto",
            overflowX:"hidden",
            width: "100%",
            //flexGrow: "1",            
            wordWrap: "break-word",
            //wordBreak: "break-all",

        }
        const list_style ={
            margin: "0px",
            padding: "0px",
            //display: "table-row",
            //background: "#fff",
            width: "100%",
        }
        const sapak_style = {
             width: "35px",
            height: "35px",
            marginLeft:"10px",
            
        } 
        const style_AccordionHeader = {
            marginTop:"auto",
            marginBottom:"auto",
            marginLeft: "22px",
            marginRight:"22px",
            color: "#ffffff"
            }
        return (
             <div className="mdl-grid" style={style_grid}> 
            <div className="mdl-cell mdl-cell--1-col-desktop mdl-cell--1-col-tablet mdl-cell--1-col-phone">
                </div>
                <div className="mdl-cell mdl-cell--10-col-desktop mdl-cell--8-col-tablet mdl-cell--4-col-phone">
            
            <div style={{display:"flex",background: "rgba(78,176,82,0.8)"}}>
              <i className="material-icons" style = {style_AccordionHeader}>query_builder</i>
              <h2w>הזמנות ממתינות לאישור הספק</h2w>
               
              </div>
              <SapakOrderManagementAccordeon 
                    view = {this.props.view}
                   baskets = {this.props.view.me.role_sapak.baskets}
                   review_status = "WithSapak"/>
            
            <div style={{display:"flex",background: "rgba(78,176,82,0.8)"}}>
              <i className="material-icons" style = {style_AccordionHeader}>done</i>
              <h2w>הזמנות שאושרו</h2w>
                </div>
                    <SapakOrderManagementAccordeon
                    view = {this.props.view} 
                   baskets = {this.props.view.me.role_sapak.baskets}
                   review_status = "Approved"/>
                   
                <div style={{display:"flex",background: "rgba(78,176,82,0.8)"}}>
                <i className="material-icons" style = {style_AccordionHeader}>not_interested</i>
                <h2w>הזמנות שנדחו</h2w>
                    </div>
                        <SapakOrderManagementAccordeon
                        view = {this.props.view} 
                    baskets = {this.props.view.me.role_sapak.baskets}
                    review_status = "Rejected"/>
            
             <div style={{display:"flex",background: "rgba(78,176,82,0.8)"}}>
                <i className="material-icons" style = {style_AccordionHeader}>not_interested</i>
                <h2w>רשימת המסעדות המחכות לאישור הצטרפות לרשת</h2w>
                    
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
            </div>
             <div className="mdl-cell mdl-cell--1-col-desktop mdl-cell--1-col-tablet mdl-cell--1-col-phone">
                </div>
            </div>
        );
    }
}




const SapakLanding = Relay.createContainer(SapakLandingSub, {
    fragments: {
        view: () => Relay.QL`
            fragment on view {
                ${SapakOrderManagementAccordeon.getFragment('view')},
                me {
                    role_type
                    role_sapak {
                        baskets {
                            restaurant {
                                    name
                            }
                            id
                            date_updated
                            review_status
                            items_in_basket{
                                Amount
                                remarks
                                item{
                                    id
                                    name
                                    price_in_agorot
                                    small_image{
                                    id
                                    }
                                    
                                }
                            }
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

