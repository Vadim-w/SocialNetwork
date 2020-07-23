import {v1} from "uuid";
let rerenderEntireTree = (state: RootStateType) => {
    console.log('state changed')
}

export type dialogsType = {
    id: string
    name: string
}
export type messagesType = {
    id: string
    message: string
}
export type postsType = {
    id: string
    message: string
    likesCount: number
}
type ProfilePageType = {
    posts: Array<postsType>
    newPostText: string
}
export type DialogsPageType = {
    dialogs: Array<dialogsType>
    messages: Array<messagesType>
    newDialogText: string
}


export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}

  let state: RootStateType = {
    profilePage: {
        posts:  [
            {id: v1(), message: 'Hi !!!!!', likesCount: 45},
            {id: v1(), message: "How is your", likesCount: 33},
            {id: v1(), message: 'hello frend ', likesCount: 54},
        ],
        newPostText: "Hello friend"
    },
    dialogsPage: {
         dialogs: [
            {id: v1(), name: "Vasya"},
            {id: v1(), name: "Oleg"},
            {id: v1(), name: "Yura"},
            {id: v1(), name: "Victor"},
            {id: v1(), name: "Kolya"},
        ],

         messages: [
            {id: v1(), message: "Hi"},
            {id: v1(), message: "How is your"},
            {id: v1(), message: "Yo"},
            {id: v1(), message: "hello"},
            {id: v1(), message: "how are you"},
        ],
        newDialogText: "hello",

    },




}

export let addPost = (postMessage: string) => {
    let newPost:postsType = {
        id: v1(),
        message: state.profilePage.newPostText,
        likesCount: 0
    }
    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = ""
    rerenderEntireTree(state)
}

export const addDialog = (textDialog: string) => {
    let newDialog: messagesType = {
        id: v1(),
        message: textDialog
    }
    state.dialogsPage.messages.push(newDialog);
    state.dialogsPage.newDialogText = "";
    rerenderEntireTree(state)
}

export const updateNewPostText = (newText: string) => {
    state.profilePage.newPostText = newText;
    rerenderEntireTree(state);
}

export const updateNewDialogText = (newText: string) => {
    state.dialogsPage.newDialogText = newText;
    rerenderEntireTree(state)

}

export const subscribe = (observer: (state: RootStateType) => void ) => {
    rerenderEntireTree = observer;
}


export default state;