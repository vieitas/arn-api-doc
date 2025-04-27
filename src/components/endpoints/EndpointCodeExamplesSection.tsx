import React from 'react';
import CodeExamples from '../common/CodeExamples';

interface CodeExample {
  language: string;
  label: string;
  code: string;
}

interface EndpointCodeExamplesSectionProps {
  codeExamples: CodeExample[];
}

/**
 * A component for displaying code examples for an endpoint
 */
const EndpointCodeExamplesSection: React.FC<EndpointCodeExamplesSectionProps> = ({
  codeExamples
}) => {
  return (
    <div className="section">
      <h2 id="code-examples">Code Examples</h2>
      <CodeExamples examples={codeExamples} />
    </div>
  );
};

export default EndpointCodeExamplesSection;
