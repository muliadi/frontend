/* jshint esversion: 6 */

import React from 'react';
import ReactDOM from 'react-dom';

import ItemCard from './ItemCard.js';
import {lang} from '../lang/heb.js';

const Main = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {

        fetchql('{current_session}')
        .then(r => {
                this.setState({a: r.data.current_session});
            });
        fetchql(`
            {
                items{
                    name
                    short_desc
                    small_image{
                    base64data
                    }
                }
            }`)
        .then(r => {
                this.setState({items: r.data.items});
            });
    }

    render() {
        var style_grid = {
            marginLeft: "auto;",        
            marginRight: "auto;",
            maxWidth: "1400px;"        
        };
        var style_cell = {
            marginLeft: "auto;",        
            marginRight: "auto;",
        };
        
        return (
            <div className="mdl-grid" style={style_grid}>      
                {
                    this.state.items.map(item => {
                        return <div className="mdl-cell mdl-cell--3-col-desktop mdl-cell--4-col-tablet mdl-cell--2-col-phone" style={style_cell}> 
                        <ItemCard
                            name={item.name}
                            short_desc={item.short_desc}
                            image={item.small_image.base64data}>
                        </ItemCard>                        
                        </div>
                    })
                }
            </div>
        );
    }
};

document.title = lang.document_title;
ReactDOM.render( <Main /> , document.getElementById('app'));
