import React from 'react';
import './PostmanButton.css';

interface PostmanButtonProps {
  collectionUrl?: string;
}

const PostmanButton: React.FC<PostmanButtonProps> = ({ collectionUrl }) => {
  // Use the provided URL or default to our local collection
  const postmanUrl = collectionUrl ||
    "https://app.getpostman.com/run-collection/10758950-edba5898-7edc-495e-a247-8f2d1b5f601b-SzmfXHCg?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D10758950-edba5898-7edc-495e-a247-8f2d1b5f601b-SzmfXHCg%26entityType%3Dcollection%26workspaceId%3D300383e6-2648-4250-8ae5-25ba8bf3e90f";

  return (
    <div className="postman-button-container">
      <a
        href={postmanUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="postman-button"
        title="Run in Postman"
      >
        <img
          src={process.env.PUBLIC_URL + "/postman/run-in-postman-button.jpg"}
          alt="Run in Postman"
          style={{ height: '35px', width: 'auto' }}
        />
      </a>
    </div>
  );
};

export default PostmanButton;
