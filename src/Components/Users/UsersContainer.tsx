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
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersSuperSelector
} from "../../Redux/users-selectors";


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
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize)
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

// let mapStateToProps = (state: RootStateType) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }

let mapStateToProps = (state: RootStateType) => {
    return {
        users: getUsersSuperSelector(state),
        pageSize:getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage:getCurrentPage(state),
        isFetching:getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose<React.ComponentType>(
    WithAuthRedirect,
    connect(mapStateToProps, {
        unFollowThunkCreator,
        followThunkCreator,
        getUsersThunkCreator,
        setCurrentPage,
        setTotalUsersCount,
        setToggleIsFollowingInProgress
    })
)(UsersContainerComponent)