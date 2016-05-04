/* jshint esversion: 6 */

import Relay from 'react-relay';

export default class RemoveItemFromBasketMutation extends Relay.Mutation {
    getMutation() {
        return Relay.QL`mutation {removeItemFromBasket}`;
    }
    getVariables() {
        console.log("mut: "+this.props.itemID)
        const v = {
            amount: this.props.amount,
            remarks: this.props.remarks,
            itemID: this.props.itemID,
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

