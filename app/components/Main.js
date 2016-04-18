/* jshint esversion: 6 */

import React from 'react';
import Relay from 'react-relay';

import Footer from './footer.js';

import ItemGrid from './ItemGrid.js';
import UserGrid from './UserGrid.js';
import SapakGrid from './SapakGrid.js';
import LoggedUserInfo from './LoggedUserInfo.js';
import LogInOrCreateUser from './LogInOrCreateUser.js';
import LogOutMutation from '../mutations/logOut.js';

import {lang} from '../lang/heb.js';

const MainSub = class extends React.Component {
    render() {
        document.title = lang.document_title;
        const style_logged_image_small = {
            height: "35px",
            width: "35px",
            marginRight: "15px",
            borderRadius: "7px",
            cursor: "pointer",
            background: "url('/content/" + this.props.view.me.small_image.id + "') center / cover",
        }
        const style_login_button = {
            color: "rgb(230,230,230)",
            fontSize: "19px",
        }
        const logOut = () => {
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
                                            onClick={() => (document.getElementsByClassName('mdl-layout__drawer-button')[0].click()) }>
                                        </div>
                                        :
                                        <button id="show-dialog-new-user" className="mdl-button mdl-js-button"
                                            style={style_login_button}
                                            onClick={() => (document.getElementsByClassName('mdl-layout__drawer-button')[0].click()) }>
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
                            <LogInOrCreateUser callback={() => (document.getElementsByClassName('mdl-layout__drawer-button')[0].click()) }></LogInOrCreateUser>
                        }
                    </div>

                    <main className="mdl-layout__content">
                        <section className="mdl-layout__tab-panel is-active" id="scroll-tab-1">
                            <div className="page-content">
                                <ItemGrid view={this.props.view}></ItemGrid>
                            </div>
                        </section>
                        <section className="mdl-layout__tab-panel" id="scroll-tab-2">
                            <div className="page-content">
                                <UserGrid view={this.props.view}></UserGrid>
                            </div>
                        </section>
                        <section className="mdl-layout__tab-panel" id="scroll-tab-3">
                            <div className="page-content">
                                <SapakGrid view={this.props.view}></SapakGrid>
                            </div>
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

const Main = Relay.createContainer(MainSub, {
    fragments: {
        view: (xxx) => Relay.QL`
        fragment on view {
            ${ItemGrid.getFragment('view')},
            ${UserGrid.getFragment('view')},
            ${SapakGrid.getFragment('view')},
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

export default Main

