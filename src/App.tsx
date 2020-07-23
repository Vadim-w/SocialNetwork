import React from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
import Profile from "./Components/Profile/Profile";
import Dialogs from "./Components/Dialogs/Dialogs";
import {BrowserRouter, Route} from 'react-router-dom';
import News from './Components/News/News';
import Settings from './Components/Settings/Settings';
import Music from './Components/Music/Music';
import {RootStateType} from './Redux/state'



type AppPropsType = {
    state: RootStateType
    addPost: (postMessage: string) => void
    addDialog:(textDialog: string) => void
    updateNewPostText: (newText: string) => void
    updateNewDialogText: (newText: string) => void
}



const App: React.FC<AppPropsType> = (props) => {
    return (
        <BrowserRouter>
            <div className='app-wraper'>
                <Header/>
                <Navbar/>
                <div className='app-wraper-content'>
                    <Route path={'/dialogs'} render={() => <Dialogs dialogs={props.state.dialogsPage.dialogs}
                                                                    addDialog={props.addDialog}
                                                                    messages={props.state.dialogsPage.messages}
                                                                    newDialogText = {props.state.dialogsPage.newDialogText}
                                                                    updateNewDialogText={props.updateNewDialogText}
                    />}/>
                    <Route path={'/profile'} render={() => <Profile posts={props.state.profilePage.posts}
                                                                    addPost={props.addPost}
                                                                    newPostText={props.state.profilePage.newPostText}
                                                                    updateNewPostText={props.updateNewPostText} /> }/>

                    <Route path={'/news'} render={() => <News/>}/>
                    <Route path={'/music'} render={() => <Music/>}/>
                    <Route path={'/settings'} render={() => <Settings/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
