import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {RootStateType} from "../../Redux/redux-store";
import {getAuthThunkCreator, logoutTC} from "../../Redux/auth-reducer";

type HeaderContainerPropsType = {
    isAuth: boolean
    login: string
    getAuthThunkCreator: () => void
    logoutTC: () => void
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    componentDidMount() {
        this.props.getAuthThunkCreator()
    }
    render() {
       return <Header {...this.props}/>
   }
}
const mapStateToProps = (state: RootStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})
export default connect(mapStateToProps, {getAuthThunkCreator, logoutTC})(HeaderContainer);