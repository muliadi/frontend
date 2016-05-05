/* jshint esversion: 6 */

import Relay from 'react-relay';

export default class EmptyBasketsMutation extends Relay.Mutation {
    getMutation() {
        return Relay.QL`mutation {emptyBaskets}`;
    }
    getVariables() {
        return {}
    }
    getFatQuery() {
        return Relay.QL`
      fragment on emptyBasketsPayload @relay(pattern: true) {
          view {
              current_items_in_baskets
            }
      }
    `;
    }
    getConfigs() {
        return [{
            type: 'FIELDS_CHANGE',
            fieldIDs: {
                view: 'view',
            }
        }];
    }
}

