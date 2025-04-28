import React from 'react';
import { Link } from 'react-router-dom';
import './Resources.css';

const Resources: React.FC = () => {
  return (
    <>
      <div className="content-header">
        <h1>Hotels API Resources</h1>
        <p>Tools and resources to help you integrate with the ARN Hotels API</p>
      </div>

      <div className="resources-section">
        <h2>Postman Collection</h2>
        <p>
          Use our Postman collection to quickly test and explore the ARN Hotels API. The collection includes all endpoints
          with pre-configured requests and environment variables.
        </p>

        <div className="resources-cards">
          <div className="resource-card">
            <div className="resource-card-icon">
              <i className="fas fa-file-code"></i>
            </div>
            <h3>Collection</h3>
            <p>Download the Postman collection with all API endpoints</p>
            <a
              href="/postman/arn-api-collection.json"
              download
              className="resource-card-link"
            >
              Download Collection <i className="fas fa-download"></i>
            </a>
          </div>

          <div className="resource-card">
            <div className="resource-card-icon">
              <i className="fas fa-cog"></i>
            </div>
            <h3>Environment</h3>
            <p>Download the Postman environment with test credentials</p>
            <a
              href="/postman/arn-api-test-environment.json"
              download
              className="resource-card-link"
            >
              Download Environment <i className="fas fa-download"></i>
            </a>
          </div>

          <div className="resource-card">
            <div className="resource-card-icon">
              <i className="fas fa-play"></i>
            </div>
            <h3>Run in Postman</h3>
            <p>Import the collection directly into Postman</p>
            <a
              href="https://elements.getpostman.com/view/import?collection=10758950-edba5898-7edc-495e-a247-8f2d1b5f601b-SzmfXHCg&&referrer=https%3A%2F%2Fdocumenter.getpostman.com%2Fview%2F10758950%2FSzmfXHCg&versionTag=latest&environment=10758950-300383e6-2648-4250-8ae5-25ba8bf3e90f-SzmfXHCg&source=documenter"
              target="_blank"
              rel="noopener noreferrer"
              className="resource-card-link"
            >
              Run in Postman <i className="fas fa-external-link-alt"></i>
            </a>
          </div>
        </div>

        <div className="resources-instructions">
          <h3>How to Use the Postman Collection</h3>
          <ol>
            <li>Download the collection and environment files or use the "Run in Postman" button</li>
            <li>Import the files into Postman</li>
            <li>Select the "ARN Hotels API Test Environment" from the environment dropdown</li>
            <li>Start with the "Availability Search" request to get hotel availability</li>
            <li>The collection automatically extracts data from responses and sets environment variables for subsequent requests</li>
            <li>Follow the workflow: Availability Search → Rate Details → Reservation Creation → Itinerary/Cancellation</li>
          </ol>
        </div>
      </div>

      <div className="resources-section">
        <h2>Hotels API Documentation</h2>
        <p>
          Comprehensive documentation for all ARN Hotels API endpoints, including request parameters, response formats,
          and example code.
        </p>

        <div className="resources-links">
          <Link to="/endpoints/typeahead/city-search" className="resources-link">
            <i className="fas fa-book"></i> API Reference
          </Link>
          <Link to="/getting-started" className="resources-link">
            <i className="fas fa-rocket"></i> Getting Started Guide
          </Link>
          <Link to="/technical-reference/error-codes" className="resources-link">
            <i className="fas fa-exclamation-triangle"></i> Error Codes
          </Link>
        </div>
      </div>
    </>
  );
};

export default Resources;
