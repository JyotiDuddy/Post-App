import React from "react";

export default function WelcomeMessage({ onClickPostsClick }) {
  return (
    <center>
      <h1 className="welcome-message">There is no posts.</h1>
      <button
        onClick={onClickPostsClick}
        type="button"
        className="btn btn-primary"
      >
        Fetch Posts
      </button>
    </center>
  );
}
