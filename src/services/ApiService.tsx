import { usersApiUrl } from "./RouterService";

const token = 'DUAw91TtGMGNfaS3KhdN9UDANGWLJTn2LDU1';

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
        // if (response.ok) {
        //     response.json().then((json) => resolve(json))
        // } else {
        //     reject(response)
        // }
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
