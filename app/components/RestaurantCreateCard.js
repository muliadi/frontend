/* jshint esversion: 6*/

import React from "react"
import Relay from 'react-relay';

import AddRestaurantMutation from "../mutations/addRestaurant.js"
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
            drop_time_start: ["7:45", "7:45", "7:45", "7:45", "7:45", "7:45"],
            drop_time_end: ["15:45", "15:45", "15:45", "15:45", "15:45", "15:45"],
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
        if (this.state.restaurant_name == "") {
            this.setState({ error: "אנא הכנס שם המסעדה" });
            return;
        }
        if (this.state.company_name == "") {
            this.setState({ error: "שם החברה או העוסק חסרים" });
            return;
        }
        if (this.state.restaurant_nums == "") {
            this.setState({ error: "אנא הכנס מספר ע״מ או ח״פ" });
            return;
        }
        if (this.state.address == null) {
            this.setState({ error: "כתובת חסרה" });
            return;
        }
        this.setState({ communicating: true })
        Relay.Store.commitUpdate(new AddRestaurantMutation({
            name: this.state.restaurant_name,
            address: this.state.address,
            companyNum: this.state.restaurant_nums,
            companyName: this.state.company_name,
            dropTimeTo: this.state.drop_time_end,
            dropTimeFrom: this.state.drop_time_start,
            dropDays: this.state.drop_days
        }),
            {
                onFailure: (e) => {
                    console.log(e.getError())
                    const errMsg = e.getError().source.errors[0].message;
                    this.setState({
                        communicating: false,
                        error: errMsg,
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
        const onChange = (dayNum, checked, timeFrom, timeTo) => {
            const new_drop_days = this.state.drop_days.slice();
            const new_drop_time_start = this.state.drop_time_start.slice();
            const new_drop_time_end = this.state.drop_time_end.slice();
            new_drop_days[5-dayNum] = checked;
            new_drop_time_start[5-dayNum] = timeFrom;
            new_drop_time_end[5-dayNum] = timeTo;
            this.setState({drop_days: new_drop_days, drop_time_start: new_drop_time_start, drop_time_end: new_drop_time_end});
        }
        const timeRanges = [5,4,3,2,1,0].map((dayNum, i)=>(<TimeRange key={i} dayNum={dayNum} checked={true} onChange={onChange}/>))
        return (
            <div>
            {
                this.state.success ?
                    <div className="mdl-card" style={style_card}>
                        <h6>המסעדה נשמרה בהצלחה!</h6>
                    </div>                
                :                
                    <div className="mdl-card mdl-shadow--8dp" style={style_card}>
                        <h6>הכנס פרטי המסעדה / העסק</h6>
                        {
                            this.state.error != null ?
                                <h7 style={{ color: "red" }}>{this.state.error}</h7> : null
                        }                
                        <div className="mdl-grid">
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
                                        value={this.props.name}
                                        onChange={this.handleRestaurantNameChange.bind(this)}></input>
                                    <label className="mdl-textfield__label">שם המסעדה</label>
                                </div>
                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                    <input
                                        className="mdl-textfield__input"
                                        type="text"
                                        value={this.props.company_name}
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
                                        value={this.props.street_address}
                                        onChange={this.handleAddressChange.bind(this) }></input>
                                    <label className="mdl-textfield__label">כתובת</label>
                                </div>
                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                    <input
                                        className="mdl-textfield__input"
                                        type="text"
                                        value={this.props.company_num}
                                        onChange={this.handleRestaurantNumsChange.bind(this) }></input>
                                    <label className="mdl-textfield__label">
                                        {
                                            !this.state.isCompany? "ע״מ" : "ח״פ"
                                        }
                                    </label>
                                </div>                                
                            </div>
                            
                            
                            
                            
                            <div className="mdl-cell mdl-cell--6-col-desktop mdl-cell--4-col-tablet mdl-cell--2-col-phone">
                                <div style={{width: "100%"}}>
                                    <div  style={{marginBottom:"20px"}}>
                                        <h7>בחר ימי ושעות הספקה</h7>
                                    </div>
                                    {timeRanges}
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
                                            onClick={()=>{this.handleSaveItem.bind(this)() }}
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

