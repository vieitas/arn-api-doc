import React from 'react';

interface EndpointImplementationTipsProps {
  endpointId: string;
}

/**
 * A component for displaying implementation tips for specific endpoints
 */
const EndpointImplementationTips: React.FC<EndpointImplementationTipsProps> = ({
  endpointId
}) => {
  if (endpointId === 'city-search') {
    return (
      <div className="alert alert-info" style={{ marginTop: '30px', marginBottom: '30px' }}>
        <h4 className="alert-title">Implementation Tips</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.5' }}>
          <li>For best results, send at least 2 characters in the <code>name</code> parameter</li>
          <li>The search is not case-sensitive</li>
          <li>Results are sorted by relevance and popularity</li>
          <li>If the <code>count</code> parameter is not specified, a default value of 10 will be used</li>
          <li>This endpoint is ideal for implementing autocomplete functionality in search forms. As the user types, you can make requests to this endpoint and display the results in a dropdown.</li>
          <li>Consider implementing debouncing in your UI to avoid making too many requests as the user types</li>
        </ul>
      </div>
    );
  }

  return null;
};

export default EndpointImplementationTips;
