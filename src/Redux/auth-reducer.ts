import {getAuth} from "../api/api";


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
                ...action.data,
                isAuth: true
            }

        default:
            return state;
    }
}

export type setUserDataActionType = {
    type: "SET_USER_DATA"
    data: {userId: string, email: string, login: string}
}

export const setAuthUserDataAC = (userId: string, email: string, login: string): setUserDataActionType => ({
    type: "SET_USER_DATA",
    data: {userId, email, login}
}) as const

export const getAuthThunkCreator = () => {
    return (dispatch: any) => {
        getAuth()
            .then((data: any) => {
                if (data.resultCode === 0) {
                    let {id, email, login} = data.data
                    dispatch(setAuthUserDataAC(id, email, login))
                }
            });
    }
}







