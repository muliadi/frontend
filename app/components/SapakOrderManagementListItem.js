/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';
import { Accordion, AccordionItem } from 'react-sanfona';
import ReviewBasketMutation from '../mutations/reviewBasket.js'

class SapakOrderManagementListItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: +"_basket_"+this.props.basket.id,
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
 
 handleNoteOnClick(event){
      event = event || window.event // cross-browser event
        if (event.stopPropagation) {
        // W3C standard variant
            event.stopPropagation()
        } else {
            // IE variant
            event.cancelBubble = true
        }
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
                    <div  className="accordionHeader" >
                        <div className="mdl-grid" style={{width: "100%",}}>
                        <div className="mdl-cell mdl-cell--1-col" style={{fontSize: "16px"}}>
                            
                                {this.PretyfiBsketStatus(this.props.basket.review_status)} 
                            
                        </div>
                        <div className="mdl-cell mdl-cell--2-col" style={{fontSize: "16px"}}>
                            
                                {this.PretyfiDate(this.props.basket.date_updated)} 
                            
                        </div>
                         <div className="mdl-cell mdl-cell--3-col" style={{fontSize: "16px", }}>
                                  <div style = {{display:"flexGrow",}}>
                                  <div>
                                      הזמנה מ:  {this.props.basket.restaurant.name} 
                                </div>
                                <div>
                                      שם המזמין:  {this.props.basket.creator.full_name} 
                                </div>
                                </div>
                         </div>
                                <div className="mdl-cell mdl-cell--6-col">
                               {    
                                this.props.basket.review_status== "WithSapak"?
                                 <div style={{display:"flex", }}>   
                                 
                                 <div
                                style={{marginRight: "15px",  backgroundColor: "rgb(254, 243, 187)", paddingLeft:"15px",paddingRight:"15px"}}>
                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style={{width:"400px"}}>
                                <textarea className="mdl-textfield__input" type="text" rows="1" id={this.state.id+"_with_sapak_"}
                                    onChange={(e)=>{this.handleRemarksChange.bind(this)(e.target.value) }}
                                    onClick={(e)=>{this.handleNoteOnClick.bind(this)(e)}}
                                    ></textarea>
                                <label
                                    className="mdl-textfield__label"
                                    style={{marginTop:"-10px"}}                                    
                                    htmlFor={this.state.id+"_with_sapak_"}>הערות למסעדה</label>
                                </div> 
                                </div> 
                                  <div style={{ margin: "auto" }}>
                                <button
                                style={{ marginRight:"10px", }} 
                                className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab coloredOk"
                                onClick={(e)=>{this.handleReviewBasketMutation.bind(this)(e,this.props.basket.id, "Approved", this.state.remarks)}}
                                >
                                <i className="material-icons" >done</i>
                                
                                </button> 
                                <button
                                style={{ marginRight:"10px", }} 
                                className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab coloredCancel"
                                onClick={(e)=>{this.handleReviewBasketMutation.bind(this)(e,this.props.basket.id, "Rejected", this.state.remarks)}}
                                >
                                 <i className="material-icons" >not_interested</i>
                                </button>
                                </div>
                                </div>  
                                :
                                null 
                               }
                                    <div>
                                    
                                    </div>
                               </div> 
                            </div>
         
                    </div>
        );
    }
}


export default SapakOrderManagementListItem
