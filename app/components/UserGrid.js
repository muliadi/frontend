/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';

import UserCard from './UserCard.js'
import UserCreateCard from './UserCreateCard.js'

class UserGridSub extends React.Component {
    componentWillMount() {
        this.props.relay.setVariables({show: true});
    }
    componentDidMount() {
        componentHandler.upgradeDom();
    } 
    render() {
        const style_grid = {
        };
        const style_cell = {
            marginLeft: "auto",
            marginRight: "auto",
        };        
        return (
            <div className="mdl-grid" style={style_grid}>
                {
                    'users' in this.props.view ?                    
                        this.props.view.users.edges.map((user, i) => {
                            return <div key={i} className="mdl-cell mdl-cell--3-col-desktop mdl-cell--4-col-tablet mdl-cell--4-col-phone" style={style_cell}>
                                <UserCard
                                    full_name={user.node.full_name}
                                    mail={user.node.mail}
                                    image_id={user.node.small_image.id}>
                                </UserCard>
                            </div>
                        })
                    :
                        null
                }
            </div>
        );
    }
}

const UserGrid = Relay.createContainer(UserGridSub, {
    initialVariables: {
        show: false,
    },
    fragments: {
        view: () => Relay.QL`
            fragment on view {
                users(first:30) @include(if: $show) {
                    edges {
                        node {
                            ... on user {
                                full_name
                                mail
                                small_image {
                                    id
                                }
                            }
                        }
                    }
                }      
            }`,
    },
});

export default UserGrid
