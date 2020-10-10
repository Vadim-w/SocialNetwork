import React, {useEffect, useState} from 'react';
import styles from './ProfileStatus.module.css'

type ProfileStatusPropsType = {
    status: string
    updateUserStatus: (status: string) => void
}

export const ProfileStatus = (props: ProfileStatusPropsType) => {

    let [status, setStatus] = useState(props.status);
    let [editMode, setEditMode] = useState(false)


    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const updateStatus = (status: string) => {
        setStatus(status)
    }

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deActivateEditMode = () => {
        setEditMode(false)
        props.updateUserStatus(status)
    }

    return (
        <div>
            {!editMode &&
            <div>
                <span className={styles.statusSpan}
                      onDoubleClick={activateEditMode}>status: {status}</span>
            </div>
            }
            {editMode &&
            <div>
                <input className={styles.statusInput}
                       onChange={(e) => updateStatus(e.currentTarget.value)}
                       autoFocus
                       onBlur={deActivateEditMode}
                       value={status}
                />
            </div>
            }
        </div>)

}