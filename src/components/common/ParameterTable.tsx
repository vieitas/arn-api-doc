import React from 'react';
import { Parameter, RequestParameter, ResponseParameter, HeaderParameter } from '../../data/types';
import './ParameterTable.css';

/**
 * Type of parameter table to render
 */
export type ParameterTableType = 'request' | 'response' | 'header';

/**
 * Props for the ParameterTable component
 */
export interface ParameterTableProps {
  /**
   * The parameters to display in the table
   */
  parameters: Parameter[];

  /**
   * The type of parameter table to render
   * @default 'request'
   */
  type?: ParameterTableType;

  /**
   * Whether to show the required column
   * @default true
   */
  showRequired?: boolean;

  /**
   * Whether to show the example column
   * @default false
   */
  showExample?: boolean;

  /**
   * Whether to show the value column (for header parameters)
   * @default false
   */
  showValue?: boolean;

  /**
   * Custom CSS class for the table
   */
  className?: string;

  /**
   * Custom CSS class for the table container
   */
  containerClassName?: string;

  /**
   * Custom title for the table
   */
  title?: string;

  /**
   * Custom description for the table
   */
  description?: string;
}

/**
 * A component for rendering a table of parameters
 */
const ParameterTable: React.FC<ParameterTableProps> = ({
  parameters,
  type = 'request',
  showRequired = true,
  showExample = false,
  showValue = false,
  className = '',
  containerClassName = '',
  title,
  description
}) => {
  if (!parameters || parameters.length === 0) {
    return <p>No parameters available.</p>;
  }

  // Check if we have sections (parameters with section property)
  const hasSections = parameters.some(param => param.section);

  // Function to render a table row based on parameter type
  const renderTableRow = (param: Parameter, index: number) => {
    return (
      <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
        <td><code>{param.name}</code></td>
        <td>{param.type}</td>

        {showRequired && (
          <td>
            {type === 'header'
              ? (param as HeaderParameter).required
              : type === 'request'
                ? (param as RequestParameter).required ? 'Yes' : 'No'
                : '-'
            }
          </td>
        )}

        {showValue && type === 'header' && (
          <td>{(param as HeaderParameter).value || '-'}</td>
        )}

        {showExample && (
          <td>
            {(param as RequestParameter | ResponseParameter).example
              ? <code>{(param as RequestParameter | ResponseParameter).example}</code>
              : '-'
            }
          </td>
        )}

        <td>{param.description}</td>
      </tr>
    );
  };

  // Function to render table headers based on parameter type
  const renderTableHeaders = () => {
    return (
      <tr>
        <th>Parameter</th>
        <th>Type</th>
        {showRequired && <th>Required</th>}
        {showValue && type === 'header' && <th>Value</th>}
        {showExample && <th>Example</th>}
        <th>Description</th>
      </tr>
    );
  };

  // Render a simple table if no sections
  if (!hasSections) {
    return (
      <div className={`parameter-table-container ${containerClassName}`}>
        {title && <h3>{title}</h3>}
        {description && <p>{description}</p>}
        <table className={`parameter-table ${className}`}>
          <thead>
            {renderTableHeaders()}
          </thead>
          <tbody>
            {parameters.map((param, index) => renderTableRow(param, index))}
          </tbody>
        </table>
      </div>
    );
  }

  // Group parameters by section
  const sections: Record<string, Parameter[]> = {};

  // Group parameters by section manually
  parameters.forEach(param => {
    const section = param.section || 'Default';
    if (!sections[section]) {
      sections[section] = [];
    }
    sections[section].push(param);
  });

  // Render tables by section
  return (
    <div className={`parameter-table-container ${containerClassName}`}>
      {title && <h3>{title}</h3>}
      {description && <p>{description}</p>}

      {Object.entries(sections).map(([sectionName, sectionParams]) => (
        <div key={sectionName} className="parameter-table-section">
          {/* Show section title if it's not Default and not a response parameter */}
          {sectionName !== 'Default' && type !== 'response' && <h4 id={`${sectionName.toLowerCase().replace(/\s+/g, '-')}-title`}>{sectionName}</h4>}
          <table className={`parameter-table ${className}`}>
            <thead>
              {renderTableHeaders()}
            </thead>
            <tbody>
              {(sectionParams as Parameter[]).map((param, index) => renderTableRow(param, index))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ParameterTable;
