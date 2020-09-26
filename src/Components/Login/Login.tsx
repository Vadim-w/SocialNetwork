import React from 'react'
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";
import {naxLength, requiredField} from "../../utils/validators/Validators";

type formDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const maxLength = naxLength(20)

export const LoginForm: React.FC<InjectedFormProps<formDataType>> = (props ) => {
    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={"Login"} name={"login"} validate={[requiredField, maxLength]} component={Input}/>
                </div>
                <div>
                    <Field placeholder={"Password"} name={"password"} validate={[requiredField, maxLength]} component={Input}/>
                </div>
                <div>
                    <Field component={Input} name={"rememberMe"} type={"checkbox"}/>remember my
                </div>
                <div>
                    <button>Login</button>
                </div>
            </form>
    )
}


const LoginReduxForm = reduxForm<formDataType>({form: 'login'})(LoginForm)

export const Login = () => {
    const onSubmit = (formData: formDataType) => {
        console.log(formData)
    }
    return (
        <div>
            <h1>Login</h1>
            <form>
                <LoginReduxForm onSubmit={onSubmit}/>
            </form>
        </div>
    )
}

