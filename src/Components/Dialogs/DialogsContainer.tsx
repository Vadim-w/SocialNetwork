import React from 'react';
import { addDialogActionCreator, onDialogChangeActionCreator} from '../../Redux/dialogs-reducer';
import {ActionsTypes, DialogsPageType, ProfilePageType} from '../../Redux/store';
import {CombinedState, Store} from "redux";
import {Dialogs} from "./Dialogs";
import {StoreContext} from "../../StoreContext";


export const DialogsContainer = () => {


    return <StoreContext.Consumer>
        {(store) => {
            let state = store.getState()

            let addDialog = (value: string) => {
                store.dispatch(addDialogActionCreator(value))

            }
            let updateNewDialogText = (value: string) => {
                store.dispatch(onDialogChangeActionCreator(value))
            }
               return <Dialogs dialogs={state.dialogsPage.dialogs}
                         messages={state.dialogsPage.messages}
                         newDialogText={state.dialogsPage.newDialogText}
                         updateNewDialogText={updateNewDialogText}
                         addDialog={addDialog}/>
            }
        }
        </StoreContext.Consumer>

}
