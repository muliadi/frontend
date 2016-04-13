/* jshint esversion: 6 */

import Relay from 'react-relay';

var __id = 0;

export default class AddItemMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {addItem}`;
  }
  getVariables() {
    __id += 1
    const v = {
        name: this.props.name,
        shortDesc: this.props.shortDesc,
        base64Data: this.props.imageBase64Data,
        clientMutationId: "adding_an_image"+__id,
    };
    console.log("name: "+v.name)
    console.log("short: "+v.shortDesc)
    console.log("data: "+v.imageBase64Data)
    console.log("clientMutationId: "+v.clientMutationId)
    return v 
  }
  getFatQuery() {
    return Relay.QL`
      fragment on addItemPayload {
          root {items}
          newItem
      }
    `;
  }
getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'root',
      parentID: 'root',
      connectionName: 'items',
      edgeName: 'newItem',
      rangeBehaviors: {
        '': 'append',
        'orderby(newest)': 'prepend',
      },
    }];
  }
}

