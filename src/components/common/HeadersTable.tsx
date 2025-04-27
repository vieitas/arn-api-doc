import React from 'react';

interface HeadersTableProps {
  headers: {
    name: string;
    value?: string;
    example?: string;
    description?: string;
    required?: string | boolean;
  }[];
}

const HeadersTable: React.FC<HeadersTableProps> = ({ headers }) => {
  return (
    <div className="parameter-table-container">
      <table className="parameter-table header-table">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Required</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {headers.map((header, index) => (
            <tr key={index}>
              <td><code>{header.name}</code></td>
              <td>{typeof header.required === 'boolean' ? (header.required ? 'Yes' : 'No') : (header.required || 'No')}</td>
              <td>{(header.value || header.example) && <code>{header.value || header.example}</code>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HeadersTable;
