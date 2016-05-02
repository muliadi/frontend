/* jshint esversion: 6 */

import Relay from 'react-relay';

export default class AddItemMutation extends Relay.Mutation {
    getMutation() {
        return Relay.QL`mutation {addItem}`;
    }
    getVariables() {
        const v = {
            name: this.props.name,
            shortDesc: this.props.shortDesc,
            base64Data: this.props.imageBase64Data,
        };
        return v
    }
    getFatQuery() {
        return Relay.QL`
      fragment on addItemPayload @relay(pattern: true) {
          view {items}
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