import React, {useEffect, useState} from 'react';
import {getPostsComments} from "../services/ApiService";
import {AddComment} from "./AddComment";


export default interface IComments {
    id?: string,
    body: string,
    name: string,
    post_id: string,
    email: string,
    title: string,
}

interface IPropsPostsComments {
   id: string
}

export const PostsComments = ({ id }: IPropsPostsComments): JSX.Element => {
    const [commentsList, setCommentsList] = useState<IComments[]>([])
    const [postId, setPostId] = useState('')

    useEffect(() => {
        fetchPostsComments().then(r => console.log('success')).catch(error => console.log('error', error))
        setPostId(id);
    },[id])


    const fetchPostsComments = async () => {
        const res = await getPostsComments(id);
        const result = await res.json();
        console.log(result.result)
        setCommentsList(result.result);
    }

    const callBackFromAddForm = (id: string, formData: IComments) => {
        const newComment: IComments = { id, ...formData }
        const newCommentList: IComments[] = [...commentsList];
        newCommentList.push(newComment);
        setCommentsList(newCommentList)
        console.log('call back')
    }

    return (
        <>
            <div>
                <div style={{color: "red"}}>Quantity of comments { commentsList?.length } PostId: { id }</div>
                { commentsList?.map(comment => <div className="card-body" key={comment.id}>
                    <p className="card-text">Name: {comment.name} Email: {comment.email}</p>
                    <p className="card-text">Comment: {comment.body}</p>
                </div>)}
                {postId ? <AddComment id={postId} callback={callBackFromAddForm}/> : '' }
            </div>
        </>
    )
}
