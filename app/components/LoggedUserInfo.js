/* jshint esversion: 6*/

const LoggedUserInfo = ({login_id, full_name, mail, image_id}) => {
    console.log(login_id)
    console.log(full_name)
    console.log(image_id)
    console.log(mail)
    const style_card = {
        maxWidth: "210px",
        marginTop: "30px",
        flexDirection: "column",
        paddingRight: "15px",
        background: "rgba(0,0,0,0.0)",
    };
    const style_image = {
        width: "150px",
        height: "150px",
        borderRadius: "20px",
        marginBottom:"30px",
        background: "url('/content/"+image_id+"') center / cover",        
    };
    return (
        <div className="mdl-card" style={style_card}>
            <div style={style_image}></div>
            <p>{login_id}</p>
            <p>{full_name}</p>
            <p>{mail}</p>
        </div>
    );    
}
// TODO: add a button to change user details

// TODO: add propTypes

export default LoggedUserInfo
