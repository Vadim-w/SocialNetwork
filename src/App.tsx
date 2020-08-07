import React from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import NavBar from "./Components/Navbar/Navbar";
import Profile from "./Components/Profile/Profile";
import {Route} from 'react-router-dom';
import News from './Components/News/News';
import Settings from './Components/Settings/Settings';
import Music from './Components/Music/Music';
import {DialogsContainer} from "./Components/Dialogs/DialogsContainer";


const App = () => {

    return (
            <div className='app-wraper'>
                <Header/>
                <NavBar/>
                <div className='app-wraper-content'>
                    <Route path={'/dialogs'} render={() => <DialogsContainer/>}/>
                    <Route path={'/profile'} render={() => <Profile/>}/>

                    <Route path={'/news'} render={() => <News/>}/>
                    <Route path={'/music'} render={() => <Music/>}/>
                    <Route path={'/settings'} render={() => <Settings/>}/>
                </div>
            </div>
    );
}

export default App;
