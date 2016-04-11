import React, {Component} from 'react';
import { NavBar } from './components/NavBar.jsx'

// define and export our Layout component
export const Layout = ({content}) => (
    <div>
        <h1>My App</h1>
        <hr />
        <div id="temp"></div>
        <div>{content}</div>
        <div><NavBar /></div>

    </div>
);
