import {messagesType, DialogsPageType, ActionsTypes} from "./store";
import {v1} from "uuid";

export const dialogsReducer = (state: DialogsPageType, action: ActionsTypes) => {

    switch (action.type) {
        case "ADD-DIALOG":
            let newDialog: messagesType = {
                id: v1(),
                message: action.newDialogText,
            }
            state.messages.push(newDialog);
            state.newDialogText = "";
            return state;
        case "UPDATE-NEW-DIALOG-TEXT":
            state.newDialogText = action.newText;
            return state;
        default:
            return state;
    }

}

export let addDialogActionCreator = (newDialogText: string) => ({type: "ADD-DIALOG", newDialogText: newDialogText}) as const
export let onDialogChangeActionCreator = (newText: string) => ({type: "UPDATE-NEW-DIALOG-TEXT", newText: newText}) as const

