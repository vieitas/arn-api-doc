import React from 'react';

interface EndpointHeaderProps {
  title: string;
  description: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
}

const EndpointHeader: React.FC<EndpointHeaderProps> = ({ title, description }) => {
  return (
    <div className="content-header">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default EndpointHeader;
