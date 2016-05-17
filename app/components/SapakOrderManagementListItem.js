/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';
import { Accordion, AccordionItem } from 'react-sanfona';
import ReviewBasketMutation from '../mutations/reviewBasket.js'

class SapakOrderManagementListItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            communicating: false,
            remarks: ""
        }
    }
    
    componentDidMount() {
        componentHandler.upgradeDom();
    } 
    
    PretyfiDate(date){
        //console.log(date);
        var formDate = date.slice(8, 10)+"/"+date.slice(5, 7)+"/"+date.slice(0, 4);
        return formDate;
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.forceFetch) {
            this.props.relay.forceFetch()
        }        
    }

 PretyfiBsketStatus(status)
 {
    // console.log(status);
     switch (status) {
          case "WithSapak":     
            return <span className="mdl-list__item-primary-content" style={{ textAlign:"right", marginRight:"5px", marginLeft:"5px"}}>
                        <i className="material-icons mdl-list__item-icon">query_builder</i>
                    </span>;
          case "WithUser":      
            return <span className="mdl-list__item-primary-content" style={{textAlign:"right", marginRight:"5px", marginLeft:"5px"}}>
                        <i className="material-icons mdl-list__item-icon">shopping_cart</i>
                    </span>;
          case "Approved":      
            return <span className="mdl-list__item-primary-content" style={{ textAlign:"right", marginRight:"5px", marginLeft:"5px"}}> 
                        <i className="material-icons mdl-list__item-icon">done</i>
                    </span>;
          case "Rejected":      
            return  <span className="mdl-list__item-primary-content" style={{ textAlign:"right", marginRight:"5px", marginLeft:"5px"}}>
                        <i className="material-icons mdl-list__item-icon">not_interested</i>
                    </span>;
          default:      return <i className="material-icons mdl-list__item-icon">shopping_cart</i>;;
        }
    
 }
 
 handleRemarksChange(remarks) {
        this.setState({
            remarks: remarks,
        })    
    }
 
    handleReviewBasketMutation(event,basketID, reviewStatus, reviewComment,) {
        //console.log(event)
        event = event || window.event // cross-browser event
        if (event.stopPropagation) {
        // W3C standard variant
            event.stopPropagation()
        } else {
            // IE variant
            event.cancelBubble = true
        }

       
        console.log(reviewComment)
        const mycomm = JSON.parse(JSON.stringify(this.state.communicating));
        
        this.setState({
            communicating: true,
        })
        Relay.Store.commitUpdate(new ReviewBasketMutation({
            basketID: basketID,
            reviewStatus: reviewStatus,
            reviewComment: reviewComment,
        }),
            {
                onFailure: (e) => {
                    console.log(e.getError())
                    this.setState({
                        communicating: false
                    })
                },
                onSuccess: () => {
                    console.log('basket successfuly reviewed!')
                    this.setState({
                        communicating: false
                    })
                },
            });
    }

    
    render() {
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
             //background:  "url('/static/content/"+this.props.basket.sapak.small_image_id+"') 50% 50% / contain no-repeat",
            
        }
        
        return (
                    <li  className="mdl-list__item basketlistItem" >
                        <span className="mdl-list__item-primary-content" >
                                <span className="mdl-list__item-text-body" style={{marginLeft:"15px",}}> 
                                 {this.PretyfiBsketStatus(this.props.basket.review_status)} 
                                </span>
                                <span className="mdl-list__item-text-body" style={{marginLeft:"15px",}}> 
                                {this.PretyfiDate(this.props.basket.date_updated)} 
                                </span>
                                 <span className="mdl-list__item-text-body" style={{marginLeft:"15px",}}> 
                                      הזמנה מ:  {this.props.basket.restaurant.name} 
                                </span>
                                <span className="mdl-list__item-primary-content" >
                               {    
                                this.props.basket.review_status== "WithSapak"?
                                 <div>   
                                <button
                                className="mdl-button mdl-js-button mdl-button--raised"
                                onClick={(e)=>{this.handleReviewBasketMutation.bind(this)(e,this.props.basket.id, "Approved", this.state.remarks)}}
                                style={{marginRight: "15px"}}>
                                אשר
                                </button> 
                                <button
                                className="mdl-button mdl-js-button mdl-button--raised"
                                onClick={(e)=>{this.handleReviewBasketMutation.bind(this)(e,this.props.basket.id, "Rejected", this.state.remarks)}}
                                style={{marginRight: "15px"}}>
                                דחה
                                </button>
                                
                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" 
                                style={{marginRight:"30px", backgroundColor: "rgb(254, 243, 187)"}}>
                                <input
                                    className="mdl-textfield__input"
                                    type="mail"
                                    onChange={(e)=>{this.handleRemarksChange.bind(this)(e.target.value) }}></input>
                                <label className="mdl-textfield__label">הערות למסעדה</label>
                                </div>  
                                </div>  
                                :
                                null 
                               }
                                    <div>
                                    
                                    </div>
                                </span> 
                        </span>
                    </li>
        );
    }
}


export default SapakOrderManagementListItem
