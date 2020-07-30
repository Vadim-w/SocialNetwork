import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import { addPostActionCreator, onPostChangeActionCreator} from '../../../Redux/profile-reducer';
import { postsType, ActionsTypes } from '../../../Redux/store';


type myPostsPropsType = {
    posts: Array<postsType>
    newPostText: string
    dispatch: (action: ActionsTypes) => void
}

const MyPosts: React.FC<myPostsPropsType> = (props) => {


    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    let addPost = () => {
        if (newPostElement.current) {
            props.dispatch(addPostActionCreator( newPostElement.current.value))
        }

    }

    let onPostChange = (value: string) => {
        props.dispatch(onPostChangeActionCreator(value))
    }


    return (
        <div className={s.containerPosts}>
            <h2>My posts</h2>
            <div>
                <div>
                    <textarea ref={newPostElement}
                              value={props.newPostText}
                              onChange={(e) => onPostChange(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;