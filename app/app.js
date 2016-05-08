/* jshint esversion: 6 */


import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import viewRoute from './routes/view_route.js';

import Main from './components/Main.js'
import Utils from './utils/utils.js'

let mountNode = document.getElementById('app');
let rootComponent = <Relay.RootContainer
    Component={Main}
    route={new viewRoute() } />;

Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer(window.location.origin + '/graphql', {
        credentials: 'same-origin',
    })
);

ReactDOM.render(rootComponent, mountNode);

