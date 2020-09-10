import React from 'react';
import ProfileInfo from './MyPosts/ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {profileType} from "../../Redux/store";

type ProfilePropsType = {
    profile: profileType
    isAuth: boolean
}


const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>
        </div>
    );
}

export default Profile;