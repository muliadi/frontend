/* jshint esversion: 6*/

import React from 'react';
import { Accordion, AccordionItem } from 'react-sanfona';


class OrderManagementListItem extends React.Component {
    componentDidMount() {
        componentHandler.upgradeDom();
    } 
    
    PretyfiDate(date){
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
            overflow:"auto",
            overflowX:"hidden",
            width: "100%",
            wordWrap: "break-word",

        }
        const list_style ={
            margin: "0px",
            padding: "0px",
            width: "100%",
        }
        const sapak_style = {
             width: "35px",
            height: "35px",
            marginLeft:"10px",
             background:  "url('/static/content/"+this.props.basket.sapak.small_image_id+"') 50% 50% / contain no-repeat",
            
        }
        
        const style_noteBubble = {
            border: "1px solid rgba(78,176,82,0.2)",
            backgroundColor: "#fef3bb ",
            borderRadius: "0px",
            boxShadow: "0 0 0px #B2B2B2",
            display: "inline-block",
            padding: "1px 10px",
            verticalAlign: "top",
            right:"0px",
            float: "left",   
            margin: "0px 40px 0px 0px", 
            top: "-1px",
        }
        
        return (
                    <li className="mdl-list__item basketlistItem" >
                        <span className="mdl-list__item-primary-content" >
                            <span className="mdl-list__item-text-body" > 
                                {this.PretyfiDate(this.props.basket.date_updated)}  
                        </span>
                                {this.PretyfiBsketStatus(this.props.basket.review_status)} 
                                <span className="mdl-list__item-primary-content" >
                                    <div
                                    style = {sapak_style}
                                    >
                                    </div>
                                    <div>
                                    {this.props.basket.sapak.name}
                                    </div>
                                    <div className="NoteBubble" style={style_noteBubble} > 
                                        <div style={{display: "inline-block", width: "auto"}}>
                                        <div className="mdl-textfield mdl-js-textfield" style = {{width:"176px", padding:"5px 0px"}}>
                                                <textarea disabled className="mdl-textfield__input" type="text" rows="1" id={"dkfjhd974fh kjhf"+this.props.basket.id}
                                                >{this.props.basket.sapak_remarks}</textarea>
                                            <label
                                                className="mdl-textfield__label"
                                                style={{marginTop: "-10px"}}
                                                htmlFor={"dkfjhd974fh kjhf"+this.props.basket.id}>הערה</label>
                                            </div>                
                                                      
                                        </div> 
                                    </div>
                                </span> 
                        </span>
                    </li>
        );
    }
}


export default OrderManagementListItem
