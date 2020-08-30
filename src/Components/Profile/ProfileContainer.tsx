import React from 'react';
import Profile from "./Profile";
import axios from 'axios';
import {connect} from "react-redux";
import {profileType, RootStateType} from "../../Redux/store";
import {setUserProfile} from "../../Redux/profile-reducer";
import {withRouter, RouteComponentProps} from 'react-router-dom';

type PathParamsType = {
    userId: string
}

type CommonPropsType = RouteComponentProps<PathParamsType> & PropsType
type PropsType = MapStatePropsType & MapDispatchPropsType

type MapStatePropsType = {
    profile: profileType
}

type MapDispatchPropsType = {
    setUserProfile: (profile: profileType) => void
}


class ProfileContainer extends React.Component<CommonPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId){
            userId = "2";
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId, {
            withCredentials: true,
            headers: {
                'api-key': '1ddb00ae-87fd-4067-9570-c868a2d6ade3'
            }
        }).then(response => {
            this.props.setUserProfile(response.data)
        });
    }

    render() {
        return (
            <Profile  {...this.props} profile={this.props.profile}/>
        );
    }
}

let mapStateToProps = (state: RootStateType) => ({profile: state.profilePage.profile})

let withUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile})(withUrlDataContainerComponent);