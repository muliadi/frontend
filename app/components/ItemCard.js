/* jshint esversion: 6*/

const ItemCard = ({name, image_id, price, amount, unitsName}) => {
    const style_card_title = {
        background: "url('/static/content/"+image_id+"') center / cover",                
    }
    const style_card = {
        width: "100%",
        maxWidth: "200px",
        height: "300px",
        // flexDirection: "column-reverse",
        marginLeft: "auto",        
        marginRight: "auto",        
    };
    const style_name = {
        // marginTop: "7px",
        // color: "rgba(215,215,215,0.95)",
        // fontSize: "13px",
        // lineHeight: "1.2",
    };
    const style_price = {
        // marginTop: "7px",
        // color: "rgba(215,215,215,0.95)",
        // fontSize: "13px",
        // lineHeight: "1.2",
    };
    const style_units = {
        // marginTop: "7px",
        // color: "rgba(215,215,215,0.95)",
        // fontSize: "13px",
        // lineHeight: "1.2",
    };    
    return (
        <div className="mdl-card mdl-shadow--8dp" style={style_card}>

            <div className="mdl-card__title mdl-card--expand" style={style_card_title}>
            </div>
            
            <div className="mdl-card__supporting-text">
                <div style={style_name}>
                    {name}
                </div>
                <div style={style_price}>
                    {price} &#8362; 
                </div>
                <div style={style_units}>
                    {amount} {unitsName}  
                </div>
            </div>        
        
        </div>
    );    
}

// TODO: add propTypes

export default ItemCard
