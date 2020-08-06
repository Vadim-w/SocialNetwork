import React from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import NavBar from "./Components/Navbar/Navbar";
import Profile from "./Components/Profile/Profile";
import {BrowserRouter, Route} from 'react-router-dom';
import News from './Components/News/News';
import Settings from './Components/Settings/Settings';
import Music from './Components/Music/Music';
import {ActionsTypes, DialogsPageType, ProfilePageType} from './Redux/store'
import {CombinedState, Store} from "redux";
import {store} from "./Redux/redux-store";
import {DialogsContainer} from "./Components/Dialogs/DialogsContainer";


type AppPropsType = {
    store: Store<CombinedState<{ profilePage: ProfilePageType; dialogsPage: DialogsPageType; }>, ActionsTypes>
}


const App: React.FC<AppPropsType> = (props) => {

    return (
        <BrowserRouter>
            <div className='app-wraper'>
                <Header/>
                <NavBar/>
                <div className='app-wraper-content'>
                    <Route path={'/dialogs'} render={() => <DialogsContainer store={store}/>}/>
                    <Route path={'/profile'} render={() => <Profile store={store}/>}/>

                    <Route path={'/news'} render={() => <News/>}/>
                    <Route path={'/music'} render={() => <Music/>}/>
                    <Route path={'/settings'} render={() => <Settings/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
