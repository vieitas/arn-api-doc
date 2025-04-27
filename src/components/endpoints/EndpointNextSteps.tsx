import React from 'react';

interface EndpointNextStepsProps {
  content: string;
  title?: string;
}

/**
 * A reusable component for displaying the Next Steps section in endpoint documentation
 */
const EndpointNextSteps: React.FC<EndpointNextStepsProps> = ({
  content,
  title = 'Next Steps'
}) => {
  if (!content) return null;
  
  return (
    <div className="section">
      <h2 id="next-steps">{title}</h2>
      <p dangerouslySetInnerHTML={{ __html: content }}></p>
    </div>
  );
};

export default EndpointNextSteps;
