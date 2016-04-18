/* jshint esversion: 6*/

const SapakCard = ({name, city, shortDesc, image_id, creator_img_id}) => {
    const style_card = {
        width: "100%",
        maxWidth: "320px",
        height: "320px",
        background: "url('/static/content/"+image_id+"') center / cover",        
        flexDirection: "column-reverse",
        marginLeft: "auto",        
        marginRight: "auto",        
    };
    const style_shadow = {
        width: "94%",
        margin: "0px 0px 0px 0px",
        background: "rgba(0,0,0,0.75)",
        paddingTop: "10px",
        paddingRight: "3%",
        paddingLeft: "3%",
        paddingBottom: "10px",
        color: "rgba(255,255,255,0.95)",
        fontSize: "22px"
    };
    const style_short_desc = {
        marginTop: "7px",
        color: "rgba(215,215,215,0.95)",
        fontSize: "13px",
        lineHeight: "1.2",
    };    
    const style_creator_img = {
        height: "45px",
        width: "45px",
        borderRadius: "7px",
        cursor: "pointer",
        background: "url('/static/content/" + creator_img_id + "') center / cover",
    }
    return (
        <div className="mdl-card mdl-shadow--4dp" style={style_card}>
            <div style={style_shadow}>
                <div style={style_creator_img}></div>
                <div>
                    {name}
                </div>
                <div style={style_short_desc}>
                    {city}
                </div>
                <div style={style_short_desc}>
                    {shortDesc}
                </div>
            </div>
        </div>
    );    
}

export default SapakCard
