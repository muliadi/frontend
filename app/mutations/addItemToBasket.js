/* jshint esversion: 6 */

import Relay from 'react-relay';

export default class AddItemToBasketMutation extends Relay.Mutation {
    getMutation() {
        return Relay.QL`mutation {addItemToBasket}`;
    }
    getVariables() {
        const v = {
            name: this.props.name,
            shortDesc: this.props.shortDesc,
            base64Data: this.props.imageBase64Data,
        };
        return v
    }
    getFatQuery() {
        return Relay.QL`
      fragment on addItemToBasketPayload @relay(pattern: true) {
          view {
              current_baskets
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

