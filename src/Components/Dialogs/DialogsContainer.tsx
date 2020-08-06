import React from 'react';
import { addDialogActionCreator, onDialogChangeActionCreator} from '../../Redux/dialogs-reducer';
import {ActionsTypes, DialogsPageType, ProfilePageType} from '../../Redux/store';
import {CombinedState, Store} from "redux";
import {Dialogs} from "./Dialogs";

type dialogsContainerPropsType = {
    store: Store<CombinedState<{ profilePage: ProfilePageType; dialogsPage: DialogsPageType; }>, ActionsTypes>
}

export const DialogsContainer: React.FC<dialogsContainerPropsType> = (props) => {

    let state = props.store.getState()

    let addDialog = (value: string) => {
            props.store.dispatch(addDialogActionCreator(value))

    }
    let updateNewDialogText = (value: string) => {
        props.store.dispatch(onDialogChangeActionCreator(value))
    }

    return (
        <Dialogs dialogs={state.dialogsPage.dialogs}
                 messages={state.dialogsPage.messages}
                 newDialogText={state.dialogsPage.newDialogText}
                 updateNewDialogText={updateNewDialogText}
                 addDialog={addDialog}
                 />
    )
}
