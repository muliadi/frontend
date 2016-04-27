/* jshint esversion: 6*/

import React from "react"
import Relay from 'react-relay';

import AddUserMutation from "../mutations/addUser.js"
import CommRound from './commRound.js'

import TimeRange from './TimeRange.js'

class RestaurantCreateCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            base64data: null,
            restaurant_name: "",
            company_name: "",
            restaurant_nums: "",
            address: "",
            drop_days: [true, true, true, true, true, true],
            drop_time_start: 4,
            drop_time_end: 0,
            error: null,
            communicating: false,
            success: false,
            isCompany: true,
        }
    }
    handleRestaurantNameChange(event) {
        this.setState({
            restaurant_name: event.target.value,
            error: null,
        });
    }
    handleCompanyNameChange(event) {
        this.setState({
            company_name: event.target.value,
            error: null,
        });
    }
    handleAddressChange(event) {
        this.setState({
            address: event.target.value,
            error: null,
        });
    }
    handleRestaurantNumsChange(event) {
        this.setState({
            restaurant_nums: event.target.value,
            error: null,
        });
    }
    handleFileChange(event) {
        this.__fileName = event.target.value;
        var file = event.target.files[0]
        if (file) {
            // create reader
            var reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = function (e) {
                // browser completed reading file - display it
                const data = e.target.result.split(",")[1];
                this.setState({ base64data: data, error: null });
            }.bind(this);
        }
    }
    handleSaveItem(event) {
        if (this.state.full_name == "") {
            this.setState({ error: "אנא הכנס שם מלא" });
            return;
        }
        if (this.state.mail == "") {
            this.setState({ error: "אנא הכנס מייל" });
            return;
        }
        if (this.state.pass1 == "") {
            this.setState({ error: "אנא הכנס סיסמה" });
            return;
        }
        if (this.state.base64data == null) {
            this.setState({ error: "אנא הוסף תמונה" });
            return;
        }
        this.setState({ communicating: true })
        Relay.Store.commitUpdate(new AddUserMutation({
            full_name: this.state.full_name,
            mail: this.state.mail,
            password: this.state.pass1,
            imageBase64Data: this.state.base64data,
        }),
            {
                onFailure: (e) => {
                    console.log(e.getError())
                    const errMsg = e.getError().source.errors[0].message;
                    var msg = "";
                    if ((errMsg.indexOf("Mail") > -1) && (errMsg.indexOf("already exists") > -1)) {
                        msg = "מייל כבר קיים, אנא בחר אחר";
                    }
                    this.setState({
                        communicating: false,
                        error: msg,
                    })
                },
                onSuccess: () => {
                    this.setState({ communicating: false, success: true })
                },
            });
    }
    componentDidMount() {
        componentHandler.upgradeDom();
        document.getElementById("option-1").click();
    }
    render() {
        const style_card = {
            width: "100%",
            //maxWidth: "500px",
            marginLeft: "auto",
            marginRight: "auto",
            alignItems:"center",
        };
        const style_small_image = {
            width: "100%",
            height: "200px",
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            borderRadius: "10px",
        };
        const style_save_button = {
            marginBottom: "0px",
        }
        const style_add_image = {
            marginRight: "auto",
            marginLeft: "auto",
            background: "url('static/login.png') center / cover",            
        }
        const style_actions = {
            display: "flex",
            flexDirection: "row-reverse",
        }
        if (this.state.base64data != null) {
            style_small_image.background = "url('data:image;base64," + this.state.base64data + "') center / cover";
            style_small_image.height = "300px";
            style_small_image.alignItems = "flex-end";
            style_add_image.background = "rgba(200,200,200,1.0)"
        }
        else {
            style_small_image.background = "rgba(0,0,0,0.1)";
        }
        return (
            <div>
            {
                this.state.success ?
                    <div className="mdl-card" style={style_card}>
                        <h6>כדי לסיים את ההרשמה אנא לחץ על הקישור במייל ששלחנו</h6>
                    </div>                
                :                
                    <div className="mdl-card mdl-shadow--8dp" style={style_card}>
                        <h6>הכנס פרטי המסעדה / העסק</h6>
                        {
                            this.state.error != null ?
                                <h7 style={{ color: "red" }}>{this.state.error}</h7> : null
                        }                
                        <div className="mdl-grid">
                            <div className="mdl-cell mdl-cell--6-col-desktop mdl-cell--4-col-tablet mdl-cell--2-col-phone">
                                <input id="fileinput2" type="file" style={{ display: "None" }} onChange={this.handleFileChange.bind(this) }></input>

                                <div style={style_small_image}>
                                    {this.state.base64data == null ? 
                                        <button
                                            className="mdl-button mdl-js-button mdl-button--fab"
                                            style={style_add_image}
                                            onClick={() => (document.getElementById('fileinput2').click()) }>
                                            <i className="material-icons"></i>
                                        </button>
                                    : null}
                                </div>
                            </div>
                        
                            <div className="mdl-cell mdl-cell--6-col-desktop mdl-cell--4-col-tablet mdl-cell--2-col-phone">
                            
                                <div style={{width:"100%"}}>
                                    <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor="option-1"  style={{marginLeft:"15px"}}>
                                        <input
                                            type="radio"
                                            id="option-1"
                                            className="mdl-radio__button"
                                            name="options"
                                            value="1"
                                            onClick={()=>{this.setState({isCompany: true})}}/>
                                        <span className="mdl-radio__label">חברה בע״מ</span>
                                    </label>
                                    <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor="option-2">
                                        <input
                                            type="radio"
                                            id="option-2"
                                            className="mdl-radio__button"
                                            name="options"
                                            value="2"
                                            onClick={()=>{this.setState({isCompany: false})}}/>
                                        <span className="mdl-radio__label">עוסק מורשה</span>
                                    </label>
                                </div>
                                                            
                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                    <input
                                        className="mdl-textfield__input"
                                        type="text"
                                        onChange={this.handleRestaurantNameChange.bind(this) }></input>
                                    <label className="mdl-textfield__label">שם המסעדה</label>
                                </div>
                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                    <input
                                        className="mdl-textfield__input"
                                        type="text"
                                        onChange={this.handleCompanyNameChange.bind(this) }></input>
                                    <label className="mdl-textfield__label">
                                        {
                                            this.state.isCompany? "שם החברה" : "שם העסק"
                                        }
                                    </label>
                                </div>
                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                    <input
                                        className="mdl-textfield__input"
                                        type="text"
                                        onChange={this.handleAddressChange.bind(this) }></input>
                                    <label className="mdl-textfield__label">כתובת</label>
                                </div>
                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                    <input
                                        className="mdl-textfield__input"
                                        type="text"
                                        onChange={this.handleRestaurantNumsChange.bind(this) }></input>
                                    <label className="mdl-textfield__label">
                                        {
                                            !this.state.isCompany? "ע״מ" : "ח״פ"
                                        }
                                    </label>
                                </div>
                                
                                
                                <div style={{width: "100%"}}>
                                    {
                                        [0,1,2,3,4,5].map((dayNum, i)=>(<TimeRange dayNum={dayNum} checked={true} />))
                                    }
                                </div>
                                
                                
                            </div>
                            
                            <div className="mdl-card__actions" style={style_actions}>

                                {this.state.communicating ?
                                    <CommRound style={{ marginRight: "20px", marginTop: "5px" }}></CommRound>
                                    :
                                    <div>
                                        {this.state.base64data != null ?
                                            <button
                                                style={style_save_button}
                                                className="mdl-button mdl-js-button mdl-js-ripple-effect"
                                                onClick={() => (document.getElementById('fileinput2').click()) }>
                                                שנה תמונה
                                            </button> : null
                                        }
                                        <button
                                            style={style_save_button}
                                            className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                                            onClick={this.handleSaveItem.bind(this) }
                                            id="UserCreateCard_Save_Button">
                                            הרשם
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
            }
            </div>
        );
    }
}

export default RestaurantCreateCard;

