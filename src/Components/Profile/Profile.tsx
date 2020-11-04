import React from 'react';
import ProfileInfo from './MyPosts/ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {profileType} from "../../Redux/profile-reducer";

type ProfilePropsType = {
    profile: profileType
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photo: File) => void
    saveProfile: (profile: profileType) => void
}


const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo
                saveProfile={props.saveProfile}
                profile={props.profile}
                status={props.status}
                updateUserStatus={props.updateUserStatus}
                isOwner={props.isOwner}
                savePhoto={props.savePhoto}
            />
            <MyPostsContainer/>
        </div>
    );
}

export default Profile;