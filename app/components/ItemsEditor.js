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
            priceInShekalim: "",
            selectedCategories: [],
            selectedUnit: null,
            amount: "",
        }
    }    
    handleNameChange(event) {
        this.setState({name: event.target.value});
    }
    handleAmountChange(event) {
        this.setState({amount: event.target.value});
    }
    handleShortDescChange(event) {
        this.setState({shortDesc: event.target.value});
    }
    handlePriceChange(event) {
        this.setState({priceInShekalim: event.target.value});
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
            background: "rgba(10,120,20,0.05)",            
            paddingTop: "10px",
            flexDirection: "column",
            paddingLeft: "0px",        
            paddingRight: "25px",
            borderLeft:"rgba(50,50,50,0.2) solid 1px",
            
            position:"fixed",
            height:"100%",
            width:"390px",
            display: "flex",
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
        const style_header = {
            display: "flex",
            flexDirection: "row",
            paddingBottom:"7px",
            borderBottom:"rgba(50,50,50,0.2) solid 1px",
            marginRight:"-20px",
            paddingRight:"20px",
            paddingTop:"7px",
            flexShrink:0,
            flexGrow:0,
        }
        const style_footer = {
            width: "auto",
            textAlign: "center",
            minHeight: "50px",
            marginBottom: "60px",
            padding: "0px 35px 10px 10px",
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            fontSize: "15px",
            borderTop: "rgba(50,50,50,0.4) solid 1px",
            marginRight: "-20px",
        }
        const style_box = {
            margin: "0px",
            padding:   "0px",
            display: "flex",
            width: "100%",
            flexDirection:"column",
            flexGrow: "1",            
            wordWrap: "break-word",
            overflow: "auto",
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
        const style_filtering_category = {
            fontSize: "12px",
            marginTop: "5px",
            color: "white",
            background: "rgba(0,128,0,0.7)",
            borderRadius: "6px",
            paddingLeft: "5px",
            paddingBottom: "2px",
            marginRight: "7px",
            display: "flex",
            height: "18px",
        }      
        const style_selected_unit = {
            cursor: "default",
            background: "rgba(20,100,230,0.4)",
            fontSize:"15px",
            borderRadius: "5px",
            marginRight:"5px",            
            border: "red solid 1px",
            padding:"3px",
        }   
        const style_unit_select = {
            cursor: "pointer",
            background: "rgba(20,100,230,0.4)",
            fontSize:"15px",
            borderRadius: "5px",
            marginRight:"5px",
            padding:"3px",
        }      
        return (
            <div style={style_card}>
            
                <div style={style_header}>            
                    <div style={{marginBottom:"10px", fontSize:"17px"}}>
                    מוצר לרשת {this.props.chains[0].name}
                    </div>
                </div>
            
                
                <div style={style_box}>
                    <div style={{width: "96%"}}>
                    <div style={{display:"flex", flexDirection:"row"}}>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"  style={{width:"180px"}}>
                            <input
                                className="mdl-textfield__input"
                                type="text"
                                id="item_create_card_1"
                                onChange={this.handleNameChange.bind(this)}></input>
                            <label className="mdl-textfield__label" htmlFor="item_create_card_1">שם המוצר</label>
                        </div>
                        
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"  style={{width:"180px", marginRight:"20px"}}>
                            <input
                                className="mdl-textfield__input"
                                type="text"
                                id="item_create_card_ldfksd7fm"
                                onChange={this.handlePriceChange.bind(this)}></input>
                            <label className="mdl-textfield__label" htmlFor="item_create_card_ldfksd7fm">מחיר בש״ח</label>
                        </div>
                    </div>
                    
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style={{width:"380px", marginTop:"-10px"}}>
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
                    
                    <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", marginBottom:"10px"}}>
                    {
                            this.state.selectedCategories.map(category=>{
                                return <div
                                    key={"itemeditor_on_sidebar_category_selected"+category.id}
                                    style={style_filtering_category}>
                                    
                                    
                                        <div style={{
                                            cursor: "pointer",
                                            borderRadius: "50px",
                                            marginLeft: "5px",
                                            backgroundColor: "rgba(0, 70, 0, 0.701961)",
                                            paddingRight: "5px",
                                            paddingLeft: "5px",
                                            height: "20px",
                                        }}
                                            onClick={() => {
                                                const newSelectedCategories = this.state.selectedCategories.filter(sc=>sc.id != category.id)
                                                this.setState({
                                                    selectedCategories: newSelectedCategories,
                                                }) 
                                            }}>
                                            x
                                        </div>
                                    {category.full_name}                                        
                                    </div>                            
                            }
                        )
                    }
                    </div>

                    <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", marginBottom:"20px"}}>
                    {
                            this.props.categories.map(category=>{
                                return <div
                                    key={"itemeditor_on_sidebar"+category.node.id}
                                    style={{ marginRight: "7px", marginTop: "3px", fontSize:"12px" }}
                                    onClick={()=>{
                                        for (let sc of this.state.selectedCategories) {
                                            if (sc.id == category.node.id) {
                                                return
                                            }
                                        }
                                        const newSelectedCategories = this.state.selectedCategories.slice(0)
                                        newSelectedCategories.push(category.node) 
                                        this.setState({
                                            selectedCategories: newSelectedCategories,
                                        })
                                    }}>
                                            <span style={style_select_category}>
                                                {category.node.full_name}                                                        
                                            </span>
                                        </div>                            
                            }
                        )
                    }
                    </div>
                    
                    <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", marginBottom:"20px"}}>
                    {
                            this.props.units.map(unit=>{
                                return <div
                                    key={"itemeditor_on_sidebar_unit"+unit.node.id}
                                    style={{ marginRight: "7px", marginTop: "3px", fontSize:"12px" }}
                                    onClick={()=>{
                                        this.setState({
                                            selectedUnit: unit.node,
                                        })
                                    }}>
                                            <span style={((this.state.selectedUnit!=null)&&(unit.node.id==this.state.selectedUnit.id))? style_selected_unit : style_unit_select}>
                                                {unit.node.name}                                                        
                                            </span>
                                        </div>                            
                            }
                        )
                    }
                    </div>
                    
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"  style={{width:"180px"}}>
                        <input
                            className="mdl-textfield__input"
                            type="text"
                            id="item_create_card_ldfksd7dfghdfgfm"
                            onChange={this.handleAmountChange.bind(this)}></input>
                        <label className="mdl-textfield__label" htmlFor="item_create_card_ldfksd7dfghdfgfm">כמות מהיחידות</label>
                    </div>
                    
                </div>
                </div>
                            
                <div style={style_footer}>
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

