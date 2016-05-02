/* jshint esversion: 6 */

import Relay from 'react-relay';

export default class AddRestaurantMutation extends Relay.Mutation {
    getMutation() {
        return Relay.QL`mutation {addRestaurant}`;
    }
    getVariables() {
        console.log(this.props);
        const v = {
            name: this.props.name,
            address: this.props.address,
            companyNum: this.props.companyNum,
            companyName: this.props.companyName,
            dropTimeTo: this.props.dropTimeTo,
            dropTimeFrom: this.props.dropTimeFrom,
            dropDays: this.props.dropDays,
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