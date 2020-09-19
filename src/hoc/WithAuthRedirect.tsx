import {Redirect} from "react-router-dom";
import React from "react";
import {RootStateType} from "../Redux/redux-store";
import {connect} from "react-redux";

type  RedirectComponentTypeNative = {
    isAuth: boolean
}

export const WithAuthRedirect = (Component: React.ComponentType<T>) => {
    class RedirectComponent extends React.Component <RedirectComponentTypeNative>{
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