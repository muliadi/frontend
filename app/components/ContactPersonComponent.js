/* jshint esversion: 6*/

import React from "react"
import Relay from 'react-relay';

import AddRestaurantMutation from "../mutations/addRestaurant.js"
import CommRound from './commRound.js'


class ContactPersonComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            base64data: null,
            restaurant_name: "",
            company_name: "",
            restaurant_nums: "",
            address: "",
            drop_days: [true, true, true, true, true, true],
            error: null,
            communicating: false,
            success: false,
            isCompany: true,
            isChainsFullyOpen: false,
            isChain: false,
            currentChainID: null,
            dropDaysRemarks: null,
            isModalOpen: false,
        }
    }
    
    static contextTypes = {
        hideModal: React.PropTypes.func,
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
            dropDays: this.state.drop_days,
            isChain: this.state.isChain,
            chainID: this.state.currentChainID,
            imageBase64Data: this.state.base64data,
            dropDaysRemarks: this.state.dropDaysRemarks,
        }),
            {
                onFailure: (e) => {
                    const errMsg = e.getError().source.errors[0].message;
                    console.log(errMsg)
                    this.setState({
                        communicating: false,
                        error: errMsg,
                    })
                },
                onSuccess: () => {
                    this.setState({ communicating: false, success: true })
                    document.location = "/#/items"
                },
            });
    }
    componentDidMount() {
        componentHandler.upgradeDom();
        
    }
    
    render() {
       
        
        return (
         <div className="modal" >
         
         
                                    <h3>My Modal</h3>
                                    <div className="body">
                                        <div style={{display: "inline-block", width: "auto"}}>
                                        <i className="material-icons">person</i>
                                        <div className="mdl-textfield mdl-js-textfield" style = {{width:"176px", }}>
                                                <input className="mdl-textfield__input" type="text"  id={this.props.key+"1"}
                                                ></input>
                                            <label className="mdl-textfield__label" htmlFor={this.props.key+"1"}>שם מלא...</label>
                                            </div>                
                                        <button className="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"
                                            onClick= {this.context.hideModal} style = {{position:"absolute", top:"1px", left:"1px"}}>
                                            <i className="material-icons">close</i>
                                        </button>                
                                        </div> 
                                        <p>This is the modal&apos;s body.</p>
                                    </div>
                                    <div className="modal-footer" style={{display: "flex", flexDirection: "row-reverse",}}>
                                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
                                    onClick = {this.context.hideModal}
                                    >שמור</button>
                                    </div>
                                    
                                   
        </div>
        );
    }
}

export default ContactPersonComponent;

