import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogsItem';
import Message from './Message/Message';
import {InjectedFormProps, Field, reduxForm} from "redux-form";
import {dialogsType, messagesType} from "../../Redux/dialogs-reducer";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {naxLength, requiredField} from "../../utils/validators/Validators";

type dialogsPropsType = {
    dialogs: Array<dialogsType>
    messages: Array<messagesType>
    newDialogText: string
    isAuth: boolean
    updateNewDialogText: (value: string) => void
    addDialog: (value: string) => void
}

type dialogFormDataType = {
    dialog: string
}

export const Dialogs: React.FC<dialogsPropsType> = (props) => {

    let messagesElements = props.messages.map(m => <Message message={m.message} key={m.id}/>)
    let dialogElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id} key={d.id}/>)
    const onSubmit = (value: dialogFormDataType) => {
        props.addDialog(value.dialog)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
            <MessageReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const maxLength50 = naxLength(50)

const AddMessageForm: React.FC<InjectedFormProps<dialogFormDataType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <Field placeholder={"message"} validate={[requiredField, maxLength50]} name={"dialog"} component={Textarea}/>
            <button>Send</button>
        </form>
    )
}

const MessageReduxForm = reduxForm<dialogFormDataType>({form: "dialog"}) (AddMessageForm)



