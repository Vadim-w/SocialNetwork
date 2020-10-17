import {getAuthThunkCreator, setAuthUserDataActionType} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {RootStateType} from "./redux-store";


type initialStateType = {
    initialized: boolean
}

let initialState = {
    initialized: false
};


export const appReducer = (state: initialStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case "SET_INITIALIZED":
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export const setInitializedAC = () => ({type: "SET_INITIALIZED"} as const)


export const setInitializedAppTC = (): ThunkAction<any, RootStateType, unknown, ActionTypes> =>
    (dispatch) => {
    let promise = dispatch(getAuthThunkCreator())
    Promise.all([promise])
        .then(() => {
            dispatch(setInitializedAC())
        })
}

export type setInitializedActionType = ReturnType<typeof setInitializedAC>;

type ActionTypes = setInitializedActionType | setAuthUserDataActionType







