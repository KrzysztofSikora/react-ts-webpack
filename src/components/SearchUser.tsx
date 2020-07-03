import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { getUsers } from "../services/ApiService";

interface IUser {
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

interface IUserSelect {
    id?: string,
    first_name?: string,
    last_name?: string
}

export const SearchUser = (): JSX.Element => {
    const [userList, setData] = useState<IUser[]>([]);
    // @todo here should be change
    // const [params, setParams] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const res = await getUsers()
            const result = await res.json();
            setData(result.result);
        };
        fetchData().then(r => console.log("load")).catch(error => console.error('error'));
    }, []);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }

    const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {

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
                    <input type="text" className="form-control" name="first_name" placeholder="First name"
                           onChange={e => setParams(e.target.value} value={params} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" name="last_name" placeholder="Last name"
                           onChange={handleChange} value={'t'}/>
                </div>
                <input type="submit" value="Submit"/>
            </div>
            </form>
        </>
    )
}

