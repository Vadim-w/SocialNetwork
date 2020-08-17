import React from 'react';
import {addPostActionCreator, onPostChangeActionCreator} from '../../../Redux/profile-reducer';
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {ActionsTypes, RootStateType} from "../../../Redux/store";



// const MyPostsContainer = () => {
//
//     return (
//         <StoreContext.Consumer>
//             {(store) => {
//                 let addPost = (value: string) => {
//                     store.dispatch(addPostActionCreator(value))
//                 }
//                 let onPostChange = (value: string) => {
//                     store.dispatch(onPostChangeActionCreator(value))
//                 }
//                 let state = store.getState()
//                 return <MyPosts posts={state.profilePage.posts}
//                                 newPostText={state.profilePage.newPostText}
//                                 updateNewPostText={onPostChange}
//                                 addPost={addPost}/>
//             }
//             }
//         </StoreContext.Consumer>
//     );
// }

let mapStateToProps = (state: RootStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
let mapDispatchToProps = (dispatch: (action: ActionsTypes) => void) => {
    return {
        addPost: (value: string) => {
            dispatch(addPostActionCreator(value))
        },
        updateNewPostText: (value: string) => {
            dispatch(onPostChangeActionCreator(value))
        }
    }
}

 const  MyPostsContainer = connect (mapStateToProps, mapDispatchToProps)  (MyPosts);

export default MyPostsContainer;