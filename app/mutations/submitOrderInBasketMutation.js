/* jshint esversion: 6 */

import Relay from 'react-relay';

export default class SubmitOrderInBasketMutation extends Relay.Mutation {
    getMutation() {
        return Relay.QL`mutation {submitOrderInBasketMutation}`;
    }
    getVariables() {
        const v = {
            basketID: this.props.basketID,
             };
        return v
    }
     getFatQuery() {
        return Relay.QL`
      fragment on submitOrderInBasketPayload @relay(pattern: true) {
          view {
               me{
                  baskets
              }
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

// TODO: it's not `addItem` but `createItem`