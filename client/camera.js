import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import React from 'react';
import { render } from 'react-dom';
import Camera from '../imports/ui/Camera.jsx'

Meteor.startup(() => {
  render(<Camera />, document.getElementById('render-target'));
});
