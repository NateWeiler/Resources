const data = {
  users: [
    { id: 1, username: 'test', password: 'test' },
    { id: 2, username: 'other', password: 'other' },
  ],
  posts: [
    {
      id: 1,
      authorID: 1,
      created: '2020-02-26',
      title: 'First Blog Post',
      body: 'Hello World!',
    }, {
      id: 2,
      authorID: 1,
      created: '2020-02-26',
      title: 'Some Blog Post',
      body: 'lorem ipsum...',
    }
  ]
};

/**
 * Curried functions for later composition. DO NOT EXPORT.
 */
const getEntityByKey = entity => key => val => data[entity]
  .filter(item => val == item[key])[0];

const insertEntity = entity => item => {
  const newEntity = {
    id: data[entity].length + 1,
    ...item
  };
  data[entity].push(newEntity);
};

/**
 * Helper database functions
 *
 * TODO: replace with actual database adapter and SQL queries
 */
const getUserByID = getEntityByKey('users')('id');
const getUserByName = getEntityByKey('users')('username');
const getPostByID = getEntityByKey('posts')('id');


const deletePost = id => {
  data.posts = data.posts.filter(post => id != post.id);
};

const updatePost = (id, values) => {
  post = getPostByID(id);
  deletePost(id);
  data.posts.push(Object.assign(post, values));
};

const joinUserToPost = post => ({
  ...post,
  username: getUserByID(post.authorID).username,
});

module.exports = {
  getUserByID,
  getUserByName,
  insertUser: insertEntity('users'),
  getPostByID: (id) => {
    const post = getPostByID(id);
    return joinUserToPost(post);
  },
  getPosts: () => data.posts.map(joinUserToPost),
  insertPost: insertEntity('posts'),
  deletePost,
  updatePost,
};

