import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css';
import {Preloader} from "../../../../common/preloader/Preloader";
import {ProfileStatus} from "../../profileStatus/ProfileStatus";
import userPhoto from "../../../../assecs/images/user.png"
import {profileType} from "../../../../Redux/profile-reducer";
import ProfileDataForm from "./PofileDataForm"

type profileInfoPropsType = {
    profile: profileType
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photo: File) => void
    saveProfile: (profile: profileType) => void
}

const ProfileInfo = (props: profileInfoPropsType) => {
    const [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            props.savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData: profileType) => {
        // @ts-ignore
        props.saveProfile(formData).then(
            () => {setEditMode(false)})
    }

    return (
        <div>
            <div>
                <img src='https://jssors8.azureedge.net/demos/image-slider/img/px-beach-daylight-fun-1430675-image.jpg'
                     alt={"background"}/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large || userPhoto} style={{height: "300px", width: "300px"}}
                     alt={"avatar"}/>
                {props.isOwner && <div>Update photo<input type="file" onChange={onMainPhotoSelected}/></div>}
                {editMode
                    ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/>
                    : <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={() => {setEditMode(true)}}/>}
                <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus}/>

            </div>
        </div>
    );

}


type ProfileDataPropsType = {
    profile: profileType
    isOwner: boolean
    goToEditMode: () => void
}
const ProfileData = ({profile, isOwner, goToEditMode}: ProfileDataPropsType) => {
    return (
        <div>
            {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
            <div>
                <b>Full name</b>: {profile.fullName}
            </div>
            <div>
                <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {profile.lookingForAJob && <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription}
            </div>}
            <div>
                <b>About me</b>: {profile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
            })}
            </div>
        </div>
    )
}



type ContactPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact = ({contactTitle, contactValue}: ContactPropsType) => {
    return <div className={s.contacts}><b>{contactTitle}:</b> {contactValue}</div>
}

export default ProfileInfo;