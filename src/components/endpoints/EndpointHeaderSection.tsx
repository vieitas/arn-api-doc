import React from 'react';
import CodeBlock from '../common/CodeBlock';

interface EndpointHeaderSectionProps {
  method: string;
  url: string;
  endpointDescription?: string;
  category?: string;
  id?: string;
  description?: string;
}

/**
 * A component for displaying the endpoint header section with URL and description
 */
const EndpointHeaderSection: React.FC<EndpointHeaderSectionProps> = ({
  method,
  url,
  endpointDescription,
  category,
  id,
  description
}) => {
  return (
    <div className="section endpoint-section">
      <div className="endpoint-header">
        <h2 id="endpoint">Endpoint</h2>
      </div>
      <CodeBlock
        code={`${method} ${url}`}
        language="http"
        title="Endpoint"
      />
      {endpointDescription ? (
        <p dangerouslySetInnerHTML={{ __html: endpointDescription }}></p>
      ) : (
        <p>
          {category === 'typeahead'
            ? `This endpoint allows you to ${description?.toLowerCase() || 'search'}. It's useful for interfaces where the user types a ${id?.split('-')[0] || 'search'} name and receives real-time suggestions.`
            : `This endpoint allows you to ${description?.toLowerCase() || 'perform operations'}.`
          }
        </p>
      )}
    </div>
  );
};

export default EndpointHeaderSection;
