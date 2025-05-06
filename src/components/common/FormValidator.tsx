import React, { useState } from 'react';

interface FormValidatorProps {
  children: React.ReactNode;
  onSubmit: (formData: FormData) => void;
  className?: string;
  action?: string;
  method?: string;
  encType?: string;
  successMessage?: string;
  errorMessage?: string;
}

const FormValidator: React.FC<FormValidatorProps> = ({
  children,
  onSubmit,
  className,
  action,
  method = 'post',
  encType = 'application/x-www-form-urlencoded',
  successMessage = 'Form submitted successfully!',
  errorMessage = 'There was an error submitting the form. Please try again.'
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [validationErrors, setValidationErrors] = useState({} as Record<string, string>);

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
    setShowSuccess(false);
    setShowError(false);

    // Validate form
    if (!validateForm(form)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(form);
      await onSubmit(formData);

      // Show success message
      setShowSuccess(true);

      // Reset form
      form.reset();
    } catch (error) {
      // Show error message
      setShowError(true);
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

            if (inputElement && inputElement.props.name && validationErrors[inputElement.props.name]) {
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

        {showSuccess && (
          <div className="form-success show">
            {successMessage}
          </div>
        )}

        {showError && (
          <div className="form-error show">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default FormValidator;
