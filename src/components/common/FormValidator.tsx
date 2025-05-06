import React, { useState } from 'react';
import Modal from './Modal';

interface FormValidatorProps {
  children: React.ReactNode;
  onSubmit?: (formData: FormData) => void;
  className?: string;
  action?: string;
  method?: string;
  encType?: string;
  successMessage?: string;
  errorMessage?: string;
  emailTo?: string;
}

const FormValidator: React.FC<FormValidatorProps> = ({
  children,
  onSubmit,
  className,
  action,
  method = 'post',
  encType = 'application/x-www-form-urlencoded',
  successMessage = 'Form submitted successfully!',
  errorMessage = 'There was an error submitting the form. Please try again.',
  emailTo = 'clemente.vieitas@travelandleisure.com'
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState({} as Record<string, string>);
  const [formWasSubmitted, setFormWasSubmitted] = useState(false);

  const validateForm = (form: HTMLFormElement): boolean => {
    const formElements = Array.from(form.elements) as HTMLInputElement[];
    const errors: Record<string, string> = {};
    let isValid = true;

    formElements.forEach(element => {
      if (element.name && element.required && !element.value.trim()) {
        errors[element.name] = 'This field is required';
        isValid = false;
      } else if (element.name && element.type === 'email' && element.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(element.value)) {
          errors[element.name] = 'Please enter a valid email address';
          isValid = false;
        }
      }
    });

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Reset states
    setShowSuccessModal(false);
    setShowErrorModal(false);

    // Only validate form if it hasn't been submitted yet
    if (!formWasSubmitted) {
      setFormWasSubmitted(true);
    }

    // Validate form
    if (!validateForm(form)) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData object
      const formData = new FormData(form);

      // If using FormSubmit service
      if (!action || action.includes('mailto:')) {
        // Create a hidden form to submit to FormSubmit
        const hiddenForm = document.createElement('form');
        hiddenForm.style.display = 'none';
        hiddenForm.method = 'POST';
        hiddenForm.action = `https://formsubmit.co/${emailTo}`;
        hiddenForm.enctype = 'multipart/form-data';

        // Add all form data to the hidden form
        formData.forEach((value, key) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value.toString();
          hiddenForm.appendChild(input);
        });

        // Add FormSubmit specific fields
        const redirectInput = document.createElement('input');
        redirectInput.type = 'hidden';
        redirectInput.name = '_next';
        redirectInput.value = window.location.href;
        hiddenForm.appendChild(redirectInput);

        const captchaInput = document.createElement('input');
        captchaInput.type = 'hidden';
        captchaInput.name = '_captcha';
        captchaInput.value = 'false';
        hiddenForm.appendChild(captchaInput);

        // Append form to body, submit it, and remove it
        document.body.appendChild(hiddenForm);
        hiddenForm.submit();
        document.body.removeChild(hiddenForm);
      } else if (onSubmit) {
        // If custom onSubmit handler is provided
        await onSubmit(formData);
      }

      // Show success message
      setShowSuccessModal(true);

      // Reset form
      form.reset();
      setFormWasSubmitted(false);
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
      <form
        className={className}
        onSubmit={handleSubmit}
        action={action}
        method={method}
        encType={encType}
        noValidate
      >
        {React.Children.map(children, child => {
          if (React.isValidElement(child) && child.type === 'div' && child.props.className === 'form-group') {
            const inputElement = React.Children.toArray(child.props.children).find(
              c => React.isValidElement(c) && (c.type === 'input' || c.type === 'select' || c.type === 'textarea')
            ) as any;

            // Only show validation errors if the form was submitted
            if (formWasSubmitted && inputElement && inputElement.props.name && validationErrors[inputElement.props.name]) {
              return React.cloneElement(child, {
                className: `${child.props.className} error`,
                children: [
                  ...React.Children.toArray(child.props.children),
                  <div key="error" className="error-message">
                    {validationErrors[inputElement.props.name]}
                  </div>
                ]
              });
            }
          }
          return child;
        })}
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

export default FormValidator;
