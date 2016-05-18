/* jshint esversion: 6 */

import Relay from 'react-relay';

export default class AddRestaurantMutation extends Relay.Mutation {
    getMutation() {
        return Relay.QL`mutation {addRestaurant}`;
    }
    getVariables() {
        const v = {
            name: this.props.name,
            address: this.props.address,
            companyNum: this.props.companyNum,
            companyName: this.props.companyName,
            dropDays: this.props.dropDays,
            isChain: this.props.isChain,
            chainID: this.props.chainID,
            base64Data: this.props.imageBase64Data,
        };
        return v
    }
    getFatQuery() {
        return Relay.QL`
      fragment on addRestaurantPayload @relay(pattern: true) {
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

// TODO: it's not `adddRestaurant` but `createRestaurant`

