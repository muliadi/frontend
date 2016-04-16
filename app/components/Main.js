/* jshint esversion: 6 */

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import Footer from './footer.js';

import ItemCard from './ItemCard.js';
import ItemCreateCard from './ItemCreateCard.js';
import UserCard from './UserCard.js';
import LoggedUserInfo from './LoggedUserInfo.js';
import LogInOrCreateUser from './LogInOrCreateUser.js';

import LogOutMutation from '../mutations/logOut.js';

import {lang} from '../lang/heb.js';

import viewRoute from '../routes/view_route.js';

// TODO: break the tabs into a component each
const Main = class extends React.Component {
    render() {
        const style_grid = {
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "1400px"
        };
        const style_cell = {
            marginLeft: "auto",
            marginRight: "auto",
        };
        const style_logged_image_small = {
            height: "35px",
            width: "35px",
            marginRight: "15px",
            borderRadius: "7px",
            cursor:"pointer",
            background: "url('/content/" + this.props.view.me.small_image.id + "') center / cover",
        }
        const style_login_button = {
            color: "rgb(230,230,230)",
            fontSize: "19px",
        }
        const logOut = ()=>{
            console.log("logging out!");
            Relay.Store.commitUpdate(new LogOutMutation());            
            document.getElementsByClassName('mdl-layout__drawer-button')[0].click();            
        }
        return (
            <div className="mdl-layout__container">

                <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                    <header className="mdl-layout__header mdl-layout__header--waterfall">
                        <div className="mdl-layout__header-row">
                            <span className="mdl-layout-title">שוק הספקים</span>
                            <div className="mdl-layout-spacer"></div>

                            <nav className="mdl-navigation">
                                {
                                    this.props.view.me.is_logged ?
                                        <div style={style_logged_image_small}
                                            onClick={()=>(document.getElementsByClassName('mdl-layout__drawer-button')[0].click())}>
                                        </div>
                                        :
                                        <button id="show-dialog-new-user" className="mdl-button mdl-js-button"
                                            style={style_login_button}
                                            onClick={()=>(document.getElementsByClassName('mdl-layout__drawer-button')[0].click())}>
                                            רישום וכניסה
                                        </button>
                                }
                            </nav>

                        </div>
                        <div className="mdl-layout__tab-bar mdl-js-ripple-effect">
                            <a href="#scroll-tab-1" className="mdl-layout__tab is-active">כל המוצרים</a>
                            <a href="#scroll-tab-2" className="mdl-layout__tab">כל המשתמשים</a>
                            <a href="#scroll-tab-3" className="mdl-layout__tab">כל הספקים</a>
                            <a href="#scroll-tab-4" className="mdl-layout__tab">הסל שלי</a>
                        </div>
                    </header>

                    <div className="mdl-layout__drawer">
                        <span className="mdl-layout-title">שוק הספקים</span>
                            {this.props.view.me.is_logged ?          
                                <div>                       
                                    <LoggedUserInfo mail={this.props.view.me.mail} login_id={this.props.view.me.login_id} full_name={this.props.view.me.full_name} image_id={this.props.view.me.small_image.id}></LoggedUserInfo>
                                    <nav className="mdl-navigation">
                                        <a className="mdl-navigation__link"
                                            onClick={logOut}>
                                            צא</a>
                                        <a className="mdl-navigation__link" href="">עדכן פרטים</a>
                                        <a className="mdl-navigation__link" href="">השאר פידבק!</a>
                                    </nav>
                                </div>                                    
                                :
                                <LogInOrCreateUser callback={()=>(document.getElementsByClassName('mdl-layout__drawer-button')[0].click())}></LogInOrCreateUser>
                            }
                        
                    </div>

                    <main className="mdl-layout__content">
                        <section className="mdl-layout__tab-panel is-active" id="scroll-tab-1">
                            <div className="page-content">


                                <div className="mdl-grid" style={style_grid}>
                                    {
                                        this.props.view.items.edges.map(item => {
                                            return <div className="mdl-cell mdl-cell--3-col-desktop mdl-cell--4-col-tablet mdl-cell--4-col-phone" style={style_cell}>
                                                <ItemCard
                                                    name={item.node.name}
                                                    short_desc={item.node.short_desc}
                                                    image_id={item.node.small_image.id}>
                                                </ItemCard>
                                            </div>
                                        })

                                    }
                                    <ItemCreateCard></ItemCreateCard>
                                </div>


                            </div>
                        </section>
                        <section className="mdl-layout__tab-panel" id="scroll-tab-2">
                            <div className="page-content">


                                <div className="mdl-grid" style={style_grid}>
                                    {
                                        this.props.view.users.edges.map(user => {
                                            return <div className="mdl-cell mdl-cell--3-col-desktop mdl-cell--4-col-tablet mdl-cell--4-col-phone" style={style_cell}>
                                                <UserCard
                                                    login_id={user.node.login_id}
                                                    full_name={user.node.full_name}
                                                    mail={user.node.mail}
                                                    image_id={user.node.small_image.id}>
                                                </UserCard>
                                            </div>
                                        })

                                    }
                                </div>



                            </div>
                        </section>
                        <section className="mdl-layout__tab-panel" id="scroll-tab-3">
                            <div className="page-content">1234567</div>
                        </section>
                        <section className="mdl-layout__tab-panel" id="scroll-tab-4">
                            <div className="page-content">1234567</div>
                        </section>

                        <Footer></Footer>

                    </main>
                </div>

            </div>
        );
    }
};

const mainContainer = Relay.createContainer(Main, {
    fragments: {
        view: () => Relay.QL`
        fragment on view {
            items(first: 30) {
                edges{
                    node {
                        ... on item {
                            name
                            short_desc
                            small_image {
                                id
                            } 
                        }  
                    }
                }
            }
            users(first:30) {
                edges {
                    node {
                        ... on user {
                            login_id
                            full_name
                            mail
                            small_image {
                                id
                            }
                        }
                    }
                }
            }      
            me {
                is_logged
                login_id
                full_name
                mail
                small_image {
                    id
                }
            }      
        }
    `,
    },
});


Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer(window.location.origin + '/graphql', {
        credentials: 'same-origin',
    })
);

document.title = lang.document_title;

let mountNode = document.getElementById('app');
let rootComponent = <Relay.RootContainer
    Component={mainContainer}
    route={new viewRoute() } />;
ReactDOM.render(rootComponent, mountNode);

// TODO: see here for upgrading components: http://quaintous.com/2015/07/09/react-components-with-mdl/




