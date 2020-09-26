import {ActionsTypes, addPostActionCreator} from '../../../Redux/profile-reducer';
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {RootStateType} from "../../../Redux/redux-store";


let mapStateToProps = (state: RootStateType) => {
    return {
        posts: state.profilePage.posts,
    }
}
let mapDispatchToProps = (dispatch: (action: ActionsTypes) => void) => {
    return {
        addPost: (value: string) => {
            dispatch(addPostActionCreator(value))
        }
    }
}

 const  MyPostsContainer = connect (mapStateToProps, mapDispatchToProps)  (MyPosts);

export default MyPostsContainer;