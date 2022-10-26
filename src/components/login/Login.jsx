import React from 'react';
import ContainerPage from '../../common/containerPage/ContainerPage';
import s from './Login.module.css';
import {reduxForm} from 'redux-form';
import {createField, Input} from '../Common/FormsControls/FormsControls';
import {required} from '../../utils/validators/validators';
import {connect} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {login} from '../../redux/authReducer';

const LoginForm = (props) => {
    const submitLogin = (e) => {
        e.preventDefault();
        props.handleSubmit();
    }

    return (
        <form onSubmit={submitLogin} className={s.loginForm}>
            {createField(
                Input, 'email', 'email', 'Enter your email', [required])
            }
            {createField(
                Input, 'password', 'password', 'Enter your password', [required])
            }

            <label className={s.labelForRememberMe}>
                {createField( Input,'rememberMe', 'checkbox', '', [], ['remember me'], 'remember me')}
            </label>

            {props.captchaUrl &&
                <img src={props.captchaUrl} alt={'captcha'}/>
            }
            {props.captchaUrl &&
                createField(
                    Input, 'captcha', 'text', 'Symbols from image', [required])
            }

            {props.error && <div className={s.formSummaryError}>
                {props.error}</div>}
            <button type={'submit'}>login</button>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {

    const onSubmit = (formData) => {
        console.log(formData)
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return (
            <Navigate to={'/profile'}/>
        )
    }

    return (
        <ContainerPage title={'Login'}>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </ContainerPage>
    )
}

const mapStateToPops = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToPops, {login})(Login);