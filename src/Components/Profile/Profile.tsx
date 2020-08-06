import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './MyPosts/ProfileInfo/ProfileInfo';
import {ActionsTypes, postsType} from '../../Redux/store';

type propsProfileType = {
    posts: Array<postsType>
    newPostText: string
    dispatch: (action: ActionsTypes) => void
}


const Profile: React.FC<propsProfileType> = (props) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts dispatch={props.dispatch}
                     posts={props.posts}
                     newPostText={props.newPostText}
            />
        </div>
    );
}

export default Profile;