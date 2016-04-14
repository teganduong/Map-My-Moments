import { Meteor } from 'meteor/meteor';
import { Posts } from '../../api/posts.js';
import { createContainer } from 'meteor/react-meteor-data';
import NewsFeedPage from '../pages/NewsFeedPage.jsx';

export default createContainer(({ params }) => {
  const { id } = params;
  const postsHandle = Meteor.subscribe('posts', id);
  const loading = !postsHandle.ready();
  const newsfeed = Posts.findOne(id);
  const newsfeedExists = !loading && !!newsfeed;
  return {
    loading,
    newsfeed,
    newsfeedExists,
    posts: newsfeedExists ? Posts.find({}, { sort: { createdAt: -1 } }).fetch() : [],
  };
}, NewsFeedPage);