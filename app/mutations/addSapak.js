/* jshint esversion: 6 */

import Relay from 'react-relay';

export default class AddSapakMutation extends Relay.Mutation {
    getMutation() {
        return Relay.QL`mutation {addSapak}`;
    }
    getVariables() {
        const v = {
            name: this.props.name,
            mail: this.props.mail,
            city: this.props.city,
            shortDesc: this.props.shortDesc,
            base64Data: this.props.imageBase64Data,
        };
        return v
    }
    getFatQuery() {
        return Relay.QL`
      fragment on addSapakPayload @relay(pattern: true) {
          view {
              sapakim
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

