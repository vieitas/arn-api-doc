import React from 'react';

interface TestVsProductionSectionProps {
  title?: string;
  description?: string;
  differences: string[];
  endpointCategory?: string;
  endpointId?: string;
}

/**
 * A reusable component for displaying the Test x Production section in endpoint documentation
 */
const TestVsProductionSection: React.FC<TestVsProductionSectionProps> = ({
  title = 'Test x Production',
  description,
  differences,
  endpointCategory,
  endpointId
}) => {
  // Determine what content to show based on endpoint category and ID
  const isHotelReservationEndpoint =
    endpointCategory === 'hotel' &&
    (endpointId === 'reservation-creation' ||
     endpointId === 'itinerary-by-locator' ||
     endpointId === 'reservation-cancellation' ||
     endpointId === 'itinerary-by-confirmation');

  return (
    <div className="section">
      <h2 id="differences-production">{title}</h2>

      {endpointCategory !== 'hotel' ? (
        <>
          <p>In the production environment, you can expect:</p>
          <ul>
            {differences.map((difference, index) => (
              <li key={index}>{difference}</li>
            ))}
          </ul>
        </>
      ) : isHotelReservationEndpoint ? (
        <p>{description || "This section will be updated once we have a real production reservation to use as a reference."}</p>
      ) : (
        <>
          <p>The following fields are present in the production environment but not in the test environment. Applications should be designed to handle these additional fields when migrating to production.</p>
          <ul>
            {differences.map((difference, index) => (
              <li key={index}>{difference}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TestVsProductionSection;
