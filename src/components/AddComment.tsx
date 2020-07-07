import React, {ChangeEvent, FormEvent, useState} from "react";
import IComments from "./PostsComments";
import {saveComment} from "../services/ApiService";

interface IPropsAddComment {
    id: string
    callback: any
}

export const AddComment = ({ id, callback } : IPropsAddComment): JSX.Element => {

    const initialFormComment: IComments = {
        title: '',
        email: '',
        body: '',
        name: '',
        post_id: ''
    };
    const [formData, updateFormData] = useState<IComments>(initialFormComment);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        saveComment(id, {...formData, post_id: id}).then(r => {
            callback(id, formData)
            console.log(r, 'success')
        }).catch(error => console.log('error', error));

    }

    return (
        <>  <div style={{color: "red"}}>{id}</div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="exampleFormControlTextarea1" className='lableComent'>Your Coment</label>
                <input type={'text'} className={'form-control'} onChange={handleChange} name={'title'} placeholder={'title'} />
                <input type={'email'} className={'form-control'} onChange={handleChange} name={'email'} placeholder={'email'} />
                <input type={'name'} className={'form-control'} onChange={handleChange} name={'name'} placeholder={'name'} />
                <textarea className="form-control" name={'body'} placeholder='Comment' rows={3} onChange={handleChange}/>
                <input type="submit" value={'Add Comment'} className="btn btn-success" />
            </form>
        </>
    )
}
