import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogsItem';
import Message from './Message/Message';
import {dialogsType, messagesType} from '../../Redux/store';

type dialogsPropsType = {
    dialogs: Array<dialogsType>
    messages: Array<messagesType>
    newDialogText: string
    isAuth: boolean
    updateNewDialogText: (value: string) => void
    addDialog: (value: string) => void
}

export const Dialogs: React.FC<dialogsPropsType> = (props) => {

    let messagesElements = props.messages.map(m => <Message message={m.message} key={m.id}/>)
    let dialogElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id} key={d.id}/>)
    let newDialogElement = React.createRef<HTMLTextAreaElement>()

    let addDialog = () => {
        if (newDialogElement.current) {
            props.addDialog(newDialogElement.current.value)
        }
    }
    let onDialogChange = (value: string) => {
        props.updateNewDialogText(value)
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
                          onChange={(e) => onDialogChange(e.currentTarget.value)}/>
                <button onClick={addDialog}>Send</button>
            </div>
        </div>

    )
}



