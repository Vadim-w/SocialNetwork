import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {profileType} from "../../Redux/store";
import {getUserProfileThunkCreator} from "../../Redux/profile-reducer";
import {withRouter, RouteComponentProps, Redirect} from 'react-router-dom';
import {RootStateType} from "../../Redux/redux-store";

type PathParamsType = {
    userId: string
}

type CommonPropsType = RouteComponentProps<PathParamsType> & PropsType
type PropsType = MapStatePropsType & MapDispatchPropsType

type MapStatePropsType = {
    profile: profileType
    isAuth: boolean
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
        if (!this.props.isAuth) {
            return <Redirect to={'/login'}/>
        }
        return (
            <Profile  {...this.props} />
        );
    }
}

let mapStateToProps = (state: RootStateType) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})

let withUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {getUserProfileThunkCreator})(withUrlDataContainerComponent);