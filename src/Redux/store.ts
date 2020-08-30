import {v1} from "uuid";
import {profileReducer, addPostActionCreator, onPostChangeActionCreator, setUserProfile} from "./profile-reducer";
import {addDialogActionCreator, dialogsReducer, onDialogChangeActionCreator} from "./dialogs-reducer";
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    setToggleIsFetching,
    unfollow
} from "./users-reducer";
export type locationType = {
    city: string,
    country: string
}
export type userType = {
    id: string,
    followed: boolean,
    name: string,
    status: string,
    photos: string,
    //location: locationType
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

export type profileType = {
    aboutMe: string|null,
    contacts: {
        facebook: string|null,
        website: string|null,
        vk: string|null,
        twitter: string|null,
        instagram: string|null,
        youtube: string|null,
        github: string|null,
        mainLink: string|null,
    }
    lookingForAJob: boolean|null,
    lookingForAJobDescription: string|null,
    fullName: string|null,
    userId: number|null,
    photos: {
        small: string,
        large: string
    }

}
export type ProfilePageType = {
    posts: Array<postsType>
    newPostText: string
    profile: profileType
}
export type DialogsPageType = {
    dialogs: Array<dialogsType>
    messages: Array<messagesType>
    newDialogText: string,
}
export type UsersPageType = {
    users:Array<userType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
}
export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    usersPage: UsersPageType
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
    dispatch: (action: ActionsTypes) => void
}

// export type ProfileActionsTypes =
//     ReturnType<typeof addPostActionCreator> |
//     ReturnType<typeof onPostChangeActionCreator>
//
// export type DialogsActionsTypes =
//     ReturnType<typeof addDialogActionCreator> |
//     ReturnType<typeof onDialogChangeActionCreator>

export type ActionsTypes =
    ReturnType<typeof addPostActionCreator> |
    ReturnType<typeof onPostChangeActionCreator> |
    ReturnType<typeof addDialogActionCreator> |
    ReturnType<typeof onDialogChangeActionCreator>|
    ReturnType<typeof follow>|
    ReturnType<typeof unfollow>|
    ReturnType<typeof setUsers>|
    ReturnType<typeof setCurrentPage>|
    ReturnType<typeof setTotalUsersCount>|
    ReturnType<typeof setToggleIsFetching>|
    ReturnType<typeof setUserProfile>






const store: StoreType = {
    _state: {
        profilePage: {
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
            },
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
            newDialogText: "",


        },
        usersPage: {
            users: [
                {
                    id: v1(),
                    followed: false,
                    name: 'Ivan',
                    status: "good",
                    photos: "",
                    //location: {city: "Moscow", country: "Russia"}
                },
                {
                    id: v1(),
                    followed: true,
                    name: 'Andrey',
                    status: "good",
                    photos: "",
                    //location: {city: "Minsk", country: "Belarus"}
                },
                {
                    id: v1(),
                    followed: false,
                    name: 'Aleksandr',
                    status: "good",
                    photos: "",
                    //location: {city: "Kiev", country: "Ukraine"}
                },
            ],
            pageSize: 5,
            totalUsersCount: 20,
            currentPage: 2,
            isFetching: false,
        }


    },
    _callSubscriber(state: RootStateType) {
        console.log('state changed')
    },

    getState() {
        return this._state
    },
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
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)

            this._callSubscriber(this._state)
    }
}

export default store;