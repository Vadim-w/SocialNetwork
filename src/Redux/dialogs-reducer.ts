import {messagesType, DialogsPageType} from "./store";
import {v1} from "uuid";

let initialState = {
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

};

export type ActionsTypes = addDialogActionType | onDialogChangeActionType

export const dialogsReducer = (state: DialogsPageType = initialState, action: ActionsTypes) => {

    switch (action.type) {
        case "ADD-DIALOG":
            let newDialog: messagesType = {
                id: v1(),
                message: action.newDialogText,
            }
            return {
                ...state,
                newDialogText: "",
                messages: [...state.messages, newDialog]
            };

        case "UPDATE-NEW-DIALOG-TEXT":
            return {
                ...state,
                newDialogText: action.newText
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

type onDialogChangeActionType = {
    type: "UPDATE-NEW-DIALOG-TEXT",
    newText: string
}
export let onDialogChangeActionCreator = (newText: string): onDialogChangeActionType => ({
    type: "UPDATE-NEW-DIALOG-TEXT",
    newText: newText
}) as const

