import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../Common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileDataForm from './profileDataForm/ProfileDataForm';
import userDefaultPhoto from '../../../assets/images/userDefaultPhoto.jpg';
import Skeleton from "../../../common/SkeletonForImg/Skeleton";
import backgroundImg from '../../../assets/images/profileInfoContentImg.png'

const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false);

    const [isLoading, setLoading] = useState(true);
    const handleOnLoad = () => {
        setLoading(false);
    };

    const goToEditMode = () => {
        setEditMode(true)
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData)
            .then(() => {
                setEditMode(false)
            });
    }

    return (
        <>
            <div className={s.contentImgWrap}>
                {isLoading && <Skeleton/>}
                <img className={s.contentImg}
                     onLoad={handleOnLoad}
                     src={backgroundImg}
                     alt='img'/>
            </div>
            <div className={s.contentUser}>
                {!props.profile
                    ? <Preloader/>
                    : <>
                        <div className={s.statusBlock}>
                            <div className={s.statusBlockImgWrap}>
                                <img className={s.statusBlockImg}
                                     src={props.profile.photos.large !== null
                                         ? props.profile.photos.large
                                         : userDefaultPhoto}
                                     alt='user photo'/>
                                {props.isOwner &&
                                    <label className={s.labelForSetPhoto}>
                                        &#128247;
                                        <input type={'file'} onChange={onMainPhotoSelected}/>
                                    </label>
                                }
                            </div>

                            <ProfileStatusWithHooks
                                status={props.status}
                                updateStatus={props.updateStatus}
                            />
                        </div>
                        {editMode
                            ?
                            <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/>
                            : <ProfileData
                                profile={props.profile}
                                isOwner={props.isOwner}
                                goToEditMode={goToEditMode}/>
                        }
                    </>}
            </div>
        </>
    )
}

export default ProfileInfo;

const ProfileData = (props) => {
    let {fullName, lookingForAJob, lookingForAJobDescription, aboutMe, contacts} = props.profile
    return (
        <div className={s.contentUserDescription}>
            {props.isOwner &&
                <button
                    onClick={props.goToEditMode}>
                    Edit
                </button>}
            <p><strong>Full name: </strong> {fullName}</p>
            <p><strong>Looking for a job:</strong> {lookingForAJob ? 'yes' : 'no'}</p>
            {lookingForAJob &&
                <p><strong>My professional skills: </strong> {lookingForAJobDescription}</p>
            }
            <p><strong>About me:</strong> {aboutMe}</p>
            <div className={s.contentUserContacts}>
                <p className={s.contentUserContactsTitle}><strong>Contacts:</strong>{Object.keys(contacts).map(key => {
                    return (
                        <Contact key={key} contactTitle={key} contactValue={contacts[key]}/>
                    )
                })}</p>
            </div>
        </div>
    )
}

export const Contact = ({contactTitle, contactValue}) => {
    return (
        <p className={s.contentUserContact}><strong>{contactTitle}:&nbsp; </strong> {contactValue}</p>
    )
}
//export default Contact;