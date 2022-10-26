import React from 'react';
import {reduxForm} from 'redux-form';
import s from '../ProfileInfo.module.css';
import {createField, Input, Textarea} from '../../../Common/FormsControls/FormsControls';

const ProfileDataForm = (props) => {
    const {contacts} = props.profile

    const submitProfileDataForm = (e) => {
        e.preventDefault();
        props.handleSubmit();
    }

    return (
        <form
            className={s.contentUserDescription}
            onSubmit={submitProfileDataForm}
        >
            <button onClick={() => {}}>Save</button>
            {props.error && <div className={s.formSummaryError}>
                {props.error}</div>}
            <p><strong>Full name: </strong>
                {createField(Input, 'fullName', 'text', 'Full name', [])}
            </p>
            <p><label>
                <strong>Looking for a job: </strong>
                {createField(Input, 'lookingForAJob', 'checkbox', '', [])}
            </label>
            </p>
            <p><strong>My professional skills: </strong>
                {createField(Textarea, 'lookingForAJobDescription', 'textarea', 'My professional skills', [])}
            </p>

            <p><strong>About me: </strong>
                {createField(Textarea, 'aboutMe', 'textarea', 'About me', [])}

            </p>
            <div>
                <p className={s.contentUserContactsTitle}><strong>Contacts: </strong>{Object.keys(contacts).map(key => {
                    return (
                        <div className={s.contact} key={key}>
                            <strong>{key}: {createField(Input, 'contacts.' + key, 'text', key, [])}</strong>
                        </div>
                    )
                })}</p>
            </div>
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm({
    form: 'edit-profile',
    enableReinitialize: true,
    destroyOnUnmount: false
})(ProfileDataForm);

export default ProfileDataFormReduxForm