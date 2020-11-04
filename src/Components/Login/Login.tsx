import React from 'react'
import {reduxForm, InjectedFormProps} from "redux-form";
import {createField, Input} from "../../common/FormsControls/FormsControls";
import {naxLength, requiredField} from "../../utils/validators/Validators";
import {connect} from "react-redux";
import {loginTC} from "../../Redux/auth-reducer";
import {Redirect} from 'react-router-dom';
import {RootStateType} from "../../Redux/redux-store";
import styles from "../../common/FormsControls/FormsControls.module.css"

type LoginFormOwnProps = {
    captchaUrl: string | null
}

type formDataType = {
    email: string
    password: string
    rememberMe: boolean
    isAuth: boolean
    captcha: string
}

type loginPropsType = {
    loginTC: (email: string, password: string, rememberMe: boolean, captchaUrl: string) => void
    isAuth: boolean
    captchaUrl: string
}

const maxLength = naxLength(50)

export const LoginForm: React.FC<InjectedFormProps<formDataType, LoginFormOwnProps> & LoginFormOwnProps> =
    ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
                {createField("email", "email", [requiredField, maxLength], Input)}
                {createField("Password", "password", [requiredField, maxLength], Input, "password")}
                {createField(null, "rememberMe", null, Input, "checkbox")}

            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField("Symbols from image", "captcha",[requiredField], Input)}

            remember my
            {error && <div className={styles.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}


const LoginReduxForm = reduxForm<formDataType, LoginFormOwnProps>({form: 'login'})(LoginForm)

const Login = (props: loginPropsType) => {
    const onSubmit = (formData: formDataType) => {
        props.loginTC(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return (
        <div>
            <h1>Login</h1>
            <form>
                <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
            </form>
        </div>
    )
}
const mapStateToProps = (state: RootStateType) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {loginTC})(Login)

