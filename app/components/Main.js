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
        return (
            <div className="centered">      
                {
                    this.state.items.map(item => {
                        return <ItemCard
                            name={item.name}
                            short_desc={item.short_desc}
                            image={item.small_image.base64data}>
                        </ItemCard>                        
                    })
                }
            </div>
        );
    }
};

document.title = lang.document_title;
ReactDOM.render( <Main /> , document.getElementById('app'));
