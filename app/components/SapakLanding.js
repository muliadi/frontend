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
        
        return (
             <div className="mdl-grid" style={style_grid}> 
            <div className="mdl-cell mdl-cell--1-col-desktop mdl-cell--1-col-tablet mdl-cell--1-col-phone">
                </div>
                <div className="mdl-cell mdl-cell--10-col-desktop mdl-cell--8-col-tablet mdl-cell--4-col-phone">
            
            <div style={{display:"flex",background: "rgb(237,247,238)"}}>
              <i className="material-icons" style = {{marginTop:"auto", marginBottom:"auto", marginLeft: "30px", marginRight:"30px"}}>query_builder</i>
              <h2>הזמנות ממתינות לאישור הספק</h2>
               
              </div>
              <SapakOrderManagementAccordeon 
                   baskets = {this.props.view.me.role_sapak.baskets}
                   review_status = "WithSapak"/>
            
            <div style={{display:"flex",background: "rgb(237,247,238)"}}>
              <i className="material-icons" style = {{marginTop:"auto", marginBottom:"auto", marginLeft: "30px", marginRight:"30px"}}>done</i>
              <h2>הזמנות שאושרו</h2>
                </div>
                    <SapakOrderManagementAccordeon 
                   baskets = {this.props.view.me.role_sapak.baskets}
                   review_status = "Approved"/>
                   
                <div style={{display:"flex",background: "rgb(237,247,238)"}}>
                <i className="material-icons" style = {{marginTop:"auto", marginBottom:"auto", marginLeft: "30px", marginRight:"30px"}}>not_interested</i>
                <h2>הזמנות שנדחו</h2>
                    </div>
                        <SapakOrderManagementAccordeon 
                    baskets = {this.props.view.me.role_sapak.baskets}
                    review_status = "Rejected"/>
            
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
                        return <div key={i} style={{padding:"20px", marginBottom:"30px"}}>
                            <h6>שם המזמין: {basket.creator.full_name}</h6>
                            
                            <button
                                className="mdl-button mdl-js-button mdl-button--raised"
                                onClick={()=>{this.handleReviewBasketMutation.bind(this)(basket.id, "Approved", this.state.remarks["remarks"+i], "abc"+i)}}
                                style={{marginRight: "15px"}}>
                                אשר
                            </button>                                
                            
                            <button
                                className="mdl-button mdl-js-button mdl-button--raised"
                                onClick={()=>{this.handleReviewBasketMutation.bind(this)(basket.id, "Rejected", this.state.remarks["remarks"+i], "abcd"+i)}}
                                style={{marginRight: "15px"}}>
                                דחה
                            </button>                                
                            
                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style={{marginRight:"30px"}}>
                                <input
                                    className="mdl-textfield__input"
                                    type="mail"
                                    onChange={(e)=>{this.handleRemarksChange.bind(this)("remarks"+i, e.target.value) }}></input>
                                <label className="mdl-textfield__label">הערות למסעדה</label>
                            </div>
                            
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
            
            
            
            </div>
             <div className="mdl-cell mdl-cell--1-col-desktop mdl-cell--1-col-tablet mdl-cell--1-col-phone">
                </div>
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
                        baskets {
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

