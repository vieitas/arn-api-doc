import React from 'react';
import ParameterTable from '../common/ParameterTable';

interface Parameter {
  name: string;
  type: string;
  description: string;
  section?: string;
  required?: boolean;
  example?: string;
}

interface ResponseParametersSectionProps {
  parameters: Parameter[];
  title?: string;
}

/**
 * A reusable component for displaying response parameters in endpoint documentation
 * Supports grouping parameters by section
 */
const ResponseParametersSection: React.FC<ResponseParametersSectionProps> = ({
  parameters,
  title = 'Response Parameters'
}) => {
  // Define section order for consistent display
  const sectionOrder: Record<string, number> = {
    // Hotel Endpoints
    'ArnResponse Object': 1,
    'Info Object': 2,
    'RateDetails Object': 3,
    'HotelRateDetails Object': 4,
    'Hotel Object': 5,
    'RatePlan Object': 6,
    'Room Object': 7,
    'Policy Object': 8,
    'Service Object': 9,

    // Property Info Endpoint
    'Root Properties': 1,
    'Images Object': 2
  };

  // Check if parameters have sections
  const hasSections = parameters.some(param => param.section);

  if (!hasSections) {
    return (
      <div>
        <h3 id="response-parameters">{title}</h3>
        <ParameterTable parameters={parameters} showRequired={false} />
      </div>
    );
  }

  // Get unique sections and sort them
  const uniqueSections = Array.from(
    new Set(parameters.filter(param => param.section).map(param => param.section))
  ).sort((a, b) => (sectionOrder[a as string] || 999) - (sectionOrder[b as string] || 999));

  return (
    <div>
      <h3 id="response-parameters">{title}</h3>
      {uniqueSections.map(section => {
        // Filter parameters for this section
        const sectionParams = parameters.filter(param => param.section === section);

        return (
          <div key={String(section)} id={String(section).toLowerCase().replace(/\s+/g, '-')}>
            <h4 id={`${String(section).toLowerCase().replace(/\s+/g, '-')}-title`}>{String(section)}</h4>
            <ParameterTable
              parameters={sectionParams}
              showRequired={false}
              type="response"
            />
          </div>
        );
      })}
    </div>
  );
};

export default ResponseParametersSection;
