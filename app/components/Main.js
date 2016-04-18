/* jshint esversion: 6 */

import React from 'react';
import Relay from 'react-relay';

import MainFrame from './MainFrame.js';
import ItemGrid from './ItemGrid.js';
import UserGrid from './UserGrid.js';
import SapakGrid from './SapakGrid.js';
import LogInOrCreateUser from './LogInOrCreateUser.js'

const MainSub = class extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            pageToRender: null,
        }
        window.onhashchange = this.getPageToRender.bind(this);        
    }    
    getPageToRender() {
        const args = document.location.hash.slice(1).split("/").filter((s)=>(s!=""));
        const argNum = args.length;
        const arg1 = argNum >= 1 ? args[0] : null;
        if (argNum>0) {
            switch (arg1) {
                case "items":
                    this.setState({pageToRender: <ItemGrid view={this.props.view}></ItemGrid> });
                    break;
                case "users":
                    this.setState({pageToRender: <UserGrid view={this.props.view}></UserGrid> });
                    break;
                case "sapakim":
                    this.setState({pageToRender: <SapakGrid view={this.props.view}></SapakGrid> });
                    break;                        
                case "login":
                    this.setState({pageToRender: <LogInOrCreateUser is_logged={this.props.view.me.is_logged}></LogInOrCreateUser> });
                    break;                        
                default:
                    this.setState({pageToRender: <div>404 Not Found</div> });
                    break;
            }
        }
        else {
            this.setState({pageToRender: <ItemGrid view={this.props.view}></ItemGrid> });            
        }            
    }        
    
    componentWillMount() {
        this.getPageToRender();        
    }
    render() {        
        return (
            <MainFrame view={this.props.view}>
                {this.state.pageToRender}
            </MainFrame>
        );
    }
};

const Main = Relay.createContainer(MainSub, {
    fragments: {
        view: () => Relay.QL`
            fragment on view {
                ${MainFrame.getFragment('view')},
                ${ItemGrid.getFragment('view')},
                ${UserGrid.getFragment('view')},
                ${SapakGrid.getFragment('view')},
                me {
                    is_logged
                    small_image {
                        id
                    }
                }
            }
        `,
    },
});

export default Main






