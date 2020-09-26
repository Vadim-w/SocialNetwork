import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {postsType} from "../../../Redux/profile-reducer";
import {naxLength, requiredField} from "../../../utils/validators/Validators";
import {Textarea} from "../../../common/FormsControls/FormsControls";


type myPostsPropsType = {
    addPost: (value: string) => void
    posts: Array<postsType>
}
type postFormDataType = {
    post: string
}

export const MyPosts: React.FC<myPostsPropsType> = (props) => {

    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} key={p.id}/>)
    const addPost = (value: postFormDataType) => {
        props.addPost(value.post)
    }

    return (
        <div className={s.containerPosts}>
            <h2>My posts</h2>
            <div>
                <PostReduxForm onSubmit={addPost}/>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
}

const maxLength10 = naxLength(10)

const AddPostForm: React.FC<InjectedFormProps<postFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field  validate={[requiredField, maxLength10]} placeholder={"Post message"} name={"post"} component={Textarea} />
            <button>Add post</button>
        </form>
    )
}

const PostReduxForm = reduxForm<postFormDataType>({form: "post"}) (AddPostForm)

