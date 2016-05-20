/* jshint esversion: 6*/

// TODO: fix

import React from 'react';
import Relay from 'react-relay';

var __accordionElementID = 0

class Accordion extends React.Component {
    constructor(props){
        super(props)
         this.state ={
             isFullyOpen: false,
             isOpen: false,
             ID: "accordionContentElementID_"+__accordionElementID,
        }
        __accordionElementID += 1;
    }
    componentDidMount() {
        componentHandler.upgradeDom();
    }
    componentDidUpdate() {
        if ((this.state.isOpen)&&(!this.state.isFullyOpen)) {
            document.getElementById(this.state.ID).style.maxHeight = '300px';
            this.setState({isFullyOpen: true})
            return 
        }                
        if ((!this.state.isOpen)&&(this.state.isFullyOpen)) {
            document.getElementById(this.state.ID).style.maxHeight = '0px';
            this.setState({isFullyOpen: false})
            return 
        }                
    }
    render() {
        return (
            <div style={{display:"flex", flexDirection:"column"}}>
                        
                <div
                    style={{cursor:"pointer"}}
                    onClick={()=>{this.setState({isOpen: !this.state.isOpen})}}                
                 >                    
                    {this.props.children[0]}
                </div>
                
                <div
                    id={this.state.ID}
                    style={{
                        height:"100%",
                        display: "flex",
                        maxHeight: "0px",
                        transition: "max-height 0.3s",
                        overflow:"hidden",
                    }}>
                    {this.props.children.splice(1)}
                </div>
                                
            </div>
        )}
}

export default Accordion
