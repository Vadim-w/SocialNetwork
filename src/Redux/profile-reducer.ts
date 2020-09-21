import {v1} from "uuid";
import {postsType, ProfilePageType, profileType} from "./store";
import {profileAPI} from "../api/api";

let initialState = {
    posts: [
        {id: v1(), message: 'Hi !!!!!', likesCount: 45},
        {id: v1(), message: "How is your", likesCount: 33},
        {id: v1(), message: 'hello frend ', likesCount: 54},
    ],
    newPostText: "",
    status: "",
    profile: {
        aboutMe: "",
        contacts: {
            facebook: "",
            website: null,
            vk: "",
            twitter: "",
            instagram: "",
            youtube: null,
            github: "",
            mainLink: null
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

export type ActionsTypes = addPostActionType | onPostChangeActionType | setUserProfileActionType | setUserStatusActionType

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case 'ADD-POST': {
            let newPost: postsType = {
                id: v1(),
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                newPostText: "",
                posts: [...state.posts, newPost]
            };
        }
        case "UPDATE-NEW-POST-TEXT":
            return {
                ...state,
                newPostText: action.newText
            };
        case "SET_USER_PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "SET_USER_STATUS":
            return {
                ...state,
                status: action.status
            }

        default:
            return state;

    }

}
type addPostActionType = {
    type: "ADD-POST"
    newPostText: string
}
export let addPostActionCreator = (newPostText: string): addPostActionType => ({type: "ADD-POST", newPostText: newPostText}) as const

type onPostChangeActionType = {
    type: "UPDATE-NEW-POST-TEXT"
    newText: string
}
export let onPostChangeActionCreator = (newText: string): onPostChangeActionType => ({type: "UPDATE-NEW-POST-TEXT", newText: newText}) as const

type setUserProfileActionType = {
    type: "SET_USER_PROFILE"
    profile: profileType
}
export let setUserProfile = (profile: profileType): setUserProfileActionType => ({type: "SET_USER_PROFILE", profile}) as const

type setUserStatusActionType = {
    type: "SET_USER_STATUS"
    status: string
}
export const setUserStatus = (status: string): setUserStatusActionType =>( {type: "SET_USER_STATUS", status}) as const

export const getUserProfileThunkCreator = (userId: string) => {
    return (dispatch: any) => {
        profileAPI.getProfile(userId)
            .then(data => {
                dispatch(setUserProfile(data))
            });
    }
}
export const getUserStatus = (userId: string) => {
    return (dispatch: any) => {
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setUserStatus(response.data))
            })
    }
}
export const updateUserStatus = (status: string) => {
    debugger
    return (dispatch: any) => {
        profileAPI.updateStatus(status)
            .then(response => {
                debugger
                if(response.data.resultCode === 0) {
                    dispatch(setUserStatus(status))
                }
            })
    }
}



