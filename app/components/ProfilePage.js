/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';

import LoggedUserInfo from './LoggedUserInfo.js'
import RestaurantCreateCard from './RestaurantCreateCard.js'

class ProfilePageSub extends React.Component {
    componentDidMount() {
        componentHandler.upgradeDom();
    } 
    render() {
        const style_sidebar = {
            background: "rgba(51,172,113,0.0)",
            borderLeft: "solid 1px grey",
            paddingTop: "30px",
            marginTop: "-7px",
            marginRight: "-7px",
            marginBottom: "-7px",
            paddingRight: "20px",
        }
        const style_grid = {
            position: "absolute",
            top: "0px",
            bottom: "0px",
            marginTop:"-20px",
            marginBottom:"0px"
        }
        return (
            <div className="mdl-grid" style={style_grid}>        
                <div className="mdl-cell mdl-cell--3-col-desktop mdl-cell--4-col-tablet mdl-cell--4-col-phone" style={style_sidebar}>
                    <LoggedUserInfo
                        full_name={this.props.view.me.full_name}
                        mail={this.props.view.me.mail}
                        image_id={this.props.view.me.small_image.id}
                    >
                    </LoggedUserInfo>
                </div>
                <div className="mdl-cell mdl-cell--8-col-desktop mdl-cell--4-col-tablet mdl-cell--4-col-phone">
                    <RestaurantCreateCard>
                    </RestaurantCreateCard>
                </div>
            </div>
        );
    }
}

const ProfilePage = Relay.createContainer(ProfilePageSub, {
    fragments: {
        view: () => Relay.QL`
            fragment on view {
                me {
                    full_name
                    mail
                    small_image {
                        id
                    }
                }
            }`,
    },
});

export default ProfilePage
