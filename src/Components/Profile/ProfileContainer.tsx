import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getUserProfileThunkCreator,
    getUserStatus,
    profileType,
    savePhoto, saveProfile,
    updateUserStatus
} from "../../Redux/profile-reducer";
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {RootStateType} from "../../Redux/redux-store";
import {compose} from "redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";

type PathParamsType = {
    userId: string
}

type CommonPropsType = RouteComponentProps<PathParamsType> & PropsType
type PropsType = MapStatePropsType & MapDispatchPropsType

type MapStatePropsType = {
    profile: profileType,
    status: string
    authorizedUserID: string
    isAuth: boolean

}

type MapDispatchPropsType = {
    getUserProfileThunkCreator: (userId: string) => void
    getUserStatus: (userId: string) => void
    updateUserStatus: (tatus: string) => void
    savePhoto: (photo: File) => void
    saveProfile: (profile: profileType) => void
}


class ProfileContainer extends React.Component<CommonPropsType> {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserID;
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getUserProfileThunkCreator(userId)
        this.props.getUserStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<CommonPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }

    }


    render() {
        return (
            <Profile  {...this.props}
                      isOwner={!this.props.match.params.userId}
                      profile={this.props.profile}
                      status={this.props.status}
                      updateUserStatus={this.props.updateUserStatus}
                      savePhoto={this.props.savePhoto}
                      saveProfile={this.props.saveProfile}
            />
        );
    }
}

let mapStateToProps = (state: RootStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserID: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose<React.ComponentType>(
    WithAuthRedirect,
    connect(mapStateToProps, {getUserProfileThunkCreator, getUserStatus, updateUserStatus, savePhoto, saveProfile}),
    withRouter,
)(ProfileContainer)



