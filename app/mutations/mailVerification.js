/* jshint esversion: 6 */

import Relay from 'react-relay';

export default class MailVerificationMutation extends Relay.Mutation {
    getMutation() {
        return Relay.QL`mutation {verification}`;
    }
    getVariables() {
        const v = {
            hash: this.props.hash,
        };
        return v
    }
    getFatQuery() {
        return Relay.QL`
      fragment on verificationPayload @relay(pattern: true) {
          view {
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

