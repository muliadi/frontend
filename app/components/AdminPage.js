/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';

import ItemGrid from './ItemGrid.js';
import UserGrid from './UserGrid.js';
import SapakGrid from './SapakGrid.js';

class AdminPageSub extends React.Component {
    componentDidMount() {
        componentHandler.upgradeDom();
    } 
    render() {
        return (
            <div>
                <h1>
                המוצרים
                </h1>
                <ItemGrid view={this.props.view} />
                <h1>
                הספקים
                </h1>
                <SapakGrid view={this.props.view} />
                <h1>
                המשתמשים
                </h1>
                <UserGrid view={this.props.view} />
            </div>
        );
    }
}

const AdminPage = Relay.createContainer(AdminPageSub, {
    fragments: {
        view: () => Relay.QL`
            fragment on view {
                ${ItemGrid.getFragment('view')},
                ${UserGrid.getFragment('view')},
                ${SapakGrid.getFragment('view')},                
                me {
                    is_founder
                }
            }`,
    },
});

export default AdminPage


