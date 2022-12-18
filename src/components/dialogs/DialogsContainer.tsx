import React from 'react';
import {addMessageCreator, InitialDialogPageStateType} from "../../redux/dialogPageReducer";
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {AppStateType} from '../../redux/reduxStore';

type MapStatePropsType= {
  dialogsPage: InitialDialogPageStateType
}

type MapDispatchPropsType = {}

type OwnProps = {}

type DialogsContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnProps

const mapStateToProps = (state:AppStateType) => {
  return {
    dialogsPage: state.dialogsPage,
  }
}

export default compose<React.Component<DialogsContainerPropsType>> (
  connect<MapStatePropsType, MapDispatchPropsType, OwnProps, AppStateType>(mapStateToProps, {addMessageCreator}),
  withAuthRedirect
) (Dialogs);


