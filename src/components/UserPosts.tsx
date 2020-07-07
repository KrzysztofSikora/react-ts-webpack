import React, { useEffect, useState } from 'react'
import { getUserPosts } from '../services/ApiService';
import {PostsComments} from "./PostsComments";

export default interface IPost {
    id: string,
    body: string,
    title: string,
    user_id: string,
}

interface IPropsUserPosts {
   id: string
}
export const UserPosts = ({ id }: IPropsUserPosts): JSX.Element => {
    const [postList, setPostList] = useState<IPost[]>([])
    const [currentPost, setCurrentPost] = useState<IPost>();
    const [postIndex, setPostIndex] = useState(0)

    useEffect(() => {
        const fetchUserPosts = async () => {
            const res = await getUserPosts(id);
            const result = await res.json();
            const [ initPost ] = result.result;
            setPostList(result.result);
            setCurrentPost(initPost);
        }
        fetchUserPosts().then(r => console.log('success')).catch(error => console.log('error', error))
    },[id])

    const showNext = (): void => {
        const nextIndex = postIndex + 1;
        if (postList.length == nextIndex) {
            setPostIndex(0);
            setPostIndex(0);
        } else {
            setCurrentPost(postList[nextIndex])
            setPostIndex(nextIndex);
        }
    }
    return (

        <>
            <div style={{color: "red"}}>Quantity of comments of userId { id }</div>
            <div className="card-body" >
                <p className="card-text">{currentPost?.title}<br/>
                    {currentPost?.body}</p>
            </div>
            <button type={'button'} onClick={showNext}>
                Next
            </button>
            { currentPost?.id ? <PostsComments id={currentPost.id} /> : '' }
        </>
    )
}
