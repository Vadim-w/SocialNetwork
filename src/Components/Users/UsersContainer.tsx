import React from 'react';
import {Users} from './Users';
import {connect} from 'react-redux';
import {RootStateType, userType} from '../../Redux/store';
import {
    follow,
    setCurrentPage,
    setToggleIsFetching,
    setTotalUsersCount,
    setUsers,
    unfollow
} from '../../Redux/users-reducer';
import axios from 'axios';
import { Preloader } from '../../common/preloader/Preloader';


type usersAPIComponentPropsType = {
    users: Array<userType>
    follow: (userID: string) => void
    unfollow: (userID: string) => void
    setUsers: (users: Array<userType>) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    setToggleIsFetching: (isFetching: boolean) => void
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    isFetching: boolean
}

class UsersContainerComponent extends React.Component<usersAPIComponentPropsType> {

    componentDidMount() {
        this.props.setToggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`, {
            withCredentials: true,
            headers: {
                'api-key': '1ddb00ae-87fd-4067-9570-c868a2d6ade3'
            }
        }).then((res: any) => {
            this.props.setUsers(res.data.items)
            this.props.setTotalUsersCount(res.data.totalCount)
            this.props.setToggleIsFetching(false)
        });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.setToggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`, {
            withCredentials: true,
            headers: {
                'api-key': '1ddb00ae-87fd-4067-9570-c868a2d6ade3'
            }
        }).then((res: any) => {
            this.props.setUsers(res.data.items)
            this.props.setToggleIsFetching(false)
        });
    }


    render() {
        return (<>
            {this.props.isFetching ? <Preloader/> : null}
            <Users users={this.props.users}
                        currentPage={this.props.currentPage}
                        pageSize={this.props.pageSize}
                        totalUsersCount={this.props.totalUsersCount}
                        follow={this.props.follow}
                        unfollow={this.props.unfollow}
                        onPageChanged={this.onPageChanged}
        />
        </>)
    }
}

let mapStateToProps = (state: RootStateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,

    }
}



 export default connect (mapStateToProps, {follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, setToggleIsFetching,})
 (UsersContainerComponent);