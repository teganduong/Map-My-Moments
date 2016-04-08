import './CameraHelper.html';

if (Meteor.isClient) {
  Template.imageSrc.helpers({
    photo: function() {
      return Session.get('photo');
    }
  });
}
