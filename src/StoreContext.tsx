import React from 'react';
import {ActionsTypes, DialogsPageType, ProfilePageType} from "./Redux/store";
import {CombinedState, Store} from "redux";


export const StoreContext = React.createContext({} as
    Store<CombinedState<{ profilePage: ProfilePageType; dialogsPage: DialogsPageType; }>, ActionsTypes>)

export type ProviderType = {
    //store: StoreType
    store: Store<CombinedState<{ profilePage: ProfilePageType; dialogsPage: DialogsPageType; }>, ActionsTypes>
    children: any
}

export const Provider = (props: ProviderType) => {
    return (
        <StoreContext.Provider value={props.store}>
            {props.children}
        </StoreContext.Provider>
    )
}