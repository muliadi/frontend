/* jshint esversion: 6*/

var __idnum = 0
const ItemCard = ({name, image_id, price, amount, unitsName}) => {
    const style_card_title = {
        background: "url('/static/content/"+image_id+"') center / cover",
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
            
            <div
                className="mdl-card__title mdl-card--expand"
                style={style_card_title}>
            </div>
            
            <div className="mdl-card__supporting-text  mdl-card--border"
                    style={style_support_text}>
                <div>
                    <div style={style_name}>
                        {name}
                    </div>
                    <div style={style_price}>
                        {amount} {unitsName} , {price} &#8362;  
                    </div>
                </div>
            </div>
            
            <div className="mdl-card__actions mdl-card--border" style={style_actions}>
                <button
                    style={style_add_to_basket_button}
                    id={__id}
                    className="mdl-button mdl-js-button mdl-button--primary"
                    >
                    <i className="material-icons">add</i>
                </button>

                <div style={style_amount_text}  id={__id+"_2"}>
                0
                </div>
                
                
                <button
                    style={style_add_to_basket_button}
                    id={__id+"_1"}
                    className="mdl-button mdl-js-button mdl-button--primary"
                    >
                    <i className="material-icons">remove</i>
                </button>
                
            </div>        
        </div>
        
    );    
}

// TODO: add propTypes

export default ItemCard


