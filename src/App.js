import './App.css';
import './Reset.css';
import {Route, Routes, Navigate} from 'react-router-dom';
import NavBarContainer from './components/navBar/NavBarContainer';
import UsersContainer from './components/users/UsersContainer';
import {withRouter} from './components/profile/ProfileContainer';
import HeaderContainer from './components/header/HeaderContainer';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {initializeApp} from './redux/appReducer';
import Preloader from './components/Common/Preloader/Preloader';

const ProfileContainer = React.lazy(() => import('./components/profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/dialogs/DialogsContainer'));
const News = React.lazy(() => import('./components/news/News'));
const Music = React.lazy(() => import('./components/music/Music'));
const Setting = React.lazy(() => import('./components/setting/Setting'));
const Friends = React.lazy(() => import('./components/friends/Friends'));
const Login = React.lazy(() => import('./components/login/Login'));

const mainRoute = '/'
export const routes = {
    MAIN: `${mainRoute}/`,
    PROFILE: `${mainRoute}/profile`,
    USER: `${mainRoute}/profile/:userId`,
    DIALOGS: `${mainRoute}/dialogs`,
    NEWS: `${mainRoute}/news`,
    MUSIC: `${mainRoute}/music`,
    USERS: `${mainRoute}/users`,
    SETTING: `${mainRoute}/setting`,
    FRIENDS: `${mainRoute}/friends`,
    LOGIN: `${mainRoute}/login`,
}

class App extends Component {

    componentDidMount() {
        this.props.initializeApp();
    }


    render() {

        if (!this.props.initialized) {
            return (
                <Preloader/>
            )
        }

        return (
            <div className={'wrapperMain'}>
                <HeaderContainer/>
                <NavBarContainer/>
                <main className={'contentMain'}>
                    <React.Suspense fallback={<Preloader/>}>
                        <Routes>
                            <Route path={routes.MAIN} element={<Navigate to='/profile'/>}/>
                            <Route path={routes.PROFILE} element={<ProfileContainer/>}/>
                            <Route path={routes.USER} element={<ProfileContainer/>}/>
                            <Route path={routes.DIALOGS}element={<DialogsContainer/>}/>
                            <Route path={routes.NEWS} element={<News/>}/>
                            <Route path={routes.MUSIC} element={<Music/>}/>
                            <Route path={routes.USERS} element={<UsersContainer/>}/>
                            <Route path={routes.SETTING} element={<Setting/>}/>
                            <Route path={routes.FRIENDS} element={<Friends/>}/>
                            <Route path={routes.LOGIN} element={<Login/>}/>
                            <Route exact path='*' element={<div>404 NOT FOUND</div>}/>
                        </Routes>
                    </React.Suspense>

                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

