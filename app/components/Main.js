/* jshint esversion: 6 */

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import Footer from './footer.js';
import ItemCard from './ItemCard.js';
import ItemCreateCard from './ItemCreateCard.js';
import {lang} from '../lang/heb.js';

import itemsRoute from '../routes/items_route.js';

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
                        <a href="#starks-panel" className="mdl-tabs__tab is-active">מוצרים</a>
                        <a href="#lannisters-panel" className="mdl-tabs__tab">ספקים</a>
                        <a href="#targaryens-panel" className="mdl-tabs__tab">הסלים שלי</a>
                    </div>

                    <div className="mdl-tabs__panel is-active" id="starks-panel">
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
                    <div className="mdl-tabs__panel" id="lannisters-panel">
                        <ul>
                            <li>Tywin</li>
                            <li>Cersei</li>
                            <li>Jamie</li>
                            <li>Tyrion</li>
                        </ul>
                    </div>
                    <div className="mdl-tabs__panel" id="targaryens-panel">
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
    route={new itemsRoute() } />;
ReactDOM.render(rootComponent, mountNode);

// TODO: see here for upgrading components: http://quaintous.com/2015/07/09/react-components-with-mdl/
