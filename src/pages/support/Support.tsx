import React from 'react';
import { Link } from 'react-router-dom';
import './Support.css';

const Support: React.FC = () => {
  return (
    <>
      <div className="content-header">
        <h1>Support</h1>
        <p>Resources to help you with your ARN API integration</p>
      </div>

      <div className="support-cards">
        <div className="support-card">
          <div className="support-card-icon">
            <i className="fas fa-headset"></i>
          </div>
          <h2>Contacting Support</h2>
          <p>
            Learn how to get help from our dedicated support team for any questions or issues you may encounter
            during your integration process.
          </p>
          <Link to="/support/contact" className="support-card-link">
            View Details <i className="fas fa-arrow-right"></i>
          </Link>
        </div>

        <div className="support-card">
          <div className="support-card-icon">
            <i className="fas fa-vial"></i>
          </div>
          <h2>Testing Your Integration</h2>
          <p>
            Guidelines and best practices for testing your ARN API integration in our test environment before
            going live.
          </p>
          <Link to="/support/testing-integration" className="support-card-link">
            View Details <i className="fas fa-arrow-right"></i>
          </Link>
        </div>

        <div className="support-card">
          <div className="support-card-icon">
            <i className="fas fa-plug"></i>
          </div>
          <h2>Webhook Integration</h2>
          <p>
            Learn how to receive real-time notifications about reservation events through our webhook system.
          </p>
          <Link to="/support/webhook-integration" className="support-card-link">
            View Details <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>

      <div className="support-additional-resources">
        <h2>Additional Resources</h2>
        <div className="support-resources-grid">
          <div className="support-resource">
            <i className="fas fa-rocket"></i>
            <h3>Getting Started</h3>
            <p>
              Step-by-step guide to help you get started with the ARN API, including authentication, making your
              first request, and understanding the response.
            </p>
            <Link to="/getting-started">View Getting Started Guide</Link>
          </div>

          <div className="support-resource">
            <i className="fas fa-book"></i>
            <h3>API Reference</h3>
            <p>
              Comprehensive documentation for all ARN API endpoints, including request parameters, response formats,
              and example code.
            </p>
            <Link to="/endpoints/typeahead/city-search">View API Reference</Link>
          </div>

          <div className="support-resource">
            <i className="fas fa-tools"></i>
            <h3>Technical Reference</h3>
            <p>
              Detailed information about error codes, sort types, property amenities, and other technical aspects
              of the ARN API.
            </p>
            <Link to="/technical-reference/error-codes">View Technical Reference</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Support;
