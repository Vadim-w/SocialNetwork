import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogsItem';
import Message from './Message/Message';
import {DialogsPageType, dialogsType, messagesType, postsType} from '../../Redux/state';



type dialogsPropsType = {
    dialogs: Array<dialogsType>
    messages: Array<messagesType>
    newDialogText: string
    updateNewDialogText: (newText: string) => void
    addDialog: (textDialog: string) => void
}


const Dialogs: React.FC<dialogsPropsType> = (props) => {

    let messagesElements = props.messages.map(m => <Message message={m.message}/>)

    let dialogElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)

    let newDialogElement = React.createRef<HTMLTextAreaElement>()

    let addDialog = () => {
        if(newDialogElement.current)
            props.addDialog(newDialogElement.current.value)

    }

    let onDialogOnChange = (value: string) => {
        props.updateNewDialogText(value);
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
                          onChange={ (e) => onDialogOnChange (e.currentTarget.value)}/>
                <button onClick={addDialog}>add dialog</button>
            </div>
        </div>

    )
}


export default Dialogs;