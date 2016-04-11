/* jshint esversion: 6 */

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import ItemCard from './ItemCard.js';
import ItemCreateCard from './ItemCreateCard.js';
import {lang} from '../lang/heb.js';

//import HomeRoute from '../routes/home_route.js';




const Main = class extends React.Component {
    render() {
        var style_grid = {
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "1400px"
        };
        var style_cell = {
            marginLeft: "auto",
            marginRight: "auto",
        };

        const clicked = () => {
            console.log("Clicked!!!");
        }

        console.log(this.props.store);
        return (
            <div className="mdl-grid" style={style_grid}>
                {
                    this.props.store.edges.map(item => {
                        return <div className="mdl-cell mdl-cell--3-col-desktop mdl-cell--4-col-tablet mdl-cell--4-col-phone" style={style_cell}>
                        <ItemCard
                            name={item.node.name}
                            short_desc={item.node.short_desc}
                            image={item.node.small_image.base64data}>
                        </ItemCard>
                        </div>
                    })

                }
            <ItemCreateCard clicked={clicked}></ItemCreateCard>
            </div>
        );
    }
};

class HackerNewsRoute extends Relay.Route {
  static routeName = 'HackerNewsRoute';
  static queries = {
    store: ((Component) => {
      // Component is our Item
      return Relay.QL`
        query items {
            items {
                ${Component.getFragment('store')},
            }
        }
    `}),
  };
}
const MainContainer = Relay.createContainer(Main, {
fragments: {
    store: () => Relay.QL`
        fragment on item_connectionConnection {
            edges {
                node {
                    name
                    short_desc
                    small_image {
                        base64data
                    }
                }
            }
        }
    `,
  },});

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer(window.location.origin + '/graphql')
);

document.title = lang.document_title;

let mountNode = document.getElementById('app');
let rootComponent = <Relay.RootContainer
  Component={MainContainer}
  route={new HackerNewsRoute()} />;
ReactDOM.render(rootComponent, mountNode);
