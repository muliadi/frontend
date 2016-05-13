/* jshint esversion: 6*/

import React from 'react';
import Relay from 'react-relay';

import RestaurantCreateCard from './RestaurantCreateCard.js'

class ProfilePageSub extends React.Component {
    componentDidMount() {
        componentHandler.upgradeDom();
    } 
    render() {
        const style_sidebar = {
            background: "rgba(51,172,113,0.0)",
            paddingTop: "30px",
            marginTop: "-7px",
            marginRight: "-7px",
            marginBottom: "-7px",
            paddingRight: "20px",
        }
        const style_grid = {
            top: "0px",
            bottom: "0px",
            marginTop:"-20px",
            marginBottom:"0px",
            paddingTop: "50px",
        }
        
        var UserDepandantContent;
        
        
        return (
            <div className="mdl-grid" style={style_grid}>        
                <div className="mdl-cell mdl-cell--1-col-desktop mdl-cell--1-col-tablet mdl-cell--1-col-phone">
                </div>
                <div className="mdl-cell mdl-cell--10-col-desktop mdl-cell--4-col-tablet mdl-cell--4-col-phone">
                  
               {(() => { console.log(this.props.view.me.role_type);
                         switch (this.props.view.me.role_type) {
                             case "Sapak":
                                return <div>Sapak components will go here</div>;
                            case "ChainUser":
                                return <div>ChainUser components will go here</div>; 
                            case "Restaurant":
                                return <div>Restaurant components will go here</div>;  
                            case "New":
                                console.log(this.props.view.me.role_type);
                                return <RestaurantCreateCard
                                    is_company={this.props.view.me.role_restaurant.is_company}
                                    name={this.props.view.me.role_restaurant.name}
                                    company_name={this.props.view.me.role_restaurant.company_name}
                                    company_num={this.props.view.me.role_restaurant.company_num}
                                    street_address={this.props.view.me.role_restaurant.street_address}
                                    available_chains={this.props.view.chains.edges}
                                    chain={this.props.view.me.role_restaurant.chain}
                                    >
                                </RestaurantCreateCard>; 
                            default:
                                            
                                return;
        }
      })()}
              
                  
                   
                </div>
                <div className="mdl-cell mdl-cell--1-col-desktop mdl-cell--1-col-tablet mdl-cell--1-col-phone">
                </div>
            </div>
        );
    }
}

// TODO: optimize fetches with the `show` variable
const ProfilePage = Relay.createContainer(ProfilePageSub, {
    fragments: {
        view: () => Relay.QL`
            fragment on view {
                me {
                    role_type
                    role_restaurant {
                        is_company
                        name
                        company_name
                        company_num
                        street_address
                    }
                }
                chains(first: 100) {
                    edges {
                        node {
                            ... on chain {
                                id
                                name
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

export default ProfilePage
