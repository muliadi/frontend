/* jshint esversion: 6*/

import React from "react"
import Relay from 'react-relay';

import AddItemMutation from "../mutations/addItem.js"

class ItemsEditor extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            base64data: null,
            name: "",
            shortDesc: "",
        }
    }    
    handleNameChange(event) {
        this.setState({name: event.target.value});
    }
    handleShortDescChange(event) {
        this.setState({shortDesc: event.target.value});
    }
    handleFileChange(event) {
        this.__fileName = event.target.value;
        var file = event.target.files[0]
        if (file) {
            // create reader
            var reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = function(e) {
                // browser completed reading file - display it
                const data = e.target.result.split(",")[1];
                this.setState({base64data: data})
            }.bind(this);
        }
    }
    handleSaveItem(event) {
        Relay.Store.commitUpdate(new AddItemMutation({
            name: this.state.name,
            shortDesc: this.state.shortDesc,
            imageBase64Data: this.state.base64data,
        }));
    }
    componentDidMount() {
        componentHandler.upgradeDom();
    }    
    render() {
        const style_card = {
            width: "100%",
            maxWidth: "320px",
            marginTop: "50px",
            flexDirection: "column",
            marginLeft: "auto",        
            marginRight: "auto",
            paddingRight:"10px",
            paddingLeft:"10px",
        };
        const style_small_image = {
            width : "100%",
            height: "100px",
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
        };
        const style_save_button = {
            marginBottom: "0px",
        }
        const style_add_image = {
            marginRight: "15px",
            marginLeft: "15px",
        }
        const style_actions = {
            display: "flex",
            flexDirection: "row-reverse",
        }
        if (this.state.base64data != null) {
            style_small_image.background = "url('data:image;base64,"+this.state.base64data+"') center / cover";
            style_small_image.height = "300px";
            style_small_image.alignItems = "flex-end";
            style_add_image.background = "rgba(200,200,200,1.0)"          
        }
        else {
            style_small_image.background = "rgba(0,0,0,0.1)";             
        }
        const style_select_category = {
            cursor: "pointer",
            color: "white",
            background: "black",
            borderRadius: "6px",
            paddingLeft: "5px",
            paddingRight: "5px",
            paddingBottom: "2px",
        }        
        return (
            <div className="mdl-card mdl-shadow--4dp" style={style_card}>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input
                        className="mdl-textfield__input"
                        type="text"
                        id="item_create_card_1"
                        onChange={this.handleNameChange.bind(this)}></input>
                    <label className="mdl-textfield__label" htmlFor="item_create_card_1">שם המוצר</label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input
                        className="mdl-textfield__input"
                        type="text"
                        id="item_create_card_2"
                        onChange={this.handleShortDescChange.bind(this)}></input>
                    <label className="mdl-textfield__label" htmlFor="item_create_card_1">תאור קצר</label>
                </div>
                
                <input id="fileinput1" type="file" style={{display:"None"}} onChange={this.handleFileChange.bind(this)}></input>
                                
                <div style={style_small_image}>
                    {this.state.base64data == null ? <div>
                        <button
                            className="mdl-button mdl-js-button mdl-button--fab"
                            style={style_add_image}
                            onClick={()=>(document.getElementById('fileinput1').click())}>                        
                            <i className="material-icons">add</i>
                        </button>
                        הוסף תמונה                        
                    </div> : null}
                </div>
                
                <div style={{marginBottom:"10px"}}>
                מוסיף לרשת: {this.props.chains[0].name}
                </div>
                
                <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", marginBottom:"20px"}}>
                {
                        this.props.categories.map(category=>{
                            return <div key={"itemeditor_on_sidebar"+category.node.id} style={{ marginRight: "10px", marginTop: "10px", fontSize:"12px" }}>
                                        <span style={style_select_category}>
                                            {category.node.full_name}                                                        
                                        </span>
                                    </div>                            
                        }
                    )
                }
                </div>
                
                <div className="mdl-card__actions mdl-card--border" style={style_actions}>
                    <button
                        style={style_save_button}
                        className="mdl-button mdl-js-button mdl-js-ripple-effect"
                        onClick={this.handleSaveItem.bind(this)}>
                        שמור
                    </button>
                    
                    {this.state.base64data != null ? 
                        <button
                            style={style_save_button}
                            className="mdl-button mdl-js-button mdl-js-ripple-effect"
                            onClick={()=>(document.getElementById('fileinput1').click())}>                        
                            שנה תמונה
                        </button> : null}                         
                </div>                
            </div> 
        );
    }
}

export default ItemsEditor;

