import React from 'react';
import {addMessageClick} from '../../redux/dialogPageReducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';


const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  }
}

export default compose (
  connect(mapStateToProps, {addMessageClick}),
  withAuthRedirect
) (Dialogs);


