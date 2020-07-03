const serverUrl = 'https://gorest.co.in/public-api';
const simpleAuth = '?_format=json&access-token=DUAw91TtGMGNfaS3KhdN9UDANGWLJTn2LDU1'

export const usersApiUrl = (id?: string) =>
    id ? `${serverUrl}/users/${id}` : `${serverUrl}/users${simpleAuth}`;

export const postsApiUrl = (user_id: string) =>
    `${serverUrl}/posts${simpleAuth}&user_id=${user_id}`;

export const commentsApiUrl = (post_id?: string) =>
    post_id ? `${serverUrl}/comments${simpleAuth}&post_id=${post_id}` : `${serverUrl}/comments`



