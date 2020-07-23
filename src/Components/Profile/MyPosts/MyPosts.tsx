import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import state, {postsType} from '../../../Redux/state';

type myPostsPropsType = {
    posts: Array<postsType>
    addPost: (message: string) => void
    newPostText: string
    updateNewPostText: (newText: string) => void
}

const MyPosts: React.FC<myPostsPropsType> = (props) => {


    let postsElements = state.profilePage.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    let addPost = () => {
        if (newPostElement.current) {
            props.addPost(newPostElement.current.value)
        }

    }

    let onPostOnChange = (value: string) => {
        props.updateNewPostText(value);
    }


    return (
        <div className={s.containerPosts}>
            <h2>My posts</h2>
            <div>
                <div>
                    <textarea ref={newPostElement}
                              value={props.newPostText}
                              onChange={(e) => onPostOnChange(e.currentTarget.value)}
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