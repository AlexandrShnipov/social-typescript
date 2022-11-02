import React, {FormEventHandler} from 'react';
import s from './Dialogs.module.css';
import DialogItem from './dialogItem/DialogItem';
import Message from './message/Message';
import {Navigate} from 'react-router-dom';
import {Field, FormSubmitHandler, reduxForm} from 'redux-form';
import {Textarea} from '../Common/FormsControls/FormsControls';
import {maxLengthCreator, required} from '../../utils/validators/validators';
import ContainerPage from '../../common/containerPage/ContainerPage';
import {AddMessageClickActionType, InitialDialogPageStateType} from '../../redux/dialogPageReducer';
import {InitialAuthReducerStateType} from '../../redux/authReducer';

type DialogPropsType = {
    dialogsPage: InitialDialogPageStateType
    isAuth: InitialAuthReducerStateType
    addMessageClick: (values: string) => AddMessageClickActionType
    newMessagesText: AddMessageClickActionType
}

const Dialogs = (props: DialogPropsType) => {

    let state = props.dialogsPage

    let dialogElements = state.dialogs.map(dialog =>
        <DialogItem
            key={dialog.id}
            id={dialog.id}
            photo={dialog.photo}
            name={dialog.name}/>);
    let messageElements = state.messages.map(message =>
        <Message
            key={message.id}
            id={message.id}
            message={message.message}/>);

    const addNewMessage = (values: AddMessageClickActionType & any) => {
        //debugger
        props.addMessageClick(values.newMessagesText)
        values.newMessagesText = ''
    }

    if (!props.isAuth) {
        return <Navigate to={'/login'}/>
    }
    ;

    return (
        <ContainerPage title={'Messages'}>
            <div className={s.dialogs}>
                <div className={s.dialogsContent}>
                    <div className={s.dialogsItems}>
                        {dialogElements}
                    </div>
                    <div className={s.messages}>
                        <div>
                            {messageElements}
                        </div>
                    </div>
                </div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </ContainerPage>

    )
}

type AddMessageFormType = {
    handleSubmit : FormEventHandler<HTMLFormElement>
}

const AddMessageForm = (props: AddMessageFormType) => {

    const maxLength100 = maxLengthCreator(100)

    return (
        <form className={s.newMessages} onSubmit={props.handleSubmit}>
            <Field component={Textarea}
                   className={s.newMessagesText}
                   name={'newMessagesText'}
                   placeholder={'Enter your message'}
                   validate={[required, maxLength100]}/>
            <button className={s.newMessagesButton}>Send message</button>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({
    form: 'dialogAddMessageForm'
})(AddMessageForm)

export default Dialogs;


