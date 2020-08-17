import React from 'react';
import { addDialogActionCreator, onDialogChangeActionCreator} from '../../Redux/dialogs-reducer';
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {ActionsTypes, RootStateType} from "../../Redux/store";



let mapStateToProps = (state: RootStateType) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newDialogText: state.dialogsPage.newDialogText
    }
}
let mapDispatchToProps = (dispatch: (action: ActionsTypes) => void) => {
   return {
       updateNewDialogText: (value: string) => {
            dispatch(onDialogChangeActionCreator(value))
       },
       addDialog: (value: string) => {
           dispatch(addDialogActionCreator(value))
       }


   }
}

export const DialogsContainer = connect (mapStateToProps, mapDispatchToProps) (Dialogs);
