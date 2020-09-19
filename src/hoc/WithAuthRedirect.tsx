import {Redirect} from "react-router-dom";
import React from "react";
import {RootStateType} from "../Redux/redux-store";
import {connect} from "react-redux";

type  RedirectComponentTypeProps = {
    isAuth: boolean
}

export const WithAuthRedirect = (Component: React.ComponentType) => {
     class RedirectComponent extends React.Component <RedirectComponentTypeProps>{
        render() {
            if (!this.props.isAuth) return <Redirect to={'/login'}/>
            return <Component {...this.props}/>
        }
    }
    let mapStateToPropsForRedirect = (state: RootStateType) => ({
        isAuth: state.auth.isAuth
    })
    return connect(mapStateToPropsForRedirect)(RedirectComponent);


}