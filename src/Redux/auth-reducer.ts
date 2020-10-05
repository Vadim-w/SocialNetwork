import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {RootStateType} from "./redux-store";
import {FormAction} from "redux-form/lib/actions";


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

export type setAuthUserDataActionType = {
    type: "SET_USER_DATA"
    payload: {userId: string, email: string, login: string, isAuth: boolean}
}

export const setAuthUserDataAC = (userId: string, email: string, login: string, isAuth: boolean): setAuthUserDataActionType => ({
    type: "SET_USER_DATA",
    payload: {userId, email, login, isAuth}
}) as const

export const getAuthThunkCreator = (): ThunkType => {
    return (dispatch) => {
        authAPI.getAuth()
            .then((res) => {
                if (res.data.resultCode === 0) {
                    let {id, email, login} = res.data.data
                    dispatch(setAuthUserDataAC(id, email, login, true))
                }
            });
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean = false ): ThunkType => {
    return (dispatch) => {
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

export const logoutTC = (): ThunkType => {
    return (dispatch) => {
        authAPI.logout()
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setAuthUserDataAC("", "", "", false))
                }
            });
    }
}

type ActionTypes = setAuthUserDataActionType | FormAction

type ThunkType =  ThunkAction<any, RootStateType, unknown, ActionTypes>






