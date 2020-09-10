import React from 'react';
import {Users} from './Users';
import {connect} from 'react-redux';
import {
    followThunkCreator, getUsersThunkCreator,
    setCurrentPage,
    setToggleIsFollowingInProgress,
    setTotalUsersCount,
    unFollowThunkCreator, userType
} from '../../Redux/users-reducer';
import {Preloader} from '../../common/preloader/Preloader';
import {RootStateType} from "../../Redux/redux-store";


type usersAPIComponentPropsType = {
    users: Array<userType>
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    setToggleIsFollowingInProgress: (id: string, followingInProgress: boolean) => void
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<string>,
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void,
    followThunkCreator: (userID: string) => void
    unFollowThunkCreator: (userID: string) => void

}

class UsersContainerComponent extends React.Component<usersAPIComponentPropsType> {

    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize)
        // this.props.setToggleIsFetching(true)
        //
        // getUsers(this.props.currentPage, this.props.pageSize)
        //
        //     .then((data: any) => {
        //         this.props.setUsers(data.items)
        //         this.props.setTotalUsersCount(data.totalCount)
        //         this.props.setToggleIsFetching(false)
        //     });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize)

        /*this.props.setCurrentPage(pageNumber)
        this.props.setToggleIsFetching(true)

            getUsers(pageNumber, this.props.pageSize)

            .then((data: any) => {
            this.props.setUsers(data.items)
            this.props.setToggleIsFetching(false)
        });*/
    }


    render() {
        return (<>
            {this.props.isFetching ? <Preloader/> : null}
            <Users users={this.props.users}
                   currentPage={this.props.currentPage}
                   pageSize={this.props.pageSize}
                   totalUsersCount={this.props.totalUsersCount}
                   onPageChanged={this.onPageChanged}
                   followingInProgress={this.props.followingInProgress}
                   setToggleIsFollowingInProgress={this.props.setToggleIsFollowingInProgress}
                   followThunkCreator={this.props.followThunkCreator}
                   unFollowThunkCreator={this.props.unFollowThunkCreator}
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
        followingInProgress: state.usersPage.followingInProgress
    }
}


export default connect(mapStateToProps, {
    unFollowThunkCreator,
    followThunkCreator,
    getUsersThunkCreator,
    setCurrentPage,
    setTotalUsersCount,
    setToggleIsFollowingInProgress
})
(UsersContainerComponent);