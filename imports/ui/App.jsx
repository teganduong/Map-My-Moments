import React, {Component} from 'react';
import { NavBar } from './components/NavBar.jsx'
import { NewsFeed } from './components/NewsFeed'

// define and export our Layout component
export const Layout = ({content}) => (
    <div>
        <h1>My App</h1>
        <hr />
        <div>{content}</div>
        <div><NewsFeed /></div>
    </div>
);
