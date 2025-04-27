import React from 'react';
import EndpointHeader from './EndpointHeader';
import OnThisPage, { OnThisPageSection } from '../common/OnThisPage';
import TestVsProductionSection from './TestVsProductionSection';
import EndpointNextSteps from './EndpointNextSteps';
import EndpointRequestSection from './EndpointRequestSection';
import EndpointResponseSection from './EndpointResponseSection';
import EndpointCodeExamplesSection from './EndpointCodeExamplesSection';
import EndpointHeaderSection from './EndpointHeaderSection';
import EndpointHeadersSection from './EndpointHeadersSection';
import EndpointImplementationTips from './EndpointImplementationTips';
import {
  Endpoint,
  HttpMethod,
  HeaderParameter,
  RequestParameter,
  ResponseParameter,
  CodeExample,
  RequestExampleObject,
  ResponseExampleObject
} from '../../data/types';

/**
 * Authentication configuration for an endpoint
 */
export interface EndpointAuthentication {
  /**
   * Whether authentication is required
   */
  required: boolean;

  /**
   * Headers required for authentication
   */
  headers: HeaderParameter[];
}

/**
 * Test vs Production configuration
 */
export interface TestProductionConfig {
  /**
   * Title for the section
   */
  title?: string;

  /**
   * Description for the section
   */
  description?: string;

  /**
   * List of differences between test and production environments
   */
  differences: string[];
}

/**
 * Props for the EndpointPage component
 */
export interface EndpointPageProps {
  /**
   * Title of the page (overrides endpoint.title)
   */
  title?: string;

  /**
   * Description of the page (overrides endpoint.description)
   */
  description?: string;

  /**
   * Sections to display in the OnThisPage component
   */
  sections?: OnThisPageSection[];

  /**
   * The endpoint to display
   */
  endpoint: Endpoint;

  /**
   * Authentication configuration (overrides endpoint.headers)
   */
  authentication?: EndpointAuthentication;

  /**
   * Request parameters (overrides endpoint.requestParameters)
   */
  requestParameters?: RequestParameter[];

  /**
   * Request example (overrides endpoint.requestExample)
   */
  requestExample?: string | RequestExampleObject;

  /**
   * Response example (overrides endpoint.responseExample)
   */
  responseExample?: ResponseExampleObject;

  /**
   * Response parameters (overrides endpoint.responseParameters)
   */
  responseParameters?: ResponseParameter[];

  /**
   * Test vs Production configuration (overrides endpoint.testVsProduction)
   */
  testProduction?: TestProductionConfig;

  /**
   * Code examples (overrides endpoint.codeExamples)
   */
  codeExamples?: CodeExample[];

  /**
   * Additional content to display
   */
  children?: React.ReactNode;
}

/**
 * A component for displaying an API endpoint documentation page
 */
const EndpointPage: React.FC<EndpointPageProps> = ({
  title: propTitle,
  description: propDescription,
  sections: propSections,
  endpoint,
  authentication: propAuthentication,
  requestParameters: propRequestParameters,
  requestExample: propRequestExample,
  responseExample: propResponseExample,
  responseParameters: propResponseParameters,
  testProduction: propTestProduction,
  codeExamples: propCodeExamples,
  children
}) => {
  // Use props or endpoint properties
  const title = propTitle || endpoint.title || '';
  const description = propDescription || endpoint.description || '';

  // Default sections for the page
  const defaultSections: OnThisPageSection[] = [
    {
      id: 'endpoint',
      title: 'Endpoint',
    },
    {
      id: 'headers',
      title: 'Headers',
    },
    {
      id: 'request',
      title: 'Request',
      subsections: [
        {
          id: 'request-parameters',
          title: 'Request Parameters',
        },
        {
          id: 'request-example',
          title: 'Request Example',
        },
      ],
    },
    {
      id: 'response',
      title: 'Response',
      subsections: [
        {
          id: 'response-example',
          title: 'Response Example',
        },
        {
          id: 'response-parameters',
          title: 'Response Parameters',
        },
      ],
    },
    {
      id: 'differences-production',
      title: 'Test x Production',
    },
    {
      id: 'code-examples',
      title: 'Code Examples',
    },
  ];

  // Add Next Steps section for non-typeahead endpoints
  if (endpoint.category !== 'typeahead') {
    defaultSections.push({
      id: 'next-steps',
      title: 'Next Steps',
    });
  }

  // Use provided sections or default sections
  const sections = propSections || defaultSections;

  // Handle authentication
  const authentication: EndpointAuthentication = propAuthentication || {
    required: true,
    headers: endpoint.headers
  };

  // Handle request parameters
  const requestParameters: RequestParameter[] = propRequestParameters || endpoint.requestParameters;

  // Handle request example
  let requestExample: RequestExampleObject;
  if (propRequestExample) {
    if (typeof propRequestExample === 'string') {
      requestExample = {
        url: propRequestExample,
        method: endpoint.method,
        headers: endpoint.headers
      };
    } else {
      requestExample = propRequestExample;
    }
  } else if (typeof endpoint.requestExample === 'string') {
    requestExample = {
      url: endpoint.requestExample,
      method: endpoint.method,
      headers: endpoint.headers
    };
  } else {
    requestExample = endpoint.requestExample as RequestExampleObject;
  }

  // Handle response example
  let responseExample: ResponseExampleObject;
  if (propResponseExample) {
    responseExample = propResponseExample;
  } else if (typeof endpoint.responseExample === 'string') {
    responseExample = {
      status: 200,
      body: endpoint.responseExample
    };
  } else {
    responseExample = endpoint.responseExample as ResponseExampleObject;
  }

  // Handle response parameters
  const responseParameters: ResponseParameter[] = propResponseParameters || endpoint.responseParameters;

  // Handle test vs production
  const testProduction: TestProductionConfig = propTestProduction || {
    differences: [endpoint.testVsProduction]
  };

  // Handle code examples
  const codeExamples: CodeExample[] = propCodeExamples || endpoint.codeExamples;

  // Construct the full URL
  const fullUrl = endpoint.url ||
    (endpoint.path && (endpoint.queryParams ? `${endpoint.path}?${endpoint.queryParams}` : endpoint.path));

  return (
    <>
      <EndpointHeader
        title={title}
        description={description}
        method={endpoint.method}
        url={fullUrl}
      />

      <OnThisPage sections={sections} />

      <EndpointHeaderSection
        method={endpoint.method}
        url={fullUrl}
        endpointDescription={endpoint.endpointDescription}
        category={endpoint.category}
        id={endpoint.id}
        description={description}
      />

      <EndpointHeadersSection headers={authentication.headers} />

      <EndpointRequestSection
        endpointId={endpoint.id}
        requestDescription={endpoint.requestDescription}
        requestParametersDescription={endpoint.requestParametersDescription}
        requestParametersNote={endpoint.requestParametersNote}
        requestParameters={requestParameters}
        requestExample={requestExample}
      />

      <EndpointResponseSection
        endpointId={endpoint.id}
        responseDescription={endpoint.responseDescription}
        responseExample={responseExample}
        responseParameters={responseParameters}
      />

      <TestVsProductionSection
        differences={testProduction.differences}
        endpointCategory={endpoint.category}
        endpointId={endpoint.id}
        description={testProduction.description}
      />

      {endpoint.id === 'city-search' ? (
        <EndpointImplementationTips endpointId={endpoint.id} />
      ) : (
        children
      )}

      <EndpointCodeExamplesSection codeExamples={codeExamples} />

      {endpoint.nextSteps && (
        <EndpointNextSteps content={endpoint.nextSteps} />
      )}
    </>
  );
};

export default EndpointPage;
