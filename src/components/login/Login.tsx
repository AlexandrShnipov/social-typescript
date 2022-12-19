import React, {ComponentType, FormEvent} from "react";
import ContainerPage from "../../common/containerPage/ContainerPage";
import s from "./Login.module.css";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {login} from "../../redux/authReducer";
import {AppStateType} from "../../redux/reduxStore";
import {InitialDialogPageStateType} from "../../redux/dialogPageReducer";


type LoginFormPropsType = {
    handleSubmit: () => void
    captchaUrl: null | string
    error: string
}

const LoginForm = (props: LoginFormPropsType & any) => {
    const submitLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.handleSubmit();
    }

    return (
        <form onSubmit={submitLogin} className={s.loginForm}>
            {createField(
                Input, "email", "email", "Enter your email", [required])
            }
            {createField(
                Input, "password", "password", "Enter your password", [required])
            }

            <label className={s.labelForRememberMe}>
                {createField(Input, "rememberMe", "checkbox", "", [], "remember me", "remember me")}
            </label>

            {props.captchaUrl &&
            <img src={props.captchaUrl} alt={"captcha"}/>
            }
            {props.captchaUrl &&
            createField(
                Input, "captcha", "text", "Symbols from image", [required])
            }

            {props.error && <div className={s.formSummaryError}>
                {props.error}</div>}
            <button type={"submit"}>login</button>
        </form>
    )
}
//
// type LoginReduxFormType = {
//     onSubmit: any
//     captchaUrl:any
// }

const LoginReduxForm: any = reduxForm({form: "login"})(LoginForm)

type FormDataPropsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: null | string
}

type LoginPropsType = {
    captchaUrl: null | string
    isAuth: boolean
    login: (email: string, password: string,
            rememberMe: boolean, captcha: null | string) => void
}

const Login = (props: LoginPropsType) => {

    const onSubmit: any = (formData: FormDataPropsType) => {
        console.log(formData)
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return (
            <Navigate to={"/profile"}/>
        )
    }

    return (
        <ContainerPage title={"Login"}>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </ContainerPage>
    )
}

type MapStatePropsType = {
    captchaUrl: null | string
    isAuth: boolean
}

type MapDispatchPropsType = {}

type OwnProps = {}

const mapStateToPops = (state: AppStateType) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect<MapStatePropsType, MapDispatchPropsType, OwnProps, AppStateType>(mapStateToPops, {login})(Login);