import React, { Fragment, useState } from "react";
import ReactDOM from 'react-dom';
import ToDoList from "./components/ToDoList";
import { SearchUser } from "./components/SearchUser";


export default function App(): JSX.Element {
    return (
        <>
            <ToDoList/>
            <hr/>
            <SearchUser/>
        </>
    )
}

const root = document.getElementById('app-root')

ReactDOM.render(<App />, root)
