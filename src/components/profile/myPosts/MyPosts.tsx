import React from 'react';
import s from './MyPosts.module.css';
import MyPost from './MyPost/MyPost';
import {Field, reduxForm} from 'redux-form';
import {maxLengthCreator, required} from '../../../utils/validators/validators';
import {Textarea} from '../../Common/FormsControls/FormsControls';
import {PostStateType} from "../../../types/reduxType";

type MyPostsPropsType = {
    posts: Array<PostStateType>
    addPostText: string
    addPost: (addPostText: string)=>void
}

const MyPosts = (props: MyPostsPropsType) => {
   let postsElements = props.posts.map(post => <MyPost key={post.id} {...post}/>)

  const onAddPost = (value:any) => {
    //debugger
    props.addPost(value.addPostText);
    value.addPostText = ''
  }

  return (
    <div className={s.contentPosts}>
      <h2 className={s.contentPostsTitle}>My Posts</h2>
      <AddNewPostFormRedux onSubmit={onAddPost}/>
      <div className={s.contentPostsItems}>
        {postsElements}
      </div>
    </div>
  )
}

const maxLength10 = maxLengthCreator(10)

type AddNewPostFormType = {
    handleSubmit: any
}

const AddNewPostForm = (props: AddNewPostFormType) => {
  return (
    <form className={s.contentPostsPostNew} onSubmit={props.handleSubmit}>
      <Field
        component={Textarea}
        name='addPostText'
        placeholder={'Post message'}
        validate={[required, maxLength10]}
      />
      <button className={s.contentPostsPostNewButton}>add post</button>
    </form>
  )
}


const AddNewPostFormRedux = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm);

export default MyPosts;
