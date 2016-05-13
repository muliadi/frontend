/* jshint esversion: 6 */

import Relay from 'react-relay';

export default class JoinRestaurantToChainMutation extends Relay.Mutation {
    getMutation() {
        return Relay.QL`mutation {acceptToChainMutation}`;
    }
    getVariables() {
        const v = {
            restaurantID: this.props.restaurantID,
        };
        return v
    }
    getFatQuery() {
        return Relay.QL`
      fragment on acceptToChainPayload @relay(pattern: true) {
          view {
              restaurants
              me
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


