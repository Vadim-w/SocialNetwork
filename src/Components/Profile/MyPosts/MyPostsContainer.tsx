import React from 'react';
import {addPostActionCreator, onPostChangeActionCreator} from '../../../Redux/profile-reducer';
import {MyPosts} from "./MyPosts";
import {StoreContext} from '../../../StoreContext';



const MyPostsContainer = () => {

    return (
        <StoreContext.Consumer>
            {(store) => {
                let addPost = (value: string) => {
                    store.dispatch(addPostActionCreator(value))
                }
                let onPostChange = (value: string) => {
                    store.dispatch(onPostChangeActionCreator(value))
                }
                let state = store.getState()
                return <MyPosts posts={state.profilePage.posts}
                                newPostText={state.profilePage.newPostText}
                                updateNewPostText={onPostChange}
                                addPost={addPost}/>
            }
            }
        </StoreContext.Consumer>
    );
}

export default MyPostsContainer;