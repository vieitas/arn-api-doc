import React from 'react';
import './PostmanButton.css';
import { trackPostmanButtonClick } from '../../utils/analyticsEvents';

interface PostmanButtonProps {
  collectionUrl?: string;
}

const PostmanButton: React.FC<PostmanButtonProps> = ({ collectionUrl }) => {
  // Use the provided URL or default to our local collection
  const postmanUrl = collectionUrl ||
    "https://elements.getpostman.com/view/import?collection=10758950-edba5898-7edc-495e-a247-8f2d1b5f601b-SzmfXHCg&&referrer=https%3A%2F%2Fdocumenter.getpostman.com%2Fview%2F10758950%2FSzmfXHCg&versionTag=latest&environment=10758950-300383e6-2648-4250-8ae5-25ba8bf3e90f-SzmfXHCg&source=documenter";

  return (
    <div className="postman-button-container">
      <a
        href={postmanUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="postman-button"
        title="Run Hotels API in Postman"
        onClick={() => trackPostmanButtonClick()}
      >
        <img
          src={process.env.PUBLIC_URL + "/postman/run-in-postman-button.jpg"}
          alt="Run Hotels API in Postman"
          style={{ height: '35px', width: 'auto' }}
        />
      </a>
    </div>
  );
};

export default PostmanButton;
