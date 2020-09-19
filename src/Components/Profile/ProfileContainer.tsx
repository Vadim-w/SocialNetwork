import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {profileType} from "../../Redux/store";
import {getUserProfileThunkCreator} from "../../Redux/profile-reducer";
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {RootStateType} from "../../Redux/redux-store";
import {compose} from "redux";

type PathParamsType = {
    userId: string
}

type CommonPropsType = RouteComponentProps<PathParamsType> & PropsType
type PropsType = MapStatePropsType & MapDispatchPropsType

type MapStatePropsType = {
    profile: profileType
}

type MapDispatchPropsType = {
    getUserProfileThunkCreator: (userId: string) => void
}


class ProfileContainer extends React.Component<CommonPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {userId = "2";}
        this.props.getUserProfileThunkCreator(userId)
    }
    render() {
        return (
            <Profile  {...this.props} />
        );
    }
}

let mapStateToProps = (state: RootStateType) => ({
    profile: state.profilePage.profile,
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfileThunkCreator}),
    withRouter,
)(ProfileContainer)



