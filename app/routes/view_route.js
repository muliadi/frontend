/* jshint esversion: 6 */

import Relay from 'react-relay';


export default class viewRoute extends Relay.Route {
    static routeName = 'viewRoute';
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
