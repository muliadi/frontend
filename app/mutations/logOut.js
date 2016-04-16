/* jshint esversion: 6 */

import Relay from 'react-relay';

export default class LogOutMutation extends Relay.Mutation {
    getMutation() {
        return Relay.QL`mutation {logOut}`;
    }
    getVariables() {
        return {}
    }
    getFatQuery() {
        return Relay.QL`
      fragment on logOutPayload @relay(pattern: true) {
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

