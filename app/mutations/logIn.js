/* jshint esversion: 6 */

import Relay from 'react-relay';

export default class LogInMutation extends Relay.Mutation {
    getMutation() {
        return Relay.QL`mutation {logIn}`;
    }
    getVariables() {
        const v = {
            mail: this.props.mail,
            password: this.props.password,
        };
        return v
    }
    getFatQuery() {
        return Relay.QL`
      fragment on logInPayload @relay(pattern: true) {
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

