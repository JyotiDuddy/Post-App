import { createContext, useReducer, useState, useEffect } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  fetching: false,
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  console.log(currPostList, action);
  let newPostList = currPostList;
  if (action.type === "addPost") {
    newPostList = [action.payload.post, ...currPostList];
  } else if (action.type === "deletePost") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "addInitalPost") {
    newPostList = action.payload.posts;
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  const [fetching, setFetching] = useState(false);

  const addPost = (post) => {
    console.log(post);
    dispatchPostList({
      type: "addPost",
      payload: {
        post,
      },
    });
  };
  const addInitalPost = (posts) => {
    dispatchPostList({
      type: "addInitalPost",
      payload: {
        posts,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "deletePost",
      payload: {
        postId,
      },
    });
  };

  useEffect(() => {
    setFetching(true);
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        addInitalPost(data.posts);
        setFetching(false);
      });
  }, []);

  return (
    <PostList.Provider value={{ postList, addPost, deletePost, fetching }}>
      {children}
    </PostList.Provider>
  );
};
export default PostListProvider;
