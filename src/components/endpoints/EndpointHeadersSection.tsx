import React from 'react';
import HeadersTable from '../common/HeadersTable';

interface Header {
  name: string;
  required: string;
  value?: string;
}

interface EndpointHeadersSectionProps {
  headers: Header[];
}

/**
 * A component for displaying the headers section of an endpoint documentation
 */
const EndpointHeadersSection: React.FC<EndpointHeadersSectionProps> = ({
  headers
}) => {
  return (
    <div className="section">
      <h2 id="headers">Headers</h2>
      <HeadersTable headers={headers} />
    </div>
  );
};

export default EndpointHeadersSection;
