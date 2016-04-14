/* jshint esversion: 6 */

import Relay from 'react-relay';

export default class itemsRoute extends Relay.Route {
    static routeName = 'itemsRoute';
    static queries = {
        view: ((Component) => {
            // Component is our Item
            return Relay.QL`
       query {
            view {
                ${Component.getFragment('view')},
            }
        }
    `}),
    };
}
