import React from 'react';
import CodeBlock from '../common/CodeBlock';
import ResponseParametersSection from './ResponseParametersSection';

interface ResponseExample {
  status: number;
  body: string;
}

interface ResponseParameter {
  name: string;
  type: string;
  description: string;
  section?: string;
}

interface EndpointResponseSectionProps {
  endpointId?: string;
  responseDescription?: string;
  responseExample: ResponseExample;
  responseParameters: ResponseParameter[];
}

/**
 * A component for displaying the response section of an endpoint documentation
 */
const EndpointResponseSection: React.FC<EndpointResponseSectionProps> = ({
  endpointId,
  responseDescription,
  responseExample,
  responseParameters
}) => {
  return (
    <div className="section">
      <h2 id="response">Response</h2>
      <p>
        {responseDescription
          ? responseDescription
          : endpointId === 'city-search'
            ? 'The response includes a list of cities that match the search text.'
            : endpointId === 'landmark-search'
              ? 'The response includes a list of landmarks that match the search text.'
              : endpointId === 'airport-search'
                ? 'The response includes a list of airports that match the search text.'
                : endpointId === 'property-search'
                  ? 'The response includes a list of properties that match the search text.'
                  : 'The response includes data in JSON format.'}
      </p>

      <h3 id="response-example">Response Example</h3>
      <CodeBlock
        code={responseExample.body}
        language="json"
        title="JSON Response"
      />

      <ResponseParametersSection parameters={responseParameters} />
    </div>
  );
};

export default EndpointResponseSection;
