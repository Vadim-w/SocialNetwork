import {addPostActionCreator, deletePostAC, ProfilePageType, profileReducer} from "./profile-reducer";
import {v1} from "uuid";

let state: ProfilePageType = {
    posts: [
        {id: '1', message: 'Hi !!!!!', likesCount: 45},
        {id: '2', message: "How is your", likesCount: 33},
        {id: '3', message: 'hello frend ', likesCount: 54},
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

it('length of posts should be increment', () => {
    let action = addPostActionCreator('hello my friend')

    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(4)
});

it('message of new post should be correct', () => {
    let action = addPostActionCreator('hello my friend')

    let newState = profileReducer(state, action)

    expect(newState.posts[3].message).toBe('hello my friend')
});

it('after deleting length of message should be decrement', () => {
    let action = deletePostAC('1')

    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(2)
});