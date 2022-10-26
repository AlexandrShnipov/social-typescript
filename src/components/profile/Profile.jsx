import React from 'react';
import ProfileInfo from './profileInfo/ProfileInfo';
import MyPostsContainer from './myPosts/MyPostsContainer';

const Profile = (props) => {

  return (
    <>
      <ProfileInfo profile={props.profile}
                   status={props.status}
                   updateStatus={props.updateStatus}
                   isOwner={props.isOwner}
                   savePhoto={props.savePhoto}
                   saveProfile={props.saveProfile}
      />
      <MyPostsContainer/>

    </>
  )
}

export default Profile;
