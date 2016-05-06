/* jshint esversion: 6*/

import Relay from 'react-relay';

import AddItemToBasketMutation from "../mutations/addItemToBasket.js"

var __idnum = 0
class ItemCard extends React.Component {
    componentDidMount() {
        componentHandler.upgradeDom();
    }
    handleAddItemToBasket(event) {
        Relay.Store.commitUpdate(new AddItemToBasketMutation({
            amount: "1",
            remarks: "just testing remarks",
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
                        message:  this.props.name +' הוסף בהצלחה'
                    }
                    );
                },
            });
    } 
    handleRemoveItemsFromBasket(event) {
        Relay.Store.commitUpdate(new AddItemToBasketMutation({
            amount: "-1",
            remarks: "just testing remarks",
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
    handleRemoveItemToBasket(event) {
        Relay.Store.commitUpdate(new AddItemToBasketMutation({
            amount: "-1",
            remarks: "just testing remarks",
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
            background: "url('/static/content/"+this.props.image_id+"') center / cover",
            cursor: "pointer",                
        }
        const style_card = {
            width: "100%",
            maxWidth: "200px",
            height: "300px",
            marginLeft: "auto",        
            marginRight: "auto",        
        };
        const style_support_text = {
            cursor: "pointer",
        }
        const style_name = {
        };
        const style_price = {
        };
        const style_units = {
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
                        <div style={{backgroundImage:"url('/static/content/"+this.props.vendor_image_id+"')",backgroundPosition: "bottom right", backgroundRepeat: "no-repeat", backgroundSize: "60px", display: "inline-block", height: "20px", width: "100%", marginRight: "5px", marginBottom: "5px"}} />
                        
                    :
                        null
                }           
                
                
                <div
                    className="mdl-card__title mdl-card--expand"
                    style={style_card_title}>
                </div>
                
                <div className="mdl-card__supporting-text  mdl-card--border"
                        style={style_support_text}>
                    <div>
                        <div style={style_name}>
                            {this.props.name}
                        </div>
                        <div style={style_price}>
                            {this.props.amount} {this.props.unitsName} , {this.props.price} &#8362;  
                        </div>
                    </div>
                </div>
                 
                 {  
                           this.props.is_logged ?       
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
                    0
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


