/* jshint esversion: 6*/

import Relay from 'react-relay';

import AddItemToBasketMutation from "../mutations/addItemToBasket.js"

// TODO: make a global function for global unique IDs
var __idnum = 0
class ItemCard extends React.Component {
     
    componentDidMount() {
        componentHandler.upgradeDom();
    }
    handleAddItemToBasket() {
        Relay.Store.commitUpdate(new AddItemToBasketMutation({
            amount: "1",
            remarks: null,
            itemID: this.props.item.id,
        }),
            {
                onFailure: (e) => {
                    console.log(e.getError())
                },
                onSuccess: () => {
                    var notification = document.querySelector('.mdl-js-snackbar');
                    notification.MaterialSnackbar.showSnackbar(
                    {
                        message:  this.props.item.name +' הוסף בהצלחה',
                        timeout: 700
                    }
                    );
                },
            });
    } 
    handleRemoveItemsFromBasket() {
        Relay.Store.commitUpdate(new AddItemToBasketMutation({
            amount: "-1",
            remarks: null,
            itemID: this.props.item.id,
        }),
            {
                onFailure: (e) => {
                    console.log(e.getError())
                },
                onSuccess: () => {
                    var notification = document.querySelector('.mdl-js-snackbar');
                    notification.MaterialSnackbar.showSnackbar(
                    {
                        message: 'המוצר הוסר',
                        timeout: 700
                    }
                    );
                },
            });
    }       
    handleRemoveItemToBasket() {
        Relay.Store.commitUpdate(new AddItemToBasketMutation({
            amount: "-1",
            remarks: null,
            itemID: this.props.item.id,
        }),
            {
                onFailure: (e) => {
                    console.log(e.getError())
                },
                onSuccess: () => {
                    var notification = document.querySelector('.mdl-js-snackbar');
                    notification.MaterialSnackbar.showSnackbar(
                    {
                        message: 'המוצר הוסר'
                    }
                    );
                },
            });
    }    
    render() {
        const style_card_title = {
            cursor: "pointer",   
            height: "170px",             
        }
        const style_card = {
            width: "100%",
            maxWidth: "200px",
            height: "350px",
            marginLeft: "auto",        
            marginRight: "auto",        
        };
        if (this.props.isSelected) {
            console.log("CARD: "+this.props.item.name)
            style_card["border"] = "solid 5px red"
        }
        
        const style_support_textSep = {
            borderTop: "1px solid rgba(78,176,82,0.2)",
            width:"120px",
            margin:"auto"
            
        }
        
        const style_support_text = {
            cursor: "pointer",
            height: "104px",
            //borderTop: "2px solid rgba(78,176,82,0.2)"
        }
        const style_name = {
            textAlign:"center",
            color: "rgb(78,176,82)",
            fontSize: "16px",
            fontWeight: "bold",
        };
        const style_price = {
            textAlign:"center",
            fontSize:"17px",
            fontWeight: "bold",
        };
        const style_packaging = {
            textAlign:"center",
        };
        const style_units = {
            textAlign:"center",
        };  
        const style_add_to_basket_button = {  
            //background: "rgb(51, 172, 113)",
        };
        const style_amount_text = {
            textAlign: "center",
            marginTop: "10px",
            contentEditable: "true",
        }
        const style_actions = {
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent: "space-between",            
        };  
        const getParentCard = (e)=>{
            while (e.className!="mdl-card mdl-shadow--8dp") {
                e = e.parentElement;
            }
            return e;
        }
        const style_card_mouse_over = (e)=>{
            //getParentCard(e.target).style.border = "solid red 3px";
            getParentCard(e.target).style.boxShadow = "0px 0px 10px 2px rgb(51, 172, 113)"
        }
        const style_card_mouse_out = (e)=>{
            //getParentCard(e.target).style.border = "solid red 3px";
            getParentCard(e.target).style.boxShadow = "0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12),0 5px 5px -3px rgba(0,0,0,.2)"
        }    
        const __id = "itemcard_id_"+__idnum
        __idnum += 1
        return (
            <div
                className="mdl-card mdl-shadow--8dp"
                onMouseOver={style_card_mouse_over}
                onMouseOut={style_card_mouse_out}
                onClick={()=>{
                    if ('onItemSelected' in this.props) {
                        this.props.onItemSelected(this.props.item)
                    }
                }}
                style={style_card}>

                <div className="mdl-tooltip mdl-tooltip--top" htmlFor={__id} >
                    הוסף אחד
                </div>
                <div className="mdl-tooltip mdl-tooltip--top" htmlFor={__id+"_1"}>
                    הורד אחד
                </div>
                <div className="mdl-tooltip mdl-tooltip--top" htmlFor={__id+"_2"}>
                    סה״כ בסל
                </div>
                
                {
                    this.props.item.vendor.small_image.id != "0" ?
                        <div style={{position:"relative"}}>
                        <img src={"/static/content/"+this.props.item.vendor.small_image.id} alt="Shopping Cart" style={{ width: "40px", top: "3px", right:"3px", position: "absolute"}}></img>
                        </div>
                    :
                        null
                }           
                
                
                <div 
                    className="mdl-card__title mdl-card--expand"
                    style={style_card_title}> 
                    <span style={{  height: "140px", width:"140px", marginLeft: "auto", marginRight:"auto", background:"url('/static/content/"+this.props.item.small_image.id+"') 50% 50% / contain no-repeat ", }}/>
                </div>
                <div style={style_support_textSep}/>
                <div className="mdl-card__supporting-text  mdl-card--border"
                        style={style_support_text}>
                    <div>
                        <div style={style_name}>
                            {this.props.item.name}
                        </div>
                        <div style={style_packaging}>
                            {this.props.item.packaging.name} מכיל {this.props.item.amount} {this.props.item.units.name}   
                        </div>
                        <div style={style_packaging}>
                            {this.props.item.short_desc}   
                        </div>
                       <div style={style_price}>
                            {this.props.item.price_in_agorot / 100} &#8362; ל{this.props.item.packaging.name}
                        </div>
                    </div>
                </div>
                 
                 
                 
                 {  
                    this.props.role_type=='Restaurant' ?       
                        <div className="mdl-card__actions mdl-card--border" style={style_actions}>
                            <button
                                style={style_add_to_basket_button}
                                id={__id}
                                className="mdl-button mdl-js-button mdl-button--primary"
                                onClick={this.handleAddItemToBasket.bind(this) }
                                >
                                <i
                                    className="material-icons"
                                    
                                >add</i>
                            </button>

                            <div style={style_amount_text}  id={__id+"_2"}>
                                {this.props.amount_in_basket}
                            </div>
                                                
                            <button
                                style={style_add_to_basket_button}
                                id={__id+"_1"}
                                className="mdl-button mdl-js-button mdl-button--primary"
                                onClick={this.handleRemoveItemToBasket.bind(this) }
                                >
                                <i className="material-icons"
                                
                                >remove</i>
                            </button>
                            
                    </div> 
                :
                    null
             }
                 
                   
                    
            </div>
                
            
        ); 
    }   
}

// TODO: add propTypes

export default ItemCard


