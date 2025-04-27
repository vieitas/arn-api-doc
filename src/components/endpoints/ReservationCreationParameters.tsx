import React from 'react';
import { Parameter } from '../../data/types';
import ParameterTable from '../common/ParameterTable';

interface ReservationCreationParametersProps {
  parameters: Parameter[];
}

const ReservationCreationParameters: React.FC<ReservationCreationParametersProps> = ({ parameters }) => {
  // Filter parameters by section
  const basicParameters = parameters.filter(param => param.section === 'Basic Parameters');
  const bookingParameters = parameters.filter(param => param.section === 'Booking Parameters');
  const guestInformation = parameters.filter(param => param.section === 'Guest Information');
  const paymentInformation = parameters.filter(param => param.section === 'Payment Information');
  const rateInformation = parameters.filter(param => param.section === 'Rate Information');
  const additionalInformation = parameters.filter(param => param.section === 'Additional Information');

  // Other parameters that don't fit into the predefined sections
  const otherSections = Array.from(
    new Set(
      parameters
        .filter(param => param.section && !['Basic Parameters', 'Booking Parameters', 'Guest Information', 'Payment Information', 'Rate Information', 'Additional Information'].includes(param.section))
        .map(param => param.section)
    )
  );

  return (
    <>
      {/* Basic Parameters */}
      {basicParameters.length > 0 && (
        <div>
          <h4>Basic Parameters</h4>
          <ParameterTable parameters={basicParameters} showRequired={true} />
        </div>
      )}

      {/* Booking Parameters */}
      {bookingParameters.length > 0 && (
        <div>
          <p>
            <strong>Note:</strong> The booking parameters (hotelids, ratePlanCode, roomCode, gateway) must be obtained from previous Availability Search and Rate Details requests.
          </p>
          <h4>Booking Parameters</h4>
          <ParameterTable parameters={bookingParameters} showRequired={true} />
        </div>
      )}

      {/* Guest Information */}
      {guestInformation.length > 0 && (
        <div>
          <p>
            The following parameters are required for guest information:
          </p>
          <h4>Guest Information</h4>
          <ParameterTable parameters={guestInformation} showRequired={true} />
        </div>
      )}

      {/* Payment Information */}
      {paymentInformation.length > 0 && (
        <div>
          <p>
            The following parameters are required for payment information:
          </p>
          <h4>Payment Information</h4>
          <ParameterTable parameters={paymentInformation} showRequired={true} />
        </div>
      )}

      {/* Rate Information */}
      {rateInformation.length > 0 && (
        <div>
          <p>
            The following parameters contain rate information from the Rate Details response:
          </p>
          <h4>Rate Information</h4>
          <ParameterTable parameters={rateInformation} showRequired={true} />
        </div>
      )}

      {/* Additional Information */}
      {additionalInformation.length > 0 && (
        <div>
          <h4>Additional Information</h4>
          <ParameterTable parameters={additionalInformation} showRequired={true} />
        </div>
      )}

      {/* Other sections */}
      {otherSections.map(section => (
        <div key={String(section)}>
          <h4>{String(section)}</h4>
          <ParameterTable
            parameters={parameters.filter(param => param.section === section)}
            showRequired={true}
          />
        </div>
      ))}
    </>
  );
};

export default ReservationCreationParameters;
