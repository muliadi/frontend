/* jshint esversion: 6 */

import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import viewRoute from './routes/view_route.js';

import Main from './components/Main.js'

Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer(window.location.origin + '/graphql', {
        credentials: 'same-origin',
    })
);

let mountNode = document.getElementById('app');
let rootComponent = <Relay.RootContainer
    Component={Main}
    route={new viewRoute() } />;
ReactDOM.render(rootComponent, mountNode);

