/* jshint esversion: 6 */

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import Footer from './footer.js';

import ItemCard from './ItemCard.js';
import ItemCreateCard from './ItemCreateCard.js';
import UserCard from './UserCard.js';
import UserCreateCard from './UserCreateCard.js';

import {lang} from '../lang/heb.js';

import viewRoute from '../routes/view_route.js';

// TODO: break the tabs into a component each
const Main = class extends React.Component {
    render() {
        const style_grid = {
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "1400px"
        };
        const style_cell = {
            marginLeft: "auto",
            marginRight: "auto",
        };
        const clicked = () => {
            console.log("Clicked!!!");
        }
        return (
            <div>
                <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
                    <div className="mdl-tabs__tab-bar">
                        <a href="#items-panel" className="mdl-tabs__tab is-active">מוצרים</a>
                        <a href="#users-panel" className="mdl-tabs__tab">משתמשים</a>
                        <a href="#sapakim-panel" className="mdl-tabs__tab">ספקים</a>
                        <a href="#baskets-panel" className="mdl-tabs__tab">הסלים שלי</a>
                    </div>

                    <div className="mdl-tabs__panel is-active" id="items-panel">
                        <div className="mdl-grid" style={style_grid}>
                            {
                                this.props.view.items.edges.map(item => {
                                    return <div className="mdl-cell mdl-cell--3-col-desktop mdl-cell--4-col-tablet mdl-cell--4-col-phone" style={style_cell}>
                                        <ItemCard
                                            name={item.node.name}
                                            short_desc={item.node.short_desc}
                                            image_id={item.node.small_image.id}>
                                        </ItemCard>
                                    </div>
                                })

                            }
                            <ItemCreateCard></ItemCreateCard>
                        </div>
                    </div>
                    <div className="mdl-tabs__panel" id="users-panel">
                        <div className="mdl-grid" style={style_grid}>
                            {
                                this.props.view.users.edges.map(user => {
                                    return <div className="mdl-cell mdl-cell--3-col-desktop mdl-cell--4-col-tablet mdl-cell--4-col-phone" style={style_cell}>
                                        <UserCard
                                            login_id={user.node.login_id}
                                            full_name={user.node.full_name}
                                            mail={user.node.mail}
                                            image_id={user.node.small_image.id}>
                                        </UserCard>
                                    </div>
                                })

                            }
                            <UserCreateCard></UserCreateCard>
                        </div>
                    </div>
                    <div className="mdl-tabs__panel" id="sapakim-panel">
                        <ul>
                            <li>Tywin</li>
                            <li>Cersei</li>
                            <li>Jamie</li>
                            <li>Tyrion</li>
                        </ul>
                    </div>
                    <div className="mdl-tabs__panel" id="baskets-panel">
                        <ul>
                            <li>Viserys</li>
                            <li>Daenerys</li>
                        </ul>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
};

const mainContainer = Relay.createContainer(Main, {
    fragments: {
        view: () => Relay.QL`
        fragment on view {
            items(first: 30) {
                edges{
                    node {
                        ... on item {
                            name
                            short_desc
                            small_image {
                                id
                            } 
                        }  
                    }
                }
            }
            users(first:30) {
                edges {
                    node {
                        ... on user {
                            login_id
                            full_name
                            mail
                            small_image {
                                id
                            }
                        }
                    }
                }
            }            
        }
    `,
    },
});

Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer(window.location.origin + '/graphql')
);

document.title = lang.document_title;

let mountNode = document.getElementById('app');
let rootComponent = <Relay.RootContainer
    Component={mainContainer}
    route={new viewRoute() } />;
ReactDOM.render(rootComponent, mountNode);

// TODO: see here for upgrading components: http://quaintous.com/2015/07/09/react-components-with-mdl/
