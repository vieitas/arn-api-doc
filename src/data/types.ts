/**
 * Type definitions for the data used in the application
 */

/**
 * HTTP methods supported by the API
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';

/**
 * API endpoint categories
 */
export type EndpointCategory = 'typeahead' | 'hotel' | 'content';

/**
 * Request example object
 */
export interface RequestExampleObject {
  url: string;
  method: HttpMethod;
  headers: HeaderParameter[];
  body?: string;
}

/**
 * Response example object
 */
export interface ResponseExampleObject {
  status: number;
  body: string;
}

/**
 * Interface for API endpoints
 */
export interface Endpoint {
  /**
   * Unique identifier for the endpoint
   */
  id: string;

  /**
   * Title of the endpoint
   */
  title: string;

  /**
   * Description of the endpoint
   */
  description: string;

  /**
   * HTTP method used by the endpoint
   */
  method: HttpMethod;

  /**
   * Full URL of the endpoint
   */
  url?: string;

  /**
   * Path part of the URL
   */
  path?: string;

  /**
   * Query parameters part of the URL
   */
  queryParams?: string;

  /**
   * Category of the endpoint
   */
  category: EndpointCategory;

  /**
   * Headers required by the endpoint
   */
  headers: HeaderParameter[];

  /**
   * Parameters required in the request
   */
  requestParameters: RequestParameter[];

  /**
   * Example request (can be a string URL or an object)
   */
  requestExample: string | RequestExampleObject;

  /**
   * Example response (can be a string body or an object)
   */
  responseExample: string | ResponseExampleObject;

  /**
   * Parameters returned in the response
   */
  responseParameters: ResponseParameter[];

  /**
   * Description of differences between test and production environments
   */
  testVsProduction: string;

  /**
   * Error codes that can be returned by the endpoint
   */
  errorCodes: ErrorCode[];

  /**
   * Code examples for using the endpoint
   */
  codeExamples: CodeExample[];

  /**
   * Additional description for the endpoint
   */
  endpointDescription?: string;

  /**
   * Description for the request section
   */
  requestDescription?: string;

  /**
   * Description for the request parameters section
   */
  requestParametersDescription?: string;

  /**
   * Note for the request parameters section
   */
  requestParametersNote?: string;

  /**
   * Description for the response section
   */
  responseDescription?: string;

  /**
   * Next steps after using this endpoint
   */
  nextSteps?: string;
}

/**
 * Base interface for parameters
 */
export interface BaseParameter {
  name: string;
  type: string;
  description: string;
  section?: string;
}

/**
 * Interface for request parameters
 */
export interface RequestParameter extends BaseParameter {
  required: boolean;
  example?: string;
}

/**
 * Interface for response parameters
 */
export interface ResponseParameter extends BaseParameter {
  nullable?: boolean;
  example?: string;
  required?: boolean;
}

/**
 * Interface for header parameters
 */
export interface HeaderParameter extends BaseParameter {
  required: string; // "Yes" or "No"
  value?: string;
  example?: string;
}

/**
 * Union type for all parameter types
 */
export type Parameter = RequestParameter | ResponseParameter | HeaderParameter;

export interface ErrorCode {
  code: string;
  message: string;
  description: string;
}

export interface CodeExample {
  language: string;
  label: string;
  code: string;
}

export interface CommonValueMap {
  id: string;
  name: string;
  values: {
    key: string;
    value: string;
    description?: string;
  }[];
}

export interface ApiVersion {
  version: string;
  releaseDate: string;
  description: string;
  changes: {
    type: 'added' | 'changed' | 'deprecated' | 'removed';
    description: string;
  }[];
}

export interface CouponCode {
  code: string;
  description: string;
  validFrom: string;
  validTo: string;
}

export interface TestCreditCard {
  type: string;
  number: string;
  expiryDate: string;
  cvv: string;
  description: string;
}

export interface PropertyType {
  id: string;
  name: string;
  description: string;
}

export interface CreditCardType {
  id: string;
  name: string;
  code: string;
  description: string;
}
