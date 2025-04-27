import * as React from 'react';

declare module 'react' {
  export type FC<P = {}> = React.FunctionComponent<P>;
  export type ReactNode = React.ReactNode;
  export type CSSProperties = React.CSSProperties;
}

// Define tipos para os componentes
export interface CodeExample {
  language: string;
  label: string;
  code: string;
}

export interface AlertProps {
  type: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
}

export interface CodeExamplesProps {
  examples: CodeExample[];
}

export interface OnThisPageProps {
  sections: {
    id: string;
    title: string;
    subsections?: {
      id: string;
      title: string;
    }[];
  }[];
}

export interface ParameterTableProps {
  parameters: {
    name: string;
    type: string;
    description: string;
    required?: boolean;
    section?: string;
  }[];
  showRequired?: boolean;
}

export interface TabsProps {
  tabs: {
    id: string;
    label: string;
    content: React.ReactNode;
  }[];
}

export interface EndpointHeaderProps {
  title: string;
  description: string;
}

export interface EndpointPageProps {
  title?: string;
  description?: string;
  sections?: any[];
  endpoint: any;
  authentication?: any;
  requestParameters?: any[];
  requestExample?: any;
  responseExample?: any;
  responseParameters?: any[];
  testProduction?: any;
  codeExamples?: any[];
  children?: React.ReactNode;
}

export interface ReservationCreationParametersProps {
  parameters: any[];
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface TechRefCodeBlockProps {
  code: string;
  language: string;
  title?: string;
}
