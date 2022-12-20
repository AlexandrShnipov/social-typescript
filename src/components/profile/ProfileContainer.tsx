import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profilePageReducer";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {withRouter} from "../../hoc/withRouter";
import {AppStateType} from "../../redux/reduxStore";
import {ProfileType} from "../../types/reduxType";

type MapStatePropsType = {
    profile: null | ProfileType
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    getUserProfile: (userId: number | null) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: string) => void
    saveProfile: (profile: ProfileType) => void
}

type OwnPropsType = {
    router:any
}

type ProfileContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    refreshProfile() {
        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps:any, prevState:any, snapshot:any) {
        if (this.props.router.params.userId !== prevProps.router.params.userId)
            this.refreshProfile()
    }

    render() {
        const {profile, status, updateStatus, savePhoto} = this.props
        return (
            <Profile {...this.props}
                     profile={profile}
                     status={status}
                     updateStatus={updateStatus}
                     isOwner={!this.props.router.params.userId}
                     savePhoto={savePhoto}
            />
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})


export default compose<React.Component<ProfileContainerPropsType>>(
    connect<MapStatePropsType,MapDispatchPropsType,OwnPropsType,AppStateType>(mapStateToProps,
        {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
