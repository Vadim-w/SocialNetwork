import React from 'react';
import styles from './ProfileStatus.module.css'

type ProfileStatusPropsType = {
    status: string
    updateUserStatus: (status: string) => void
}

export class ProfileStatus extends React.Component  <ProfileStatusPropsType> {
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({
            editMode : true,
        } )
    }
    deActivateEditMode =  () => {
        this.setState({
            editMode : false
        } )
        this.props.updateUserStatus(this.state.status)
    }
    onStatusChange = (value: string) => {
        this.setState({status: value})
    }
    componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if(prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {

        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick= {this.activateEditMode.bind(this)}>Status: {this.props.status}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={(e) => this.onStatusChange(e.currentTarget.value)}
                               autoFocus
                               onBlur={this.deActivateEditMode}
                               value={this.state.status}/>
                    </div>
                }
            </div>)
    }
}