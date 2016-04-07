// /* jshint esversion: 6*/

const ItemCreateCard = ({clicked}) => {
    var name;
    var short_desc;
    const handleName = function (event) {
        name = event.target.value;
        console.log(name)
    }
    const handleShortDesc = function (event) {
        short_desc = event.target.value;
        console.log(short_desc)
    }
    const style_card = {
        width: "100%;",
        maxWidth: "320px;",
        height: "320px;",
        flexDirection: "column-reverse;",
        marginLeft: "auto;",        
        marginRight: "auto;",
        paddingRight:"10px;",
    };
    return (
        <div style={style_card}>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input
                    className="mdl-textfield__input"
                    type="text"
                    id="sample3"
                    onChange={handleName}></input>
                <label className="mdl-textfield__label" for="sample3">שם המוצר</label>
            </div>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input
                    className="mdl-textfield__input"
                    type="text"
                    id="sample4"
                    onChange={handleShortDesc}></input>
                <label className="mdl-textfield__label" for="sample4">תאור קצר</label>
            </div>
            <button
                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                onClick={clicked}>
                הוסף תמונה
            </button>
            <button
                className="mdl-button mdl-js-button mdl-js-ripple-effect">
                הוסף תמונה
            </button>                                
        </div> 
    );
}

// TODO: add propTypes

export default ItemCreateCard;

