import React from 'react'
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";
import {naxLength, requiredField} from "../../utils/validators/Validators";
import {connect} from "react-redux";
import {loginTC} from "../../Redux/auth-reducer";
import { Redirect } from 'react-router-dom';
import {RootStateType} from "../../Redux/redux-store";
import styles from "../../common/FormsControls/FormsControls.module.css"

type formDataType = {
    email: string
    password: string
    rememberMe: boolean
    isAuth: boolean
}

type loginPropsType = {
    loginTC: (email: string, password: string, rememberMe: boolean) => void
    isAuth: boolean
}

const maxLength = naxLength(50)

export const LoginForm: React.FC<InjectedFormProps<formDataType>> = (props ) => {
    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={"email"} name={"email"} validate={[requiredField, maxLength]} component={Input}/>
                </div>
                <div>
                    <Field placeholder={"Password"} name={"password"} validate={[requiredField, maxLength]} component={Input} type={"password"}/>
                </div>
                <div>
                    <Field component={Input} name={"rememberMe"} type={"checkbox"}/>remember my
                </div>
                { props.error && <div className={styles.formSummaryError}>
                    {props.error}
                </div>}
                <div>
                    <button>Login</button>
                </div>
            </form>
    )
}


const LoginReduxForm = reduxForm<formDataType>({form: 'login'})(LoginForm)

 const Login = (props: loginPropsType) => {
    const onSubmit = (formData: formDataType) => {
        props.loginTC(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
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
const mapStateToProps = (state: RootStateType) => ({
    isAuth: state.auth.isAuth,

})

export default connect (mapStateToProps,{loginTC}) (Login)

