////////////////////////////////////////
//             Databases
////////////////////////////////////////

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Posts = new Mongo.Collection('posts');

/* Example usage of posts.nearby with 300m radius and returning a max of 5 records
 * Get current location first then call posts.nearby
 * var point = Geolocation.currentLocation() || { coords: { longitude: 0, latitude: 0 } };
 * Meteor.call('posts.nearby', point.coords.longitude,
 *              point.coords.latitude, 300, 5,
 *              function(err, result) {
 *                // results is an array of post objects
 *                console.log(err, result);
 *              }
 * );
 */

/* setup mongodb to index loc correctly so we can do *
 * nearby lookups easily by radius of current loc    */
Posts._ensureIndex({'loc':'2dsphere'});

Meteor.methods({
  'posts.insert'(picURL, caption, long, lat) {
    /* sanitize data */
    check(picURL, String);
    check(caption, String);
    check(long, Number);
    check(lat, Number);
 
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    /* Always insert */
    return Posts.insert({
      owner: Meteor.userId(),
      username: Meteor.user().username,
      picURL: picURL,
      caption: caption,
      likes: 0,
      loc: {
        type: 'Point',
        /* longituted first then latitude */
        coordinates: [long, lat]
      },
      createdAt: new Date(),
    });
  },

  /* maxDistance is in meters */  
  'posts.nearby'(long, lat, maxDistance, maxRecords) {
    /* sanitize data */
    check(maxRecords, Number);
    check(maxDistance, Number);
    check(long, Number);
    check(lat, Number);

    return Posts.find({
      loc: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [long, lat]
          },
          $maxDistance: maxDistance
        }
      }
    },
      {
        limit: maxRecords
      }
    ).fetch();
  },

  'posts.updateLikes'(postId, likeCount) {
    check(postId, String);
    check(likeCount, Number);

    return Posts.update(postId, { $set: { likes: likeCount } });
  }  

});


// This code only runs on the server
if (Meteor.isServer) {
// this publishes updates 
 Meteor.publish('posts.nearbyPub', function(terms) {
   check(terms.maxRecords, Number);
   check(terms.radius, Number);
   check(terms.center.lng, Number);
   check(terms.center.lat, Number);
   return Posts.find({
     loc: {
       $nearSphere: {
         $geometry: {
           type: "Point",
           coordinates: [terms.center.lng, terms.center.lat]
         },
         $maxDistance: terms.radius
       }
     }
   },
     {
       limit: terms.maxRecords
     }
   );
 });
}