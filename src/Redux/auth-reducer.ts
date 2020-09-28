import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";


type initialStateType = {
    userId: string
    email: string
    login: string
    isFetching: boolean
    isAuth: boolean
}

let initialState = {
    userId: "",
    email: "",
    login: "",
    isFetching: false,
    isAuth: false
};

type ActionTypes = setUserDataActionType

export const authReducer = (state: initialStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}

export type setUserDataActionType = {
    type: "SET_USER_DATA"
    payload: {userId: string, email: string, login: string, isAuth: boolean}
}

export const setAuthUserDataAC = (userId: string, email: string, login: string, isAuth: boolean): setUserDataActionType => ({
    type: "SET_USER_DATA",
    payload: {userId, email, login, isAuth}
}) as const

export const getAuthThunkCreator = () => {
    return (dispatch: any) => {
        authAPI.getAuth()
            .then((res) => {
                if (res.data.resultCode === 0) {
                    let {id, email, login} = res.data.data
                    dispatch(setAuthUserDataAC(id, email, login, true))
                }
            });
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean = false ) => {
    return (dispatch: any) => {
        authAPI.login(email, password, rememberMe)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(getAuthThunkCreator())
                }
                else {
                   let message =  res.data.messages.length > 0 ? res.data.messages[0] : "Some error"
                    dispatch(stopSubmit("login", {_error: message}))
                }
            });
    }
}

export const logoutTC = () => {
    return (dispatch: any) => {
        authAPI.logout()
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setAuthUserDataAC("", "", "", false))
                }
            });
    }
}







