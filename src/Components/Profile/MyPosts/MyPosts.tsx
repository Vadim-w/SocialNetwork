import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {postsType} from '../../../Redux/store';


type myPostsPropsType = {
    addPost: (value: string) => void
    updateNewPostText: (value: string) => void
    posts: Array<postsType>
    newPostText: string
}

export const MyPosts: React.FC<myPostsPropsType> = (props) => {

    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} key={p.id}/>)
    let newPostElement = React.createRef<HTMLTextAreaElement>();
    let addPost = () => {
        if (newPostElement.current) {
            props.addPost(newPostElement.current.value)
        }
    }
    let onPostChange = (value: string) => {
        props.updateNewPostText(value)
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

