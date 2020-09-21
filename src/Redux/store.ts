

export type userType = {
    id: string,
    followed: boolean,
    name: string,
    status: string,
    photos: string,
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
export type ProfilePageType = {
    posts: Array<postsType>
    newPostText: string
    profile: profileType,
    status: string
}
export type DialogsPageType = {
    dialogs: Array<dialogsType>
    messages: Array<messagesType>
    newDialogText: string,
}



