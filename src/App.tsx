import React from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import NavBar from "./Components/Navbar/Navbar";
import Profile from "./Components/Profile/Profile";
import Dialogs from "./Components/Dialogs/Dialogs";
import {BrowserRouter, Route} from 'react-router-dom';
import News from './Components/News/News';
import Settings from './Components/Settings/Settings';
import Music from './Components/Music/Music';
import {StoreType} from './Redux/store'


type AppPropsType = {
    store: StoreType
}


const App: React.FC<AppPropsType> = (props) => {

    const state = props.store.getState();

    return (
        <BrowserRouter>
            <div className='app-wraper'>
                <Header/>
                <NavBar/>
                <div className='app-wraper-content'>
                    <Route path={'/dialogs'} render={() => <Dialogs dispatch={props.store.dispatch.bind(props.store)}
                                                                    dialogs={state.dialogsPage.dialogs}
                                                                    messages={state.dialogsPage.messages}
                                                                    newDialogText={state.dialogsPage.newDialogText}
                    />}/>
                    <Route path={'/profile'} render={() => <Profile dispatch={props.store.dispatch.bind(props.store)}
                                                                    posts={state.profilePage.posts}
                                                                    newPostText={state.profilePage.newPostText}
                    />}/>

                    <Route path={'/news'} render={() => <News/>}/>
                    <Route path={'/music'} render={() => <Music/>}/>
                    <Route path={'/settings'} render={() => <Settings/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
