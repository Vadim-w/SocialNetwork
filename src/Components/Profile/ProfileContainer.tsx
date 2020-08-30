import React from 'react';
import Profile from "./Profile";
import axios from 'axios';
import {connect} from "react-redux";
import {profileType, RootStateType} from "../../Redux/store";
import {setUserProfile} from "../../Redux/profile-reducer";

type ProfileContainerPropsType = {
    setUserProfile: (profile: profileType) => void
    profile: profileType
}


class ProfileContainer extends React.Component<ProfileContainerPropsType>{

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`, {
            withCredentials: true,
            headers: {
                'api-key': '1ddb00ae-87fd-4067-9570-c868a2d6ade3'
            }
        }).then((res: any) => {
            this.props.setUserProfile(res.data.items)
        });
    }

    render () {
        return (
           <Profile  {...this.props} profile={this.props.profile}/>
        );
    }
}

let mapStateToProps = (state: RootStateType) => ({profile: state.profilePage.profile})

export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);