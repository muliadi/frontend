/* jshint esversion: 6 */

import Relay from 'react-relay';

export default class AddUserMutation extends Relay.Mutation {
    getMutation() {
        return Relay.QL`mutation {addUser}`;
    }
    getVariables() {
        const v = {
            full_name: this.props.full_name,
            password: this.props.password,
            mail: this.props.mail,
            base64Data: this.props.imageBase64Data,
        };
        return v
    }
    getFatQuery() {
        return Relay.QL`
      fragment on addUserPayload @relay(pattern: true) {
          view {
              users
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

// TODO: it's not `addUser` but `createUser`
