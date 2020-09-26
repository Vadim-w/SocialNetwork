import {v1} from "uuid";

export type dialogsType = {
    id: string
    name: string
}

export type messagesType = {
    id: string
    message: string
}

export type DialogsPageType = {
    dialogs: Array<dialogsType>
    messages: Array<messagesType>
}

let initialState: DialogsPageType = {
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
};

export type ActionsTypes = addDialogActionType

export const dialogsReducer = (state: DialogsPageType = initialState, action: ActionsTypes): DialogsPageType => {

    switch (action.type) {
        case "ADD-DIALOG":
            let newDialog: messagesType = {
                id: v1(),
                message: action.newDialogText
            }
            return {
                ...state,
                messages: [...state.messages, newDialog]
            };
        default:
            return state;
    }

}

type addDialogActionType = {
    type: "ADD-DIALOG",
    newDialogText: string
}

export let addDialogActionCreator = (newDialogText: string): addDialogActionType => ({
    type: "ADD-DIALOG",
    newDialogText: newDialogText
}) as const



