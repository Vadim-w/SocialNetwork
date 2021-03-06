import {v1} from "uuid";
import {profileAPI} from "../api/api";
import {Dispatch} from "redux";
import {RootStateType} from "./redux-store";
import {stopSubmit} from "redux-form";


let initialState: ProfilePageType = {
    posts: [
        {id: v1(), message: 'Hi !!!!!', likesCount: 45},
        {id: v1(), message: "How is your", likesCount: 33},
        {id: v1(), message: 'hello frend ', likesCount: 54},
    ],
    status: "",
    profile: {
        aboutMe: "",
        contacts: {
            facebook: "",
            website: "",
            vk: "",
            twitter: "",
            instagram: "",
            youtube: "",
            github: "",
            mainLink: ""
        },
        lookingForAJob: true,
        lookingForAJobDescription: "",
        fullName: "",
        userId: 0,
        photos: {
            small: "",
            large: ""
        },
    }
};

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsTypes): ProfilePageType => {
    switch (action.type) {
        case 'ADD-POST': {
            let newPost: postsType = {id: v1(), message: action.newPostText, likesCount: 0}
            return {...state, posts: [...state.posts, newPost]};
        }
        case "SET_USER_PROFILE":
            return {...state, profile: action.profile}
        case "SET_USER_STATUS":
            return {...state, status: action.status}
        case "DELETE-POST":
            return {...state, posts: state.posts.filter(p => p.id !== action.postID)}
        case "SET_USER_PHOTO":
            return {...state, profile: {...state.profile, photos: action.photos}}
        default:
            return state;
    }
}

//action creators
export const addPostActionCreator = (newPostText: string): addPostActionType => ({type: "ADD-POST", newPostText} as const)
export const deletePostAC = (postID: string)  => ({type: "DELETE-POST", postID} as const)
export const setUserProfile = (profile: profileType): setUserProfileActionType => ({type: "SET_USER_PROFILE", profile} as const)
export const setUserStatus = (status: string): setUserStatusActionType => ({type: "SET_USER_STATUS", status} as const)
export const savePhotoSuccess = (photos: any) => ({type: "SET_USER_PHOTO", photos} as const)

//thunks creators
export const getUserProfileThunkCreator = (userId: string) => {
    return async (dispatch: any) => {
        const data = await profileAPI.getProfile(userId)
                dispatch(setUserProfile(data))
    }
}
export const getUserStatus = (userId: string) => {
    return async (dispatch: any) => {
      const response = await profileAPI.getStatus(userId)
                dispatch(setUserStatus(response.data))
    }
}
export const updateUserStatus = (status: string) => {
    return async (dispatch: any) => {
        try {
            const response = await profileAPI.updateStatus(status)
            if (response.data.resultCode === 0) {
                dispatch(setUserStatus(status))
            }
        }
        catch(error) {
            //
        }
    }
}
export const savePhoto = (photo: File) => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        const response = await profileAPI.updatePhotoProfile(photo)
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos))
        }
    }
}
export const saveProfile = (profile: profileType) => {
    return async (dispatch: Dispatch<any>, getState: () => RootStateType) => {
        const userID = getState().auth.userId
        const response = await profileAPI.saveProfile(profile)
        if (response.data.resultCode === 0) {
            dispatch(getUserProfileThunkCreator(userID))
        } else {
            dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}))
            return Promise.reject(response.data.messages[0])
        }
    }
}

//types
export type ActionsTypes =
    | addPostActionType
    | setUserProfileActionType
    | setUserStatusActionType
    | ReturnType<typeof deletePostAC>
    | ReturnType<typeof savePhotoSuccess>

type setUserStatusActionType = {
    type: "SET_USER_STATUS"
    status: string
}
type setUserProfileActionType = {
    type: "SET_USER_PROFILE"
    profile: profileType
}
type addPostActionType = {
    type: "ADD-POST"
    newPostText: string
}

export type ProfilePageType = {
    posts: Array<postsType>
    profile: profileType,
    status: string
}
export type postsType = {
    id: string
    message: string
    likesCount: number
}
export type profileType = {
    aboutMe: string | null,
    contacts: {
        [key: string]: string
        facebook: string,
        website: string,
        vk: string,
        twitter: string,
        instagram: string,
        youtube: string,
        github: string,
        mainLink: string,
    }
    lookingForAJob: boolean | null,
    lookingForAJobDescription: string | null,
    fullName: string | null,
    userId: number,
    photos: {
        small: string,
        large: string
    }
}







