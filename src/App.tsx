import React from 'react';
import './App.css';
import NavBar from "./Components/Navbar/Navbar";
import {Route} from 'react-router-dom';
import News from './Components/News/News';
import Settings from './Components/Settings/Settings';
import Music from './Components/Music/Music';
import {DialogsContainer} from "./Components/Dialogs/DialogsContainer";
import UsersContainer from './Components/Users/UsersContainer';
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from './Components/Header/HeaderContainer';



const App = () => {

    return (
            <div className='app-wraper'>
                <HeaderContainer/>
                <NavBar/>
                <div className='app-wraper-content'>
                    <Route path={'/dialogs'} render={() => <DialogsContainer/>}/>
                    <Route path={'/profile/:userId?'} render={() => <ProfileContainer/>}/>
                    <Route path={'/users'} render={() => <UsersContainer/>}/>

                    <Route path={'/news'} render={() => <News/>}/>
                    <Route path={'/music'} render={() => <Music/>}/>
                    <Route path={'/settings'} render={() => <Settings/>}/>
                </div>
            </div>
    );
}

export default App;
