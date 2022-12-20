import React from "react";
import {addPost} from "../../../redux/profilePageReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/reduxStore";
import {PostStateType} from "../../../types/reduxType";

type MapStatePropsType = {
    posts: Array<PostStateType>
    addPostText: string
}

type MapDispatchPropsType = {
    addPost: (addPostText: string)=>void
}

type OwnPropsType = {}

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        addPostText: state.profilePage.addPostText,
    }
}

const MyPostsContainer =
    connect<MapStatePropsType,MapDispatchPropsType,OwnPropsType,AppStateType>(mapStateToProps,
    {addPost})(MyPosts)

export default MyPostsContainer;
