/* jshint esversion: 6 */

import Relay from 'react-relay';

export default class extends Relay.Route {
    static path = '/';
    static queries = {
    all_items: () => Relay.QL`
        query {
            items {
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
        }
    `,
    };
    static routeName = 'HomeRoute';
}

