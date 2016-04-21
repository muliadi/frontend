/* jshint esversion: 6*/

import React from "react"
import Relay from 'react-relay';

import MailVerificationMutation from "../mutations/mailVerification.js"
import CommRound from './commRound.js'

class MailVerification extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            communicating: false,
            error: null,
            success: false,
        }
    }
    componentWillMount() {
        this.setState({ communicating: true })
        Relay.Store.commitUpdate(new MailVerificationMutation({
            hash: this.props.hash,
        }),
            {
                onFailure: (e) => {
                    console.log(e.getError())
                    this.setState({
                        communicating: false,
                        error: "בעייה ברישום אנא נסה להירשם שנית",
                    })
                },
                onSuccess: () => {
                    this.setState({
                        communicating: false,
                        success: true
                    })
                },
            });
    }
    componentDidMount() {
        componentHandler.upgradeDom();
    }
    render() {
        const style_card = {
            width: "100%",
            maxWidth: "500px",
            marginLeft: "auto",
            marginRight: "auto",
            alignItems:"center",
            marginTop: "70px",
        };
        return (
            <div className="mdl-card mdl-shadow--8dp" style={style_card}>
                {
                    this.state.error != null ?
                        <h6 style={{color:"red"}}>{this.state.error}</h6>
                    :
                        null
                }
                {
                    this.state.success ?
                        <div>
                            <h6>ההרשמה הסתיימה בהצלחה</h6>
                        </div>
                :
                        null
                }
                {
                    this.state.communicating ?
                        <div style={{textAlign:"center"}}>
                            <h6>מעדכנים נתונים</h6>
                            <CommRound style={{ margin: "10px"}}></CommRound>
                        </div>                    
                      :
                        null
                }
            </div>
        );
    }
}

export default MailVerification;

