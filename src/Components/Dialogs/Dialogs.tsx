import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogsItem';
import Message from './Message/Message';
import { addDialogActionCreator, onDialogChangeActionCreator} from '../../Redux/dialogs-reducer';
import {ActionsTypes, dialogsType, messagesType} from '../../Redux/store';



type dialogsPropsType = {
    dialogs: Array<dialogsType>
    messages: Array<messagesType>
    newDialogText: string
    dispatch: (action: ActionsTypes) => void
}


const Dialogs: React.FC<dialogsPropsType> = (props) => {

    let messagesElements = props.messages.map(m => <Message message={m.message}/>)

    let dialogElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)

    let newDialogElement = React.createRef<HTMLTextAreaElement>()

    let addDialog = () => {
        if(newDialogElement.current)
            props.dispatch(addDialogActionCreator( newDialogElement.current.value))

    }

    let onDialogChange = (value: string) => {
        props.dispatch(onDialogChangeActionCreator(value));
    }



    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
            <div>
                <textarea ref={newDialogElement}
                          value={props.newDialogText}
                          onChange={ (e) => onDialogChange (e.currentTarget.value)}/>
                <button onClick={addDialog}>Send</button>
            </div>
        </div>

    )
}


export default Dialogs;