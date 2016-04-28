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
    getTimeVal(v) {
        v = 72-v
        const hr = 4+Math.floor(v / 4)
        var  mn = 15*(v % 4)
        mn =  mn==0 ? "00" : mn
        return hr + ":" + mn        
    }
    getTimeFrom() {
        return this.getTimeVal(this.state.right)
    }
    getTimeTo() {
        return this.getTimeVal(this.state.left)
    }
    render() {
        const dayName = ["ו", "ה", "ד", "ג", "ב", "א"][this.props.dayNum]
        this.props.onChange(this.props.dayNum, this.state.checked, this.getTimeFrom(), this.getTimeTo())
        return (
            <div style={{display:"flex", flexDirection:"row", borderBottom:"dotted rgba(0,0,0,0.1) 1px", height: "35px", marginTop:"7px"}}>
                <label style={{width:"70px"}} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor={this.state.id}>
                    <input id={this.state.id} type="checkbox" className="mdl-checkbox__input" onChange={(e)=>{this.setState({checked: e.target.checked})}}/>
                    <span className="mdl-checkbox__label">{dayName}</span>
                </label>
                
                <div style={{width:"80px", marginTop:"3px"}}>
                    {this.getTimeFrom()}
                </div>
                <div style={{width:"100%", marginTop:"6px"}}>
                    <ReactSlider min={0} max={72} defaultValue={[this.state.left, this.state.right]} onChange={(value)=>{this.setState({left: value[0], right:value[1]})}} withBars />
                </div>
                <div style={{width:"80px", marginTop:"3px", marginRight:"5px"}}>
                    {this.getTimeTo()}
                </div>
                
            </div>
        );
    }
}

export default TimeRange;

