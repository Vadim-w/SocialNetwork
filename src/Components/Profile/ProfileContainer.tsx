import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfileThunkCreator, getUserStatus, profileType, updateUserStatus} from "../../Redux/profile-reducer";
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
}


class ProfileContainer extends React.Component<CommonPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserID;
        }
        this.props.getUserProfileThunkCreator(userId)
        this.props.getUserStatus(userId)
    }
    render() {
        return (
            <Profile  {...this.props}
                      profile={this.props.profile}
                      status={this.props.status}
                      updateUserStatus={this.props.updateUserStatus}/>
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
    connect(mapStateToProps, {getUserProfileThunkCreator, getUserStatus, updateUserStatus}),
    withRouter,
)(ProfileContainer)



