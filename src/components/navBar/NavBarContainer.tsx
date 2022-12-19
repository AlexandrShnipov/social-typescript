import React from "react";
import {connect} from "react-redux";
import NavBar from "./NavBar";
import {AppStateType} from "../../redux/reduxStore";
import {compose} from "redux";
import {NavBarInitialStateType} from "../../redux/navBarReducer";

type MapStateToPropsType = {
    navBar: NavBarInitialStateType
}

type MapDispatchPropsType = {}

type OwnProps = {}

let mapStateToProps = (state: AppStateType) => {
    return {
        navBar: state.navBar,
    }
}

export default compose(
    connect<MapStateToPropsType, MapDispatchPropsType, OwnProps, AppStateType>(mapStateToProps)
)(NavBar);
