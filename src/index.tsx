import React from "react";
import ReactDOM from 'react-dom';
import { Router, RouteComponentProps } from '@reach/router'

import { StoreProvider } from "./stores/Store";
import App from "./App";
import HomePage from "./pages/HomePage";
import FavPage from './pages/FavPage'

const root = document.getElementById('app-root')
const RouterPage = (props: {pageComponent: JSX.Element} & RouteComponentProps) => props.pageComponent

ReactDOM.render(
    <StoreProvider>
        <Router>
            <App path='/'>
                <RouterPage pageComponent={<HomePage />} path='/' />
                <RouterPage pageComponent={<FavPage />} path='/faves' />
            </App>
        </Router>
    </StoreProvider>,
    root
)
