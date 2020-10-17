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
    return async (dispatch) => {
       let response = await authAPI.getAuth()
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data
                    dispatch(setAuthUserDataAC(id, email, login, true))
                }
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean = false ): ThunkType => {
    return  async (dispatch) => {
      let response = await authAPI.login(email, password, rememberMe)
                if (response.data.resultCode === 0) {
                    dispatch(getAuthThunkCreator())
                }
                else {
                   let message =  response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
                    dispatch(stopSubmit("login", {_error: message}))
                }
    }
}

export const logoutTC = (): ThunkType => {
    return async (dispatch) => {
        let response = await authAPI.logout()
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserDataAC("", "", "", false))
                }
    }
}

type ActionTypes = setAuthUserDataActionType | FormAction

type ThunkType =  ThunkAction<any, RootStateType, unknown, ActionTypes>






