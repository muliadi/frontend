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
            left: 25,
            right: 57,
        }
    }
    componentDidMount() {
        componentHandler.upgradeDom();
        if (this.state.checked) {
            document.getElementById(this.state.id).click();
        }
    }
    render() {
        const dayName = ["ו", "ה", "ד", "ג", "ב", "א"][this.props.dayNum]
        
        const left_v = 72-this.state.left
        const right_v = 72-this.state.right
        
        const left_hr = 4+Math.floor(left_v / 4)
        var left_mn = 15*(left_v % 4)
        const right_hr = 4+Math.floor(right_v / 4)
        var right_mn = 15*(right_v % 4)
        right_mn = right_mn==0 ? "00" : right_mn
        left_mn = left_mn==0 ? "00" : left_mn
        
        
        return (
            <div style={{display:"flex", flexDirection:"row", borderBottom:"dotted rgba(0,0,0,0.1) 1px", height: "35px", marginTop:"7px"}}>
                <label style={{width:"70px"}} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor={this.state.id}>
                    <input id={this.state.id} type="checkbox" className="mdl-checkbox__input" />
                    <span className="mdl-checkbox__label">{dayName}</span>
                </label>
                
                <div style={{width:"70px", marginTop:"3px"}}>
                    {right_hr}:{right_mn}
                </div>
                <div style={{width:"100%", marginTop:"6px"}}>
                    <ReactSlider min={0} max={72} defaultValue={[this.state.left, this.state.right]} onChange={(value)=>{this.setState({left: value[0], right:value[1]})}} withBars />
                </div>
                <div style={{width:"70px", marginTop:"3px", marginRight:"5px"}}>
                    {left_hr}:{left_mn}
                </div>
                
            </div>
        );
    }
}

export default TimeRange;

