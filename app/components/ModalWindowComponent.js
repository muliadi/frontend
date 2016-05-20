/* jshint esversion: 6*/

import React from "react"
import Relay from 'react-relay';

class ModalWindowComponent extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            base64data: null,
            name: "",
            city: "",
            mail: "",
            shortDesc: "",
        }
    }    
   
    
    
    componentDidMount() {
        componentHandler.upgradeDom();
    }    
    render() {
        
        var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
        
        
        if(this.props.isOpen){
            return (
              <ReactCSSTransitionGroup transitionName={this.props.transitionName} transitionLeaveTimeout={300} transitionEnterTimeout={500} >
                  {this.props.children}
              </ReactCSSTransitionGroup>
            );
        } else {
            return <ReactCSSTransitionGroup transitionName={this.props.transitionName} transitionLeaveTimeout={300} transitionEnterTimeout={500} />;
        }
    }
}

export default ModalWindowComponent;

