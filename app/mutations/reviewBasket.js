/* jshint esversion: 6 */

import Relay from 'react-relay';

export default class ReviewBasketMutation extends Relay.Mutation {
    getMutation() {
        return Relay.QL`mutation {reviewBasket}`;
    }
    getVariables() {
        const v = {
            basketID: this.props.basketID,
            reviewStatus: this.props.reviewStatus,
            reviewComment: this.props.reviewComment,
        };
        return v
    }
    getFatQuery() {
        return Relay.QL`
      fragment on reviewBasketPayload @relay(pattern: true) {
          view {
              me {
                  role_sapak {
                      baskets
                  }
              }
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


