import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {RootStateType} from "../../Redux/redux-store";
import {logoutTC} from "../../Redux/auth-reducer";

type HeaderContainerPropsType = {
    isAuth: boolean
    login: string
    logoutTC: () => void
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    render() {
       return <Header {...this.props}/>
   }
}
const mapStateToProps = (state: RootStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})
export default connect(mapStateToProps, {logoutTC})(HeaderContainer);