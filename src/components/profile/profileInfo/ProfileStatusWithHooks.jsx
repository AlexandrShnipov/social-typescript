import React, {useEffect, useState} from "react";
import s from './ProfileInfo.module.css'

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
            setStatus(props.status)
        }, [props.status]
    )

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <>
            {!editMode &&
                <div className={s.statusWrap}>
                    <span className={s.status} onClick={activateEditMode}>{props.status || 'No status'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <textarea
                        className={s.changeStatus}
                        autoFocus={true}
                        onBlur={deactivateEditMode}
                        onChange={onStatusChange}
                        value={status}
                    />
                </div>
            }
        </>
    )
}

export default ProfileStatusWithHooks;