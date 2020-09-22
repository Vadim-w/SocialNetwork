import React from 'react'
import {reduxForm, Field, InjectedFormProps} from "redux-form";

type formDataType = {
    login: string
    password: string
    rememberMe: boolean
}



export const LoginForm: React.FC<InjectedFormProps<formDataType>> = (props ) => {
    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={"Login"} name={"login"} component={"input"}/>
                </div>
                <div>
                    <Field placeholder={"Password"} name={"password"} component={"input"}/>
                </div>
                <div>
                    <Field component={"input"} name={"rememberMe"} type={"checkbox"}/>remember my
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

