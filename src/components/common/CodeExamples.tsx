import React from 'react';
import { CodeExample } from '../../data/types';
import CodeBlock from './CodeBlock';
import Tabs from './Tabs';

interface CodeExamplesProps {
  examples: CodeExample[];
}

const CodeExamples: React.FC<CodeExamplesProps> = ({ examples }) => {
  if (!examples || examples.length === 0) {
    return <p>No code examples available.</p>;
  }

  // Definir os exemplos padrão na ordem correta
  const standardExamples = ['cURL', 'Python', 'JavaScript', 'PHP'];

  // Mapear os exemplos para os nomes padrão
  const exampleMap = {
    'bash': 'cURL',
    'python': 'Python',
    'javascript': 'JavaScript',
    'php': 'PHP'
  };

  // Ordenar os exemplos conforme a ordem padrão
  const sortedExamples = [...examples].sort((a, b) => {
    const labelA = a.label || exampleMap[a.language] || a.language;
    const labelB = b.label || exampleMap[b.language] || b.language;

    const indexA = standardExamples.indexOf(labelA);
    const indexB = standardExamples.indexOf(labelB);

    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });

  // Mapear os exemplos para tabs com os nomes padrão
  const tabs = sortedExamples.map(example => {
    // Usar o nome padrão se disponível, caso contrário usar o label fornecido ou o nome da linguagem
    const label = exampleMap[example.language] || example.label || example.language;

    return {
      id: example.language,
      label: label,
      content: <CodeBlock code={example.code} language={example.language} />
    };
  });

  return <Tabs tabs={tabs} />;
};

export default CodeExamples;
