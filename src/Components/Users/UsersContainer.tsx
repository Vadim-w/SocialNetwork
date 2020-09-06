import React from 'react';
import {Users} from './Users';
import {connect} from 'react-redux';
import {userType} from '../../Redux/store';
import {
    follow,
    setCurrentPage,
    setToggleIsFetching, setToggleIsFollowingInProgress,
    setTotalUsersCount,
    setUsers,
    unfollow
} from '../../Redux/users-reducer';
import {Preloader} from '../../common/preloader/Preloader';
import {getUsers} from "../../api/api";
import {RootState} from "../../Redux/redux-store";


type usersAPIComponentPropsType = {
    users: Array<userType>
    follow: (userID: string) => void
    unfollow: (userID: string) => void
    setUsers: (users: Array<userType>) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    setToggleIsFetching: (isFetching: boolean) => void
    setToggleIsFollowingInProgress: (id: string, followingInProgress: boolean) => void
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<string>
}

class UsersContainerComponent extends React.Component<usersAPIComponentPropsType> {

    componentDidMount() {
        this.props.setToggleIsFetching(true)
        getUsers(this.props.currentPage, this.props.pageSize)
            .then((data: any) => {
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
                this.props.setToggleIsFetching(false)
            });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.setToggleIsFetching(true)
            getUsers(pageNumber, this.props.pageSize)
            .then((data: any) => {
            this.props.setUsers(data.items)
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
                   followingInProgress={this.props.followingInProgress}
                   setToggleIsFollowingInProgress={this.props.setToggleIsFollowingInProgress}
            />
        </>)
    }
}

let mapStateToProps = (state: RootState) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}


export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    setToggleIsFetching,
    setToggleIsFollowingInProgress
})
(UsersContainerComponent);