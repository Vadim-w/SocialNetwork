import React from 'react';
import {addPostActionCreator, onPostChangeActionCreator} from '../../../Redux/profile-reducer';
import {ActionsTypes, ProfilePageType, DialogsPageType} from '../../../Redux/store';
import {MyPosts} from "./MyPosts";
import {CombinedState, Store} from "redux";


type myPostsContainerPropsType = {
    store: Store<CombinedState<{ profilePage: ProfilePageType; dialogsPage: DialogsPageType; }>, ActionsTypes>
}

const MyPostsContainer: React.FC<myPostsContainerPropsType> = (props) => {

    let state = props.store.getState()

    let addPost = (value: string) => {
        props.store.dispatch(addPostActionCreator(value))
    }
    let onPostChange = (value: string) => {
        props.store.dispatch(onPostChangeActionCreator(value))
    }

    return (
        <MyPosts posts={state.profilePage.posts} newPostText={state.profilePage.newPostText} updateNewPostText={onPostChange} addPost={addPost}/>
    );
}

export default MyPostsContainer;