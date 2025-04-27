import React from 'react';
import ParameterTable from '../common/ParameterTable';
import CodeBlock from '../common/CodeBlock';
import Alert from '../common/Alert';

interface RequestParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  example?: string;
  section?: string;
}

interface RequestExample {
  url: string;
  method: string;
  headers: Array<{
    name: string;
    value: string;
  }>;
  body?: string;
}

interface EndpointRequestSectionProps {
  endpointId?: string;
  requestDescription?: string;
  requestParametersDescription?: string;
  requestParametersNote?: string;
  requestParameters: RequestParameter[];
  requestExample: string | RequestExample;
}

/**
 * A component for displaying the request section of an endpoint documentation
 */
const EndpointRequestSection: React.FC<EndpointRequestSectionProps> = ({
  endpointId,
  requestDescription,
  requestParametersDescription,
  requestParametersNote,
  requestParameters,
  requestExample
}) => {
  return (
    <div className="section">
      <h2 id="request">Request</h2>

      {requestDescription && <p>{requestDescription}</p>}

      <h3 id="request-parameters">Request Parameters</h3>
      {requestParametersDescription ? (
        <p>{requestParametersDescription}</p>
      ) : (
        <p>The following parameters should be included in the query string:</p>
      )}

      {endpointId === 'reservation-creation' ? (
        <>
          <ParameterTable parameters={requestParameters.filter(param => !param.section || param.section === 'Basic Parameters')} />

          <p>
            <strong>Booking Parameters</strong><br />
            The following parameters are required for booking:
          </p>

          <Alert type="warning">
            <p>
              <strong>Note:</strong> The booking parameters (hotelids, ratePlanCode, roomCode, gateway) must be obtained from previous Availability Search and Rate Details requests.
            </p>
          </Alert>

          <ParameterTable parameters={requestParameters.filter(param => param.section === 'Booking Parameters')} />

          <p>
            <strong>Guest Information</strong><br />
            The following parameters are required for guest information:
          </p>

          <ParameterTable parameters={requestParameters.filter(param => param.section === 'Guest Information')} />

          <p>
            <strong>Payment Information</strong><br />
            The following parameters are required for payment information:
          </p>

          <ParameterTable parameters={requestParameters.filter(param => param.section === 'Payment Information')} />

          <p>
            <strong>Booking Information</strong><br />
            The following parameters contain booking information from the Rate Details response:
          </p>

          <ParameterTable parameters={requestParameters.filter(param => param.section === 'Booking Information')} />

          <p>
            <strong>Additional Parameters</strong><br />
            The following optional parameters allow customization of the booking experience and response format:
          </p>

          <ParameterTable parameters={requestParameters.filter(param => param.section === 'Additional Information')} />
        </>
      ) : endpointId === 'reservation-cancellation' ? (
        <>
          <p>
            <strong>URL Parameters</strong><br />
            The following parameters are included in the URL query string:
          </p>
          <ParameterTable parameters={requestParameters.filter(param => param.section === 'URL Parameters')} />

          <p>
            <strong>Form Data Parameters</strong><br />
            The following parameters are included in the request body as form data:
          </p>
          <ParameterTable parameters={requestParameters.filter(param => param.section === 'Form Data Parameters')} />
        </>
      ) : (
        <ParameterTable parameters={requestParameters} />
      )}

      {endpointId === 'availability' && (
        <p>* One of the following parameters is required to perform a location based search: hotelIds, refHotelId, locationId, or (latitude/longitude pair).</p>
      )}

      {requestParametersNote && endpointId !== 'reservation-creation' && (
        <p dangerouslySetInnerHTML={{ __html: requestParametersNote }}></p>
      )}

      <h3 id="request-example">Request Example</h3>
      <CodeBlock
        code={typeof requestExample === 'string' ? requestExample : `${requestExample.method} ${requestExample.url}
${requestExample.headers && requestExample.headers.length > 0 ? requestExample.headers.map(h => `${h.name}: ${h.value}`).join('\n') : ''}
${requestExample.body ? '\n' + requestExample.body : ''}`}
        language="http"
        title="HTTP Request"
      />
    </div>
  );
};

export default EndpointRequestSection;
