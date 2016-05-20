/* jshint esversion: 6*/

import React from "react"
import Relay from 'react-relay';

class ModalWindowComponent extends React.Component {
    
     static contextTypes = {
        hideModal: React.PropTypes.func,
    }
    componentDidMount() {
        componentHandler.upgradeDom();
    }    
    render() {
        
        var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
             if(this.props.modalComponent!=null){
            return (
              <ReactCSSTransitionGroup transitionName={this.props.transitionName} transitionLeaveTimeout={300} transitionEnterTimeout={500} >
                  {this.props.children}
                  <div id="lean-overlay" style={{display: "block", opacity: "0.1"}}
                  onClick ={this.context.hideModal} ></div>
              </ReactCSSTransitionGroup>
            );
             } else {
            return <ReactCSSTransitionGroup transitionName={this.props.transitionName} transitionLeaveTimeout={300} transitionEnterTimeout={500} />;
        }
    }
}

export default ModalWindowComponent;

