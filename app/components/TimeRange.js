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
        const dayName = ["ו", "ה", "ד", "ג", "ב", "א"][this.props.dayNum]
        
        return (
            <div style={{display:"flex", flexDirection:"row", borderBottom:"dotted rgba(0,0,0,0.1) 1px", height: "35px", marginTop:"7px"}}>
                <label style={{width:"50px"}} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor={this.state.id}>
                    <input id={this.state.id} type="checkbox" className="mdl-checkbox__input" />
                    <span className="mdl-checkbox__label">{dayName}</span>
                </label>
                
                <div style={{width:"100%", marginTop:"3px"}}>
                    <ReactSlider min={0} max={71} defaultValue={[25, 57]} withBars />
                </div>
            </div>
        );
    }
}

export default TimeRange;

