import {authAPI, securityAPI} from "../api/api";
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
    captchaUrl: string | null
}

let initialState = {
    userId: "",
    email: "",
    login: "",
    isFetching: false,
    isAuth: false,
    captchaUrl: null
};


export const authReducer = (state: initialStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case  'GET_CAPTCHA_URL_SUCCESS':
        case 'SET_USER_DATA':
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


export const getCaptchaUrlSuccessAC = (captchaUrl: string) =>
    ({type: 'GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}} as const)

export const getAuthThunkCreator = (): ThunkType => {
    return async (dispatch) => {
       let response = await authAPI.getAuth()
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data
                    dispatch(setAuthUserDataAC(id, email, login, true))
                }
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean = false, captchaUrl: string ): ThunkType => {
    return  async (dispatch) => {
      let response = await authAPI.login(email, password, rememberMe, captchaUrl)
                if (response.data.resultCode === 0) {
                    dispatch(getAuthThunkCreator())
                }
                else {
                    if (response.data.resultCode === 10) {
                        debugger
                        dispatch(getCaptchaUrl())
                    }
                   let message =  response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
                    dispatch(stopSubmit("login", {_error: message}))
                }
    }
}

export const getCaptchaUrl = (): ThunkType => {
    return  async (dispatch) => {
        debugger
        let response = await securityAPI.getCaptchaUrl()
        const captchaUrl = response.data.url
        dispatch(getCaptchaUrlSuccessAC(captchaUrl))
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

type ActionTypes = ReturnType<typeof getCaptchaUrlSuccessAC> | setAuthUserDataActionType | FormAction

type ThunkType =  ThunkAction<any, RootStateType, unknown, ActionTypes>






