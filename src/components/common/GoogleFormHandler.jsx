import React, { useState } from 'react';
import Modal from './Modal';

const GoogleFormHandler = ({
  className,
  endpoint = 'https://script.google.com/macros/s/AKfycbyHPWHpIoIJvT8_yhJhHqg1dUbWd_c2vsbDrnYO_OcPqmQJHnxHmUJtVFL0RzT9Mmpe0A/exec',
  successMessage = 'Form submitted successfully!',
  errorMessage = 'There was an error submitting the form. Please try again.'
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    companySize: '',
    businessType: '',
    otherBusinessType: '',
    monthlyBookings: '',
    integrationPurpose: '',
    technicalContact: '',
    technicalEmail: '',
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

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
        isValid = false;
      }
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone Number is required';
      isValid = false;
    }

    if (!formData.company.trim()) {
      errors.company = 'Company Name is required';
      isValid = false;
    }

    if (!formData.website.trim()) {
      errors.website = 'Company Website is required';
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

    if (!formData.monthlyBookings) {
      errors.monthlyBookings = 'Estimated Monthly Bookings is required';
      isValid = false;
    }

    if (!formData.integrationPurpose.trim()) {
      errors.integrationPurpose = 'Integration Purpose is required';
      isValid = false;
    }

    if (!formData.technicalContact.trim()) {
      errors.technicalContact = 'Technical Contact Name is required';
      isValid = false;
    }

    if (!formData.technicalEmail.trim()) {
      errors.technicalEmail = 'Technical Contact Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.technicalEmail)) {
        errors.technicalEmail = 'Please enter a valid email address';
        isValid = false;
      }
    }

    setValidationErrors(errors);
    return isValid;
  };

  // Add recipient email and subject to the form data
  const addMetadata = (data) => {
    return {
      ...data,
      recipient: 'clemente.vieitas@travelandleisure.com',
      subject: 'Hotel API Doc request'
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
          email: '',
          phone: '',
          company: '',
          website: '',
          companySize: '',
          businessType: '',
          otherBusinessType: '',
          monthlyBookings: '',
          integrationPurpose: '',
          technicalContact: '',
          technicalEmail: '',
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

        <div className={`form-group ${validationErrors.email ? 'error' : ''}`}>
          <label htmlFor="email">Business Email *</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
          {validationErrors.email && <div className="error-message">{validationErrors.email}</div>}
        </div>

        <div className={`form-group ${validationErrors.phone ? 'error' : ''}`}>
          <label htmlFor="phone">Phone Number *</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            value={formData.phone}
            onChange={handleChange}
            required 
          />
          {validationErrors.phone && <div className="error-message">{validationErrors.phone}</div>}
        </div>

        <div className={`form-group ${validationErrors.company ? 'error' : ''}`}>
          <label htmlFor="company">Company Name *</label>
          <input 
            type="text" 
            id="company" 
            name="company" 
            value={formData.company}
            onChange={handleChange}
            required 
          />
          {validationErrors.company && <div className="error-message">{validationErrors.company}</div>}
        </div>

        <div className={`form-group ${validationErrors.website ? 'error' : ''}`}>
          <label htmlFor="website">Company Website *</label>
          <input 
            type="url" 
            id="website" 
            name="website" 
            value={formData.website}
            onChange={handleChange}
            required 
          />
          {validationErrors.website && <div className="error-message">{validationErrors.website}</div>}
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

        <div className={`form-group ${validationErrors.monthlyBookings ? 'error' : ''}`}>
          <label htmlFor="monthlyBookings">Estimated Monthly Bookings *</label>
          <select 
            id="monthlyBookings" 
            name="monthlyBookings" 
            value={formData.monthlyBookings}
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
          {validationErrors.monthlyBookings && <div className="error-message">{validationErrors.monthlyBookings}</div>}
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

        <div className={`form-group ${validationErrors.technicalContact ? 'error' : ''}`}>
          <label htmlFor="technicalContact">Technical Contact Name *</label>
          <input 
            type="text" 
            id="technicalContact" 
            name="technicalContact" 
            value={formData.technicalContact}
            onChange={handleChange}
            required 
          />
          {validationErrors.technicalContact && <div className="error-message">{validationErrors.technicalContact}</div>}
        </div>

        <div className={`form-group ${validationErrors.technicalEmail ? 'error' : ''}`}>
          <label htmlFor="technicalEmail">Technical Contact Email *</label>
          <input 
            type="email" 
            id="technicalEmail" 
            name="technicalEmail" 
            value={formData.technicalEmail}
            onChange={handleChange}
            required 
          />
          {validationErrors.technicalEmail && <div className="error-message">{validationErrors.technicalEmail}</div>}
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
