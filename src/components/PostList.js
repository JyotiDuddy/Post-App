import React, { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";

export default function PostList() {
  const { postList } = useContext(PostListData);
  const { fetching } = useContext(PostListData);

  return (
    <div>
      {fetching && <LoadingSpinner />}
      {postList.length === 0 && <WelcomeMessage />}

      {postList.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
