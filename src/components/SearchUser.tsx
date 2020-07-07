import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { getUsers, updateUsers } from '../services/ApiService';
import { UserPosts } from "./UserPosts";

export default interface IUser {
    address: string,
    dob: string,
    email: string,
    first_name: string,
    gender: string,
    id: string,
    last_name: string,
    phone: string,
    status: string,
    website: string
}

export const SearchUser = (): JSX.Element => {
    const [userList, setData] = useState<IUser[]>([]);
    const [params, setParams] = useState<IUser>()

    useEffect(() => {
        const fetchData = async () => {
            const res = await getUsers()
            const result = await res.json();
            const [ first ] = result.result;
            setData(result.result);
            setParams(first);
        };
        fetchData().then(r => console.log('success')).catch(error => console.error('error', error));
    }, []);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const newParameters = {...params, [name]: value}
        setParams(newParameters as IUser)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { id, first_name, last_name } = params as IUser;
        const index = userList.findIndex((x: IUser) => x.id === id)
        const newUserList: IUser[] = [...userList]
        newUserList[index].first_name = first_name
        newUserList[index].last_name = last_name
        setData(newUserList)
        updateUsers(newUserList[index].id, newUserList[index]).then(r => console.log('success', r)).catch(e => console.log('error', e));

    }

    const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const newSelected = userList[e.target.selectedIndex];
        setParams(newSelected);
    }

    return (
        <>
            <div className="input-group">
                <div className="custom-file">
                    <select id="users" onChange={handleChangeSelect}>
                        {userList.map((user: IUser) =>
                            <option key={user.id} value={[user.id, user.first_name, user.last_name]}>
                                {user.first_name} {user.last_name}
                            </option>
                        )}
                    </select>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col">
                    <input type="text" className="form-control" name="first_name" placeholder="First name" value={params?.first_name ?? ''}
                           onChange={handleChange} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" name="last_name" placeholder="Last name"
                           onChange={handleChange} value={params?.last_name ?? ''}/>
                </div>
                <input type="submit" value="Submit"/>

            </div>
            </form>
            { params?.id ? <UserPosts id={params.id} /> : '' }
        </>
    )
}

