import React from 'react';
import {mount} from 'react-mounter';

import {Camera} from '../ui/Camera.jsx'

const Layout = ({content}) => (
   <div>
       <h1>My App</h1>
       <hr />
       <div>{content}</div>
   </div>
);


FlowRouter.route("/", {
  name:'home',
 action() {
   mount(Layout, {content: 'Arunoda'});
 }
});