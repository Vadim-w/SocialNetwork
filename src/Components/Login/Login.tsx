import React from 'react'
import {reduxForm, InjectedFormProps} from "redux-form";
import {createField, Input} from "../../common/FormsControls/FormsControls";
import {naxLength, requiredField} from "../../utils/validators/Validators";
import {connect} from "react-redux";
import {loginTC} from "../../Redux/auth-reducer";
import {Redirect} from 'react-router-dom';
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

export const LoginForm: React.FC<InjectedFormProps<formDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
                {createField("email", "email", [requiredField, maxLength], Input)}
                {createField("Password", "password", [requiredField, maxLength], Input, "password")}
                {createField(null, "rememberMe", null, Input, "checkbox")}
            remember my
            {props.error && <div className={styles.formSummaryError}>
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

export default connect(mapStateToProps, {loginTC})(Login)

