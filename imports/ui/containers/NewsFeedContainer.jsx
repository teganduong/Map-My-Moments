import { Meteor } from 'meteor/meteor';
import { Posts } from '../../api/posts.js';
import { createContainer } from 'meteor/react-meteor-data';
import NewsFeedPage from '../pages/NewsFeedPage.jsx';

export default createContainer(({ params }) => {
  const { id } = params;
  const postsHandle = Meteor.subscribe('posts.inList', id);
  const loading = !postsHandle.ready();
  const newsfeed = Posts.findOne(id);
  const newsfeedExists = !loading && !!newsfeed;
  return {
    loading,
    newsfeed,
    newsfeedExists,
    posts: newsfeedExists ? newsfeed.posts().fetch() : [],
  };
}, NewsFeedPage);