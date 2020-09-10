import {v1} from "uuid";
import {postsType, ProfilePageType, profileType} from "./store";

let initialState = {
    posts: [
        {id: v1(), message: 'Hi !!!!!', likesCount: 45},
        {id: v1(), message: "How is your", likesCount: 33},
        {id: v1(), message: 'hello frend ', likesCount: 54},
    ],
    newPostText: "",
    profile: {
        aboutMe: "я круто чувак 1001%",
        contacts: {
            facebook: "facebook.com",
            website: null,
            vk: "vk.com/dimych",
            twitter: "https://twitter.com/@sdf",
            instagram: "instagra.com/sds",
            youtube: null,
            github: "github.com",
            mainLink: null
        },
        lookingForAJob: true,
        lookingForAJobDescription: "не ищу, а дурачусь",
        fullName: "samurai dimych",
        userId: 2,
        photos: {
            small: "https://social-network.samuraijs.com/activecontent/images/users/2/user-small.jpg?v=0",
            large: "https://social-network.samuraijs.com/activecontent/images/users/2/user.jpg?v=0"
        }
    }
};

export type ActionsTypes = addPostActionType | onPostChangeActionType | etUserProfileActionType

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

type etUserProfileActionType = {
    type: "SET_USER_PROFILE"
    profile: profileType
}
export let setUserProfile = (profile: profileType): etUserProfileActionType => ({type: "SET_USER_PROFILE", profile}) as const





