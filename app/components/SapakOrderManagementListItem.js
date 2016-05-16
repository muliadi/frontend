/* jshint esversion: 6*/

import React from 'react';
import { Accordion, AccordionItem } from 'react-sanfona';


class SapakOrderManagementListItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            communicating: null,
            remarks: null
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
                    <li key={this.props.key} className="mdl-list__item basketlistItem" >
                        <span className="mdl-list__item-primary-content" >
                            <span className="mdl-list__item-text-body" > 
                                {this.PretyfiDate(this.props.basket.date_updated)}  
                        </span>
                                {this.PretyfiBsketStatus(this.props.basket.review_status)} 
                                <span className="mdl-list__item-primary-content" >
                                    
                                    
                                     <button
                                className="mdl-button mdl-js-button mdl-button--raised"
                                onClick={()=>{this.handleReviewBasketMutation.bind(this)(this.props.basket.id, "Approved", this.state.remarks["remarks"+i], "abc"+i)}}
                                style={{marginRight: "15px"}}>
                                אשר
                                </button>   
                                    <div>
                                    
                                    </div>
                                </span> 
                        </span>
                    </li>
        );
    }
}


export default SapakOrderManagementListItem
