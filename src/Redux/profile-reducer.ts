import {v1} from "uuid";
import { postsType, ProfilePageType, ActionsTypes} from "./store";

let initialState = {
            posts: [
                {id: v1(), message: 'Hi !!!!!', likesCount: 45},
                {id: v1(), message: "How is your", likesCount: 33},
                {id: v1(), message: 'hello frend ', likesCount: 54},
            ],
            newPostText: "",
        };

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case 'ADD-POST':
            let newPost: postsType = {
                id: v1(),
                message: action.newPostText,
                likesCount: 0
            }
            state.posts.push(newPost);
            state.newPostText = "";
            return state;
        case "UPDATE-NEW-POST-TEXT":
            state.newPostText = action.newText;
            return state;
        default:
            return state;

    }

}
export let addPostActionCreator = (newPostText: string) => ({type: "ADD-POST", newPostText: newPostText}) as const
export let onPostChangeActionCreator = (newText: string) => ({type: "UPDATE-NEW-POST-TEXT", newText: newText}) as const





