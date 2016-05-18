/* jshint esversion: 6*/

import React from "react"
import Relay from 'react-relay';

import ReactSlider from 'react-slider'

class TimeRange extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checked : this.props.checked,
            id : "timeRange_"+this.props.dayNum,
        }
    }
    componentDidMount() {
        componentHandler.upgradeDom();
        if (this.state.checked) {
            document.getElementById(this.state.id).click();
        }
    }
    
    render() {
        const onChange = ()=>{this.props.onChange(this.props.dayNum, this.state.checked)}
        const dayName = ["ו", "ה", "ד", "ג", "ב", "א"][this.props.dayNum]
        return (
            <div style={{ height: "35px", margin:"auto"}}>
                <label style={{width:"50px"}} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor={this.state.id}>
                    <input id={this.state.id} type="checkbox" className="mdl-checkbox__input" onChange={(e)=>{this.setState({checked: e.target.checked}, onChange)}}/>
                    <span className="mdl-checkbox__label">{dayName}</span>
                </label>
            </div>
        );
    }
}

export default TimeRange;

