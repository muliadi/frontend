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
            itemID: this.props.itemID,
        }),
            {
                onFailure: (e) => {
                    console.log(e.getError())
                },
                onSuccess: () => {
                    var notification = document.querySelector('.mdl-js-snackbar');
                    notification.MaterialSnackbar.showSnackbar(
                    {
                        message:  this.props.name +' הוסף בהצלחה',
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
            itemID: this.props.itemID,
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
            itemID: this.props.itemID,
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
            //background: "url('/static/content/"+this.props.image_id+"')",
            cursor: "pointer",   
            //height: "170px",             
           // minHeight: "90px",
           // minWidth:"90px",
           // backgroundSize:"contain",
           // backgroundPosition:"center center",
           // backgroundRepeat:"no-repeat"
        }
        const style_card = {
            width: "100%",
            maxWidth: "200px",
            height: "350px",
            marginLeft: "auto",        
            marginRight: "auto",        
        };
        
        const style_support_textSep = {
            borderTop: "1px solid rgba(78,176,82,0.2)",
            width:"120px",
            margin:"auto"
            
        }
        
        const style_support_text = {
            cursor: "pointer",
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
                    this.props.vendor_image_id != "0" ?
                        <div style={{position:"relative"}}>
                        <img src={"/static/content/"+this.props.vendor_image_id} alt="Shopping Cart" style={{ width: "40px", top: "3px", right:"3px", position: "absolute"}}></img>
                        </div>
                    :
                        null
                }           
                
                
                <div 
                    className="mdl-card__title mdl-card--expand"
                    style={style_card_title}> 
                    <span style={{  height: "120px", minWidth:"80px", margin: "auto auto auto", background:"url('/static/content/"+this.props.image_id+"') 50% 50% / contain no-repeat ", }}/>
                </div>
                <div style={style_support_textSep}/>
                <div className="mdl-card__supporting-text  mdl-card--border"
                        style={style_support_text}>
                    <div>
                        <div style={style_name}>
                            {this.props.name}
                        </div>
                        <div style={style_packaging}>
                            {this.props.packagingName} מכיל {this.props.amount} {this.props.unitsName}   
                        </div>
                        <div style={style_packaging}>
                            {this.props.shortDesc}   
                        </div>
                       <div style={style_price}>
                            {this.props.price} &#8362; ל{this.props.packagingName}
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


