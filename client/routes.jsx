import React, { Component } from 'react';
import {mount} from 'react-mounter';
import {Layout} from '../imports/ui/App.jsx';
import {Camera} from '../imports/ui/Camera';


FlowRouter.route("/", {
  action() {
    mount(Layout, {
      content: (<Camera />)
    });
  }
});