import React from 'react';
import OnThisPage from '../../components/common/OnThisPage';
import Alert from '../../components/common/Alert';
import './ContactSupport.css';

const ContactSupport: React.FC = () => {
  const sections = [
    {
      id: 'overview',
      title: 'Overview',
    },
    {
      id: 'partner-request-form',
      title: 'Partner Request Form',
    },
    {
      id: 'information-to-include',
      title: 'Information to Include',
    },
  ];

  return (
    <>
      <div className="content-header">
        <h1>Contacting Support</h1>
        <p>How to get help with your ARN API integration</p>
      </div>

      <OnThisPage sections={sections} />

      <div id="overview" className="section">
        <h2>Overview</h2>
        <p>
          ARN provides dedicated support for API integration partners. Our support team is available to help you with
          any questions or issues you may encounter during your integration process or when using our API in production.
        </p>
        <Alert type="info" title="Support Channel">
          <p>
            Please submit all requests for support through the Partner Request form. All problems can be solved through this channel.
          </p>
        </Alert>
      </div>

      <div id="partner-request-form" className="section">
        <h2>Partner Request Form</h2>
        <p>
          The Partner Request form is the official channel for all support requests. This ensures that your request is
          properly tracked and routed to the appropriate team member.
        </p>
        <p>
          To submit a support request, please visit:
        </p>
        <div className="support-link-container">
          <a href="https://arn.support/" target="_blank" rel="noopener noreferrer" className="support-link" style={{color: 'white', textDecoration: 'none'}}>
            <i className="fas fa-external-link-alt"></i> ARN Partner Support Portal
          </a>
        </div>

      </div>

      <div id="information-to-include" className="section">
        <h2>Information to Include</h2>
        <p>
          To help us resolve your issue as quickly as possible, please include the following information in your support request:
        </p>
        <ul className="info-list">
          <li><strong>Site ID:</strong> Your ARN Site ID (e.g., 64 for test environment)</li>
          <li><strong>API Endpoint:</strong> The specific endpoint you're having issues with</li>
          <li><strong>Request Details:</strong> The full request URL and body (if applicable)</li>
          <li><strong>Response Details:</strong> The response you received, including any error messages</li>
          <li><strong>Expected Behavior:</strong> What you expected to happen</li>
          <li><strong>Actual Behavior:</strong> What actually happened</li>
          <li><strong>Steps to Reproduce:</strong> Detailed steps to reproduce the issue</li>
          <li><strong>Environment:</strong> Whether you're using the test or production environment</li>
          <li><strong>Timestamps:</strong> When the issue occurred (include timezone)</li>
        </ul>
        <Alert type="warning" title="Sensitive Information">
          <p>
            Never include sensitive information such as credit card numbers or authentication credentials in your support requests.
            If you need to share sensitive information, our support team will provide a secure method for doing so.
          </p>
        </Alert>
      </div>
    </>
  );
};

export default ContactSupport;
