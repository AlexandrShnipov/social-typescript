import profilePageReducer, {addPost, deletePost} from './profilePageReducer';

let state = {
  posts: [
    {id: '1', message: 'Hi, my friends', likesCount: '11',},
    {id: '2', message: `It's my first post`, likesCount: '25',},
  ]}

test('length of posts should be incremented', () => {
// 1. test data
  const action = addPost('Hi!!');

  // 2. action
  const newState = profilePageReducer(state, action);

  //3 expectation
  expect(newState.posts.length).toBe(3);
});

test('message of new post should be correct', () => {
// 1. test data
  const action = addPost('Hi!!');

  // 2. action
  const newState = profilePageReducer(state, action);

  //3 expectation
  expect(newState.posts[2].message).toBe('Hi!!');
});

test('posts length should be decrement', () => {

// 1. test data
  const action = deletePost('1');

  // 2. action
  const newState = profilePageReducer(state, action);

  //3 expectation
  expect(newState.posts.length).toBe(1);
});
