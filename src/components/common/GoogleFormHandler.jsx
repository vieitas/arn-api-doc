import React, { useState } from 'react';
import Modal from './Modal';

const GoogleFormHandler = ({
  className,
  endpoint = 'https://script.google.com/macros/s/AKfycbxOwhPoXESnlfqi-B6gomxzOlMuMpdPTlxFGw_OwbWFRWyVzHJOw3_XtKLafmFRoNeq-Q/exec',
  successMessage = 'Form submitted successfully!',
  errorMessage = 'There was an error submitting the form. Please try again.'
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    businessEmail: '',
    phoneNumber: '',
    companyName: '',
    companyWebsite: '',
    companySize: '',
    businessType: '',
    otherBusinessType: '',
    estimatedBookings: '',
    integrationPurpose: '',
    techContactName: '',
    techContactEmail: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Validate required fields
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required';
      isValid = false;
    }

    if (!formData.businessEmail.trim()) {
      errors.businessEmail = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.businessEmail)) {
        errors.businessEmail = 'Please enter a valid email address';
        isValid = false;
      }
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone Number is required';
      isValid = false;
    }

    if (!formData.companyName.trim()) {
      errors.companyName = 'Company Name is required';
      isValid = false;
    }

    if (!formData.companyWebsite.trim()) {
      errors.companyWebsite = 'Company Website is required';
      isValid = false;
    }

    if (!formData.companySize) {
      errors.companySize = 'Company Size is required';
      isValid = false;
    }

    if (!formData.businessType) {
      errors.businessType = 'Business Type is required';
      isValid = false;
    }

    if (!formData.estimatedBookings) {
      errors.estimatedBookings = 'Estimated Monthly Bookings is required';
      isValid = false;
    }

    if (!formData.integrationPurpose.trim()) {
      errors.integrationPurpose = 'Integration Purpose is required';
      isValid = false;
    }

    if (!formData.techContactName.trim()) {
      errors.techContactName = 'Technical Contact Name is required';
      isValid = false;
    }

    if (!formData.techContactEmail.trim()) {
      errors.techContactEmail = 'Technical Contact Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.techContactEmail)) {
        errors.techContactEmail = 'Please enter a valid email address';
        isValid = false;
      }
    }

    setValidationErrors(errors);
    return isValid;
  };

  // Add subject to the form data
  const addMetadata = (data) => {
    return {
      ...data,
      subject: 'Hotel API Documentation - Credentials request'
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset modals
    setShowSuccessModal(false);
    setShowErrorModal(false);

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Add metadata (recipient email and subject) and send data to Google Apps Script endpoint
      const dataWithMetadata = addMetadata(formData);
      const response = await fetch(endpoint, {
        method: 'POST',
        body: new URLSearchParams(dataWithMetadata),
      });

      const text = await response.text();

      if (text === 'OK') {
        // Show success message
        setShowSuccessModal(true);

        // Reset form
        setFormData({
          fullName: '',
          businessEmail: '',
          phoneNumber: '',
          companyName: '',
          companyWebsite: '',
          companySize: '',
          businessType: '',
          otherBusinessType: '',
          estimatedBookings: '',
          integrationPurpose: '',
          techContactName: '',
          techContactEmail: '',
        });
      } else {
        throw new Error(text || 'Form submission failed');
      }
    } catch (error) {
      // Show error message
      setShowErrorModal(true);
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <form className={className} onSubmit={handleSubmit} noValidate>
        <div className={`form-group ${validationErrors.fullName ? 'error' : ''}`}>
          <label htmlFor="fullName">Full Name *</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          {validationErrors.fullName && <div className="error-message">{validationErrors.fullName}</div>}
        </div>

        <div className={`form-group ${validationErrors.businessEmail ? 'error' : ''}`}>
          <label htmlFor="businessEmail">Business Email *</label>
          <input
            type="email"
            id="businessEmail"
            name="businessEmail"
            value={formData.businessEmail}
            onChange={handleChange}
            required
          />
          {validationErrors.businessEmail && <div className="error-message">{validationErrors.businessEmail}</div>}
        </div>

        <div className={`form-group ${validationErrors.phoneNumber ? 'error' : ''}`}>
          <label htmlFor="phoneNumber">Phone Number *</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          {validationErrors.phoneNumber && <div className="error-message">{validationErrors.phoneNumber}</div>}
        </div>

        <div className={`form-group ${validationErrors.companyName ? 'error' : ''}`}>
          <label htmlFor="companyName">Company Name *</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
          {validationErrors.companyName && <div className="error-message">{validationErrors.companyName}</div>}
        </div>

        <div className={`form-group ${validationErrors.companyWebsite ? 'error' : ''}`}>
          <label htmlFor="companyWebsite">Company Website *</label>
          <input
            type="url"
            id="companyWebsite"
            name="companyWebsite"
            value={formData.companyWebsite}
            onChange={handleChange}
            required
          />
          {validationErrors.companyWebsite && <div className="error-message">{validationErrors.companyWebsite}</div>}
        </div>

        <div className={`form-group ${validationErrors.companySize ? 'error' : ''}`}>
          <label htmlFor="companySize">Company Size *</label>
          <select
            id="companySize"
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
            required
          >
            <option value="">Select an option</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-500">201-500 employees</option>
            <option value="501+">501+ employees</option>
          </select>
          {validationErrors.companySize && <div className="error-message">{validationErrors.companySize}</div>}
        </div>

        <div className={`form-group ${validationErrors.businessType ? 'error' : ''}`}>
          <label htmlFor="businessType">Business Type *</label>
          <select
            id="businessType"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            required
          >
            <option value="">Select an option</option>
            <option value="OTA">Online Travel Agency (OTA)</option>
            <option value="travelAgency">Travel Agency</option>
            <option value="tourOperator">Tour Operator</option>
            <option value="hotelChain">Hotel Chain</option>
            <option value="technologyProvider">Technology Provider</option>
            <option value="other">Other</option>
          </select>
          {validationErrors.businessType && <div className="error-message">{validationErrors.businessType}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="otherBusinessType">If Other, please specify</label>
          <input
            type="text"
            id="otherBusinessType"
            name="otherBusinessType"
            value={formData.otherBusinessType}
            onChange={handleChange}
          />
        </div>

        <div className={`form-group ${validationErrors.estimatedBookings ? 'error' : ''}`}>
          <label htmlFor="estimatedBookings">Estimated Monthly Bookings *</label>
          <select
            id="estimatedBookings"
            name="estimatedBookings"
            value={formData.estimatedBookings}
            onChange={handleChange}
            required
          >
            <option value="">Select an option</option>
            <option value="<100">Less than 100</option>
            <option value="100-500">100-500</option>
            <option value="501-1000">501-1,000</option>
            <option value="1001-5000">1,001-5,000</option>
            <option value="5001+">More than 5,000</option>
          </select>
          {validationErrors.estimatedBookings && <div className="error-message">{validationErrors.estimatedBookings}</div>}
        </div>

        <div className={`form-group ${validationErrors.integrationPurpose ? 'error' : ''}`}>
          <label htmlFor="integrationPurpose">Integration Purpose *</label>
          <textarea
            id="integrationPurpose"
            name="integrationPurpose"
            rows={4}
            value={formData.integrationPurpose}
            onChange={handleChange}
            required
            placeholder="Please describe how you plan to use our API"
          ></textarea>
          {validationErrors.integrationPurpose && <div className="error-message">{validationErrors.integrationPurpose}</div>}
        </div>

        <div className={`form-group ${validationErrors.techContactName ? 'error' : ''}`}>
          <label htmlFor="techContactName">Technical Contact Name *</label>
          <input
            type="text"
            id="techContactName"
            name="techContactName"
            value={formData.techContactName}
            onChange={handleChange}
            required
          />
          {validationErrors.techContactName && <div className="error-message">{validationErrors.techContactName}</div>}
        </div>

        <div className={`form-group ${validationErrors.techContactEmail ? 'error' : ''}`}>
          <label htmlFor="techContactEmail">Technical Contact Email *</label>
          <input
            type="email"
            id="techContactEmail"
            name="techContactEmail"
            value={formData.techContactEmail}
            onChange={handleChange}
            required
          />
          {validationErrors.techContactEmail && <div className="error-message">{validationErrors.techContactEmail}</div>}
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Registration'}
          </button>
        </div>

        <p className="form-note">* Required fields</p>
      </form>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Success"
        type="success"
      >
        <p>{successMessage}</p>
      </Modal>

      {/* Error Modal */}
      <Modal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Error"
        type="error"
      >
        <p>{errorMessage}</p>
      </Modal>
    </div>
  );
};

export default GoogleFormHandler;
