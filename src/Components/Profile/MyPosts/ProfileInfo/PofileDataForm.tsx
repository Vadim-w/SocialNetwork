import React from 'react';
import s from './ProfileInfo.module.css';
import {profileType} from "../../../../Redux/profile-reducer";
import {createField, Input, Textarea} from "../../../../common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import styles from "../../../../common/FormsControls/FormsControls.module.css";


type PropsType = {
    profile: profileType
}

type formDataType = {
    fullName: string
    professionalSkills: string
    aboutMe: string
}

 const ProfileDataForm: React.FC<InjectedFormProps<profileType, PropsType> & PropsType> = ({profile, handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div><button>save</button></div>
            {error && <div className={styles.formSummaryError}>
                {error}
            </div>}
            <div>
                <b>Full name</b>: {createField("Full name", "fullName", [], Input)}
            </div>
            <div>
                <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
                {createField("", "lookingForAJob", [], Input, "checkbox")}
            </div>
            <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription}
                {createField("professional skills", "lookingForAJobDescription", [], Textarea)}
            </div>
            <div>
                <b>About me</b>: {profile.aboutMe}
                {createField("about me", "aboutMe", [], Textarea)}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={s.contacts}>
                    <b>{key}:</b> {createField(key, "contacts." + key, [], Input)}
                </div>
            })}
            </div>
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm<profileType, PropsType>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm

