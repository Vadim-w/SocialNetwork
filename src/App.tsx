import React from 'react';
import './App.css';
import NavBar from "./Components/Navbar/Navbar";
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import News from './Components/News/News';
import Settings from './Components/Settings/Settings';
import Music from './Components/Music/Music';
import UsersContainerComponent from './Components/Users/UsersContainer';
import HeaderContainer from './Components/Header/HeaderContainer';
import Login from './Components/Login/Login';
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {setInitializedAppTC} from "./Redux/app-reducer";
import {RootStateType, store} from "./Redux/redux-store";
import {Preloader} from "./common/preloader/Preloader";
import {WithSuspense} from "./hoc/WithSuspense";


const DialogsContainer = React.lazy(() => import('./Components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));

type AppContainerPropsType = {
    setInitializedAppTC: () => void
    initialized: boolean
}


class App extends React.Component<AppContainerPropsType> {
    catchAllUnhandledErrors = (promiseRejectionEvent: any) => {
        alert("some error occured")
    }

    componentDidMount() {
        this.props.setInitializedAppTC()
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }
    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
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
                    <Route path={'/dialogs'} render={WithSuspense(DialogsContainer)}/>
                    <Route path={'/profile/:userId?'} render={WithSuspense(ProfileContainer)}/>
                    <Route path={'/users'} render={() => <UsersContainerComponent/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>

                    <Route path={'/news'} render={() => <News/>}/>
                    <Route path={'/music'} render={() => <Music/>}/>
                    <Route path={'/settings'} render={() => <Settings/>}/>
                </div>
            </div>
        )
            ;
    }
}

const mapStateToProps = (state: RootStateType) => ({
    initialized: state.app.initialized
})


let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {setInitializedAppTC}))(App) as React.ComponentType;

export const MainApp = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}