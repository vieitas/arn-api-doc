import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OnThisPage from '../../components/common/OnThisPage';
import FormValidator from '../../components/common/FormValidator';
import './Certification.css';

const Certification: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = async (formData: FormData) => {
    // Convert FormData to a plain object for easier handling
    const formValues: Record<string, string> = {};
    formData.forEach((value, key) => {
      formValues[key] = value.toString();
    });

    // In a real application, you would send this data to your server
    console.log('Form values:', formValues);

    // Simulate an API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setFormSubmitted(true);
        resolve();
      }, 1000);
    });
  };
  const sections = [
    {
      id: 'overview',
      title: 'Overview',
    },
    {
      id: 'certification-process',
      title: 'Certification Process',
      subsections: [
        {
          id: 'getting-started',
          title: 'Getting Started',
        },
        {
          id: 'development-testing',
          title: 'Development & Testing',
        },
        {
          id: 'verification-production',
          title: 'Verification & Production Access',
        },
      ],
    },
    {
      id: 'technical-requirements',
      title: 'Technical Requirements',
      subsections: [
        {
          id: 'functional-requirements',
          title: 'Functional Requirements',
        },
        {
          id: 'non-functional-requirements',
          title: 'Non-Functional Requirements',
        },
        {
          id: 'compliance-requirements',
          title: 'Compliance Requirements',
        },
      ],
    },
    {
      id: 'certification-support',
      title: 'Certification Support',
      subsections: [
        {
          id: 'contact-certification-support',
          title: 'Contact Certification Support',
        },
      ],
    },
    {
      id: 'post-certification',
      title: 'Post-Certification',
    },
  ];

  return (
    <>
      <div className="content-header">
        <h1>Hotels API Certification Program</h1>
        <p>Complete guide to becoming a certified ARN Hotels API integration partner</p>
      </div>

      <OnThisPage sections={sections} />

      <div id="overview" className="section">
        <h2>Overview</h2>
        <p>
          The ARN Hotels API Certification Program is designed to ensure that all integrations with our Hotels API meet the highest
          standards of quality, security, and performance. Becoming a certified partner provides numerous benefits,
          including enhanced support, access to additional features, and official recognition as a trusted integration partner.
        </p>


      </div>

      <div id="certification-process" className="section">
        <h2>Certification Process</h2>
        <p>
          Our certification process is straightforward and designed to verify your integration works correctly with our API.
        </p>

        <div className="certification-process-diagram">
          <div className="process-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Registration</h3>
              <p>Submit the form below</p>
            </div>
          </div>
          <div className="process-arrow">→</div>
          <div className="process-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Development</h3>
              <p>Build with test credentials</p>
            </div>
          </div>
          <div className="process-arrow">→</div>
          <div className="process-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Verification</h3>
              <p>Submit test results</p>
            </div>
          </div>
          <div className="process-arrow">→</div>
          <div className="process-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Production</h3>
              <p>Receive production access</p>
            </div>
          </div>
        </div>

        <div id="getting-started" className="subsection">
          <h3>Getting Started</h3>
          <p>
            To begin the certification process:
          </p>
          <ul>
            <li>Fill out the registration form below</li>
            <li>Review the API documentation on this site</li>
            <li>Request test credentials for integration testing</li>
            <li>Complete a series of API requests and responses</li>
            <li>Submit your test results for review</li>
          </ul>

          <div className="registration-form">
            <h3>Developer Registration Form</h3>
            <p>Please complete this form to request developer access. One of our Account Managers will contact you.</p>

            <FormValidator
              className="cert-form"
              onSubmit={handleFormSubmit}
              emailTo="clemente.vieitas@travelandleisure.com"
              successMessage="Thank you for your registration! We will contact you shortly."
              errorMessage="There was an error submitting the form. Please try again or contact support."
            >
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input type="text" id="fullName" name="fullName" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Business Email *</label>
                <input type="email" id="email" name="email" required />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input type="tel" id="phone" name="phone" required />
              </div>

              <div className="form-group">
                <label htmlFor="company">Company Name *</label>
                <input type="text" id="company" name="company" required />
              </div>

              <div className="form-group">
                <label htmlFor="website">Company Website *</label>
                <input type="url" id="website" name="website" required />
              </div>

              <div className="form-group">
                <label htmlFor="companySize">Company Size *</label>
                <select id="companySize" name="companySize" required>
                  <option value="">Select an option</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501+">501+ employees</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="businessType">Business Type *</label>
                <select id="businessType" name="businessType" required>
                  <option value="">Select an option</option>
                  <option value="OTA">Online Travel Agency (OTA)</option>
                  <option value="travelAgency">Travel Agency</option>
                  <option value="tourOperator">Tour Operator</option>
                  <option value="hotelChain">Hotel Chain</option>
                  <option value="technologyProvider">Technology Provider</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="otherBusinessType">If Other, please specify</label>
                <input type="text" id="otherBusinessType" name="otherBusinessType" />
              </div>

              <div className="form-group">
                <label htmlFor="monthlyBookings">Estimated Monthly Bookings *</label>
                <select id="monthlyBookings" name="monthlyBookings" required>
                  <option value="">Select an option</option>
                  <option value="<100">Less than 100</option>
                  <option value="100-500">100-500</option>
                  <option value="501-1000">501-1,000</option>
                  <option value="1001-5000">1,001-5,000</option>
                  <option value="5001+">More than 5,000</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="integrationPurpose">Integration Purpose *</label>
                <textarea id="integrationPurpose" name="integrationPurpose" rows={4} required
                  placeholder="Please describe how you plan to use our API"></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="technicalContact">Technical Contact Name *</label>
                <input type="text" id="technicalContact" name="technicalContact" required />
              </div>

              <div className="form-group">
                <label htmlFor="technicalEmail">Technical Contact Email *</label>
                <input type="email" id="technicalEmail" name="technicalEmail" required />
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-button">Submit Registration</button>
              </div>

              <p className="form-note">* Required fields</p>
            </FormValidator>
          </div>
        </div>

        <div id="development-testing" className="subsection">
          <h3>Development & Testing</h3>
          <p>
            During this phase, you'll build your integration and test it thoroughly using the test credentials:
          </p>
          <ul>
            <li>Implement all required API endpoints</li>
            <li>Develop proper error handling and retry mechanisms</li>
            <li>Implement security best practices</li>
            <li>Conduct thorough testing using our test scenarios</li>
            <li>Perform load and performance testing</li>
            <li>Document your test results</li>
          </ul>

          <div className="alert alert-warning">
            <h4 className="alert-title">Testing Requirements</h4>
            <p>
              Your integration must pass all test scenarios provided in our certification test suite.
              Make sure to test edge cases and error conditions thoroughly.
            </p>
          </div>
        </div>

        <div id="verification-production" className="subsection">
          <h3>Verification & Production Access</h3>
          <p>
            Once your integration is complete and tested:
          </p>
          <ul>
            <li>Submit your test results to our certification team</li>
            <li>Our team will review your submission (typically less than a week)</li>
            <li>After approval, you'll receive production credentials</li>
            <li>Deploy your integration to production</li>
          </ul>
        </div>
      </div>

      <div id="technical-requirements" className="section">
        <h2>Technical Requirements</h2>
        <p>
          To achieve certification, your integration must meet specific technical requirements across
          several categories.
        </p>

        <div id="functional-requirements" className="subsection">
          <h3>Functional Requirements</h3>
          <p>
            Your integration must implement the following core functionality:
          </p>

          <div className="requirements-table">
            <h4>Required Endpoints</h4>
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Required Endpoints</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Search</td>
                  <td>
                    <ul>
                      <li>City Search</li>
                      <li>Property Search</li>
                    </ul>
                  </td>
                  <td>Must support location and property search functionality</td>
                </tr>
                <tr>
                  <td>Availability</td>
                  <td>
                    <ul>
                      <li>Availability Search</li>
                      <li>Rate Details</li>
                    </ul>
                  </td>
                  <td>Must support searching for available properties and retrieving rate details</td>
                </tr>
                <tr>
                  <td>Booking</td>
                  <td>
                    <ul>
                      <li>Reservation Creation</li>
                      <li>Itinerary Retrieval</li>
                      <li>Reservation Cancellation</li>
                    </ul>
                  </td>
                  <td>Must support full booking lifecycle management</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Additionally, your integration must handle all standard business flows, including:
          </p>
          <ul>
            <li>Search-to-book flow with proper session management</li>
            <li>Booking modification and cancellation flows</li>
            <li>Error recovery and retry mechanisms</li>
            <li>Proper handling of edge cases (e.g., sold-out properties, rate changes)</li>
          </ul>
        </div>

        <div id="non-functional-requirements" className="subsection">
          <h3>Non-Functional Requirements</h3>
          <p>
            Your integration must meet the following non-functional requirements:
          </p>

          <div className="requirements-table">
            <h4>Performance & Reliability</h4>
            <table>
              <thead>
                <tr>
                  <th>Requirement</th>
                  <th>Threshold</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Response Time</td>
                  <td>&lt; 5 seconds</td>
                  <td>Client-side processing should not add more than 5 seconds to overall response time</td>
                </tr>
                <tr>
                  <td>Availability</td>
                  <td>99.9%</td>
                  <td>Your integration should maintain 99.9% uptime</td>
                </tr>
                <tr>
                  <td>Error Rate</td>
                  <td>&lt; 1%</td>
                  <td>Failed requests due to client-side issues should be less than 1%</td>
                </tr>
                <tr>
                  <td>Retry Logic</td>
                  <td>Required</td>
                  <td>Must implement exponential backoff retry for transient errors</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="requirements-table">
            <h4>Security Requirements</h4>
            <table>
              <thead>
                <tr>
                  <th>Requirement</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>TLS</td>
                  <td>Must use TLS 1.2 or higher for all API communications</td>
                </tr>
                <tr>
                  <td>Authentication</td>
                  <td>Must securely store API credentials and never expose them client-side</td>
                </tr>
                <tr>
                  <td>Data Protection</td>
                  <td>Must encrypt sensitive data at rest and in transit</td>
                </tr>
                <tr>
                  <td>Input Validation</td>
                  <td>Must validate all user inputs before passing to the API</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div id="compliance-requirements" className="subsection">
          <h3>Compliance Requirements</h3>
          <p>
            Your integration must comply with the following standards and regulations:
          </p>
          <ul>
            <li><strong>Data Privacy:</strong> Compliance with GDPR, CCPA, and other applicable data privacy regulations</li>
            <li><strong>PCI-DSS & PII:</strong> If handling payment information or personally identifiable information, compliance with PCI-DSS and PII data protection requirements</li>
            <li><strong>Accessibility:</strong> User interfaces should comply with WCAG 2.1 Level AA standards</li>
            <li><strong>API Usage:</strong> Adherence to API rate limits and usage policies</li>
            <li><strong>Branding:</strong> Proper use of ARN branding according to our brand guidelines</li>
          </ul>

          <div className="alert alert-info">
            <h4 className="alert-title">Submission Requirements</h4>
            <p>
              Include logs of your API requests and responses that demonstrate your integration works correctly
              with our test environment.
            </p>
          </div>
        </div>
      </div>



      <div id="certification-support" className="section">
        <h2>Certification Support</h2>
        <p>
          We provide dedicated support throughout the certification process:
        </p>
        <ul>
          <li><strong>Support Portal:</strong> Dedicated support portal for certification-related questions</li>
          <li><strong>Technical Consultations:</strong> Available if needed when issues cannot be resolved via email</li>
          <li><strong>Documentation:</strong> Comprehensive guides and best practices</li>
        </ul>

        <div id="contact-certification-support" className="support-contact">
          <h3>Contact Certification Support</h3>
          <p>
            For questions specific to the certification process, contact our certification team:
          </p>
          <ul>
            <li>Support Portal: <a href="https://arn.support/" target="_blank" rel="noopener noreferrer">https://arn.support/</a></li>
            <li>Support Hours: Monday-Friday, 9 AM - 5 PM EST</li>
            <li>Response Time: Within 1 business day</li>
          </ul>
        </div>
      </div>

      <div id="post-certification" className="section">
        <h2>Post-Certification</h2>
        <p>
          After certification, to maintain your production access:
        </p>

        <div className="post-cert-info">
          <ul>
            <li><strong>Transaction Volume:</strong> Maintain the minimum booking volume in your contract</li>
            <li><strong>API Updates:</strong> Update to new major API versions when released</li>
            <li><strong>Performance:</strong> Maintain acceptable error rates and response times</li>
          </ul>
        </div>


      </div>
    </>
  );
};

export default Certification;
