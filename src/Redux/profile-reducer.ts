import {v1} from "uuid";
import {profileAPI} from "../api/api";


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

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsTypes): ProfilePageType => {
    switch (action.type) {
        case 'ADD-POST': {
            let newPost: postsType = {
                id: v1(),
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        }
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
        case "DELETE-POST":
            return {...state, posts: state.posts.filter(p => p.id !== action.postID)}

        default:
            return state;
    }
}

//action creators
export const addPostActionCreator = (newPostText: string): addPostActionType => ({type: "ADD-POST", newPostText} as const)
export const deletePostAC = (postID: string)  => ({type: "DELETE-POST", postID} as const)
export const setUserProfile = (profile: profileType): setUserProfileActionType => ({type: "SET_USER_PROFILE", profile} as const)
export const setUserStatus = (status: string): setUserStatusActionType => ({type: "SET_USER_STATUS", status}) as const

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
        const response = await profileAPI.updateStatus(status)
                if (response.data.resultCode === 0) {
                    dispatch(setUserStatus(status))
                }
    }
}

//types
export type ActionsTypes =
    | addPostActionType
    | setUserProfileActionType
    | setUserStatusActionType
    | ReturnType<typeof deletePostAC>

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
        facebook: string | null,
        website: string | null,
        vk: string | null,
        twitter: string | null,
        instagram: string | null,
        youtube: string | null,
        github: string | null,
        mainLink: string | null,
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







