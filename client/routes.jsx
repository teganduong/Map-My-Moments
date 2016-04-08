import React, { Component } from 'react';
import {mount} from 'react-mounter';
import {Layout} from '../imports/ui/App.jsx';
import {Signin} from '../imports/ui/Signin';
import {Camera} from '../imports/ui/Camera';


FlowRouter.route("/", {
  name: 'Newsfeed',
  action() {
    mount(Layout, {
      content: (<Newsfeed />)
    });
  }
});

FlowRouter.route("/signin", {
  name: 'Signin',
  action() {
    mount(Layout, {
      content: (<Signin />)
    });
  }
});

FlowRouter.route("/photo/:_id", {
  name: 'PhotoViewer',
  action() {
    mount(Layout, {
      content: (<PhotoViewer />)
    });
  }
});

FlowRouter.route("/map", {
  name: 'Map',
  action() {
    mount(Layout, {
      content: (<Map />)
    });
  }
});

FlowRouter.route("/camera", {
  name: 'Camera',
  action() {
    mount(Layout, {
      content: (<Camera />)
    });
  }
});

FlowRouter.notFound = {
  action() {
    mount(Layout, {
          content: (<NotFound />)
        });
  }
};


