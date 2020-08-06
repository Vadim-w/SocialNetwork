import React from 'react';
import ProfileInfo from './MyPosts/ProfileInfo/ProfileInfo';
import {ActionsTypes, DialogsPageType, ProfilePageType} from '../../Redux/store';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {CombinedState, Store} from "redux";

type propsProfileType = {
    store: Store<CombinedState<{ profilePage: ProfilePageType; dialogsPage: DialogsPageType; }>, ActionsTypes>
}


const Profile: React.FC<propsProfileType> = (props) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer store={props.store}/>
        </div>
    );
}

export default Profile;