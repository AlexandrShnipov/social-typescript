import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/authReducer";
import {AppStateType} from "../../redux/reduxStore";

type HeaderContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnProps

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

type MapStatePropsType = {
    isAuth: boolean
    login: string | null,
}

type MapDispatchPropsType = {}
type OwnProps = {}


const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default connect<MapStatePropsType,MapDispatchPropsType,OwnProps, AppStateType>(mapStateToProps, {logout})(HeaderContainer);