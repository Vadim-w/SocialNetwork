import React from 'react';
import s from './ProfileInfo.module.css';
import {profileType} from "../../../../Redux/store";
import {Preloader} from "../../../../common/preloader/Preloader";

type profileInfoPropsType = {
    profile: profileType
}

const ProfileInfo = (props: profileInfoPropsType) => {
    if(!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div>
                <img src='https://jssors8.azureedge.net/demos/image-slider/img/px-beach-daylight-fun-1430675-image.jpg' alt={"background"}/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large} style={{height: "300px", width: "300px"}} alt={"avatar"}/>
                {props.profile.fullName}
               (description)
            </div>
        </div>
    );
}

export default ProfileInfo;