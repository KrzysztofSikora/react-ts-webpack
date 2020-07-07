import {commentsApiUrl, postsApiUrl, usersApiUrl} from "./RouterService";
import IUser from "../components/SearchUser";
import IComments from "../components/PostsComments";

const token = 'K6UAqRWRky177Cu7WDvesoyle6orCVm8SXuX';



const headers: HeadersInit = {
    'Content-Type' : "application/json; charset=utf-8",
    Authorization: `Bearer ${token}`
};

const apiCall = (url: string, requestInit: RequestInit, resolve: any, reject: any): Promise<void | Response> =>
    fetch(url, requestInit).then((response: Response) => {
        if (response.ok) {
            resolve(response)
        } else {
            reject(response)
        }
    });


export const getUsers = () => {
    const requestInit: RequestInit = {
        method: 'GET',
        headers: headers
    }
    return new Promise<Response>(
        (resolve, reject) => apiCall(usersApiUrl(), requestInit, resolve, reject)
    );
}

export const updateUsers = (id:string , body: IUser) => {
    const requestInit: RequestInit = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body)
    }
    return new Promise<Response>(
        (resolve, reject) => apiCall(usersApiUrl(id), requestInit, resolve, reject)
    );
}

export const getUserPosts = (id: string) => {
    const requestInit: RequestInit = {
        method: 'GET',
        headers: headers
    }
    return new Promise<Response>(
        (resolve, reject) => apiCall(postsApiUrl(id), requestInit, resolve, reject)
    );
}

export const getPostsComments = (id: string) => {
    const requestInit: RequestInit = {
        method: 'GET',
        headers: headers
    }
    return new Promise<Response>(
        (resolve, reject) => apiCall(commentsApiUrl(id), requestInit, resolve, reject)
    );
}

export const saveComment = (id:string , body: IComments) => {
    const requestInit: RequestInit = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    }
    return new Promise<Response>(
        (resolve, reject) => apiCall(commentsApiUrl(id), requestInit, resolve, reject)
    );
}
