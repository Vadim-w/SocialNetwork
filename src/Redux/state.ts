import {v1} from "uuid";

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

export type StoreType = {
    _state: RootStateType
    _callSubscriber: (state: RootStateType) => void,
    addPost: (postMessage: string) => void,
    updateNewPostText: (newText: string) => void,
    addDialog: (textDialog: string) => void,
    updateNewDialogText: (newText: string) => void,
    subscribe: (observer: (state: RootStateType) => void) => void,
    getState: () => RootStateType
    dispatch: (action:ActionsTypes) => void
}

export type ActionsTypes =  AddPostActionType | UpdateNewPostTextType | AddDialogType | UpdateNewDialogTextType


type AddPostActionType = {
    type: 'ADD-POST'
    newPostText: string
}

type UpdateNewPostTextType = {
    type: 'UPDATE-NEW-POST-TEXT'
    newText: string
}

type AddDialogType = {
    type: 'ADD-DIALOG'
    newDialogText: string
}

type UpdateNewDialogTextType = {
    type: 'UPDATE-NEW-DIALOG-TEXT'
    newText: string
}

const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
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


    },
    _callSubscriber(state: RootStateType) {
        console.log('state changed')
    },

    getState() {return this._state},
    subscribe(observer: (state: RootStateType) => void) {
        this._callSubscriber = observer;
    },

    addPost(postMessage: string) {
        let newPost: postsType = {
            id: v1(),
            message: this._state.profilePage.newPostText,
            likesCount: 0
        }
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = ""
        this._callSubscriber(this._state)
    },
    updateNewPostText(newText: string) {
        this._state.profilePage.newPostText = newText;
        this._callSubscriber(this._state);
    },
    addDialog(textDialog: string) {
        let newDialog: messagesType = {
            id: v1(),
            message: textDialog
        }
        this._state.dialogsPage.messages.push(newDialog);
        this._state.dialogsPage.newDialogText = "";
        this._callSubscriber(this._state)
    },
    updateNewDialogText(newText: string) {
        this._state.dialogsPage.newDialogText = newText;
        this._callSubscriber(this._state)

    },
    dispatch(action) {
        if(action.type === 'ADD-POST') {
            let newPost: postsType = {
                id: v1(),
                message: action.newPostText,
                likesCount: 0
            }
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = ""
            this._callSubscriber(this._state)
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        } else if (action.type === 'ADD-DIALOG') {
            let newDialog: messagesType = {
                id: v1(),
                message: action.newDialogText,
            }
            this._state.dialogsPage.messages.push(newDialog);
            this._state.dialogsPage.newDialogText = "";
            this._callSubscriber(this._state)
        } else if(action.type === 'UPDATE-NEW-DIALOG-TEXT') {
            this._state.dialogsPage.newDialogText = action.newText;
            this._callSubscriber(this._state)

        }
    }

}

export default store;