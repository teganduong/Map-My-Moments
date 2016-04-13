import React, { Component } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';
import {Layout} from '../imports/ui/App.jsx';
import {Signin} from '../imports/ui/Signin';
import {Camera} from '../imports/ui/components/Camera';
import {Logout} from '../imports/ui/components/LogOut.jsx';
import {MapDisplay} from '../imports/ui/components/MapDisplay.jsx';
import { NewsFeed } from '../imports/ui/components/NewsFeed';

/* check if logged in before going to a new route *
 * if not logged in then redirect to signin page  */
FlowRouter.triggers.enter(function(context, redirect) {
  if (!Meteor.user() && (context.path !== '/signin')) {
    redirect('/signin');
  }
});

FlowRouter.route("/", {
  name: 'NewsFeed',
  action() {
    mount(Layout, {
      content: (<NewsFeed />)
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

FlowRouter.route("/logout", {
  name: 'Logout',
  action() {
    mount(Layout, {
      content: (<Logout />)
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
      content: (<MapDisplay />)
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


