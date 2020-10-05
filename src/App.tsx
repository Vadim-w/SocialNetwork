import React from 'react';
import './App.css';
import NavBar from "./Components/Navbar/Navbar";
import {Route, withRouter} from 'react-router-dom';
import News from './Components/News/News';
import Settings from './Components/Settings/Settings';
import Music from './Components/Music/Music';
import UsersContainerComponent from './Components/Users/UsersContainer';
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from './Components/Header/HeaderContainer';
import Login from './Components/Login/Login';
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import {connect} from "react-redux";
import {compose} from "redux";
import {setInitializedAppTC} from "./Redux/app-reducer";
import {RootStateType} from "./Redux/redux-store";
import {Preloader} from "./common/preloader/Preloader";

type AppContainerPropsType = {
    setInitializedAppTC: () => void
    initialized: boolean
}


class App extends React.Component<AppContainerPropsType> {
    componentDidMount() {
        this.props.setInitializedAppTC()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wraper'>
                <HeaderContainer/>
                <NavBar/>
                <div className='app-wraper-content'>
                    <Route path={'/dialogs'} render={() => <DialogsContainer/>}/>
                    <Route path={'/profile/:userId?'} render={() => <ProfileContainer/>}/>
                    <Route path={'/users'} render={() => <UsersContainerComponent/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>

                    <Route path={'/news'} render={() => <News/>}/>
                    <Route path={'/music'} render={() => <Music/>}/>
                    <Route path={'/settings'} render={() => <Settings/>}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootStateType) => ({
    initialized: state.app.initialized
})


export default compose(
    withRouter,
    connect(mapStateToProps, {setInitializedAppTC}))(App) as React.ComponentType;
