import React, {ChangeEvent} from 'react';
import s from './ProfileInfo.module.css';
import {Preloader} from "../../../../common/preloader/Preloader";
import {ProfileStatus} from "../../profileStatus/ProfileStatus";
import userPhoto from "../../../../assecs/images/user.png"
import {profileType} from "../../../../Redux/profile-reducer";

type profileInfoPropsType = {
    profile: profileType
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photo: File) => void
}

const ProfileInfo = (props: profileInfoPropsType) => {
    if(!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        debugger
        if (e.target.files) {
            props.savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div>
                <img src='https://jssors8.azureedge.net/demos/image-slider/img/px-beach-daylight-fun-1430675-image.jpg' alt={"background"}/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large || userPhoto} style={{height: "300px", width: "300px"}} alt={"avatar"}/>
                {props.profile.fullName}
                {props.isOwner && <div>Update photo<input type="file" onChange={onMainPhotoSelected}/></div> }
               <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus}/>
                {props.profile.contacts.vk}
                {props.profile.lookingForAJob}
            </div>
        </div>
    );
}

export default ProfileInfo;