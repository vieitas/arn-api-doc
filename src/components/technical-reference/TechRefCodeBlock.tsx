import React, { useState } from 'react';
import './TechRefCodeBlock.css';

interface TechRefCodeBlockProps {
  code: string;
  language: string;
  title?: string;
}

const TechRefCodeBlock: React.FC<TechRefCodeBlockProps> = ({ code, language, title }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isWrapped, setIsWrapped] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const toggleWrap = () => {
    setIsWrapped(!isWrapped);
  };

  // Highlight GET and POST methods with colored background
  const highlightHttpMethod = (code: string) => {
    if (language === 'http' || language === 'bash') {
      return code.replace(
        /(GET|POST)/g,
        (match) => {
          const className = match === 'GET' ? 'http-method-get' : 'http-method-post';
          return `<span class="${className}">${match}</span>`;
        }
      );
    }
    return code;
  };

  // Add syntax highlighting for JSON
  const highlightJson = (codeText: string) => {
    if (!codeText || language !== 'json') return codeText;

    return codeText
      .replace(/"([^"]+)":/g, '<span class="property">"$1"</span>:') // Properties
      .replace(/: "([^"]+)"/g, ': <span class="string">"$1"</span>') // Strings
      .replace(/: ([0-9]+)/g, ': <span class="number">$1</span>') // Numbers
      .replace(/: (true|false)/g, ': <span class="boolean">$1</span>') // Booleans
      .replace(/: (null)/g, ': <span class="null">$1</span>'); // Null
  };

  // Add syntax highlighting for JavaScript
  const highlightJavaScript = (codeText: string) => {
    if (!codeText || language !== 'javascript') return codeText;

    return codeText
      // Keywords
      .replace(/\b(function|return|if|for|while|var|let|const|new|this|typeof|instanceof|null|undefined|true|false|break|continue|switch|case|default|throw|try|catch|finally|class|extends|super|import|export|from|as|async|await|yield)\b/g, '<span class="keyword">$1</span>')
      // Strings
      .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
      .replace(/'([^']*)'/g, '<span class="string">\'$1\'</span>')
      // Numbers
      .replace(/\b(\d+(\.\d+)?)\b/g, '<span class="number">$1</span>')
      // Functions
      .replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, '<span class="function">$1</span>(')
      // Comments
      .replace(/\/\/(.*)$/gm, '<span class="comment">//$1</span>')
      .replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>');
  };

  // Apply all highlighting
  const applyHighlighting = (codeText: string) => {
    let result = highlightHttpMethod(codeText || '');
    result = highlightJson(result);
    result = highlightJavaScript(result);
    return result;
  };

  const highlightedCode = applyHighlighting(code);

  return (
    <div className="tech-ref-code-container">
      <div className="tech-ref-code-header">
        <span>{title || language}</span>
        <div className="tech-ref-code-actions">
          <button
            className={`tech-ref-wrap-lines-button ${isWrapped ? 'tech-ref-wrap-lines-active' : ''}`}
            onClick={toggleWrap}
          >
            <i className="fas fa-align-left"></i> Wrap lines
          </button>
          <button
            className={`tech-ref-copy-button ${isCopied ? 'tech-ref-copy-success' : ''}`}
            onClick={copyToClipboard}
          >
            <i className={`fas ${isCopied ? 'fa-check' : 'fa-copy'}`}></i> {isCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      <pre className={`code-block ${isWrapped ? 'wrap-lines' : ''}`}>
        <code
          className={`language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        ></code>
      </pre>
    </div>
  );
};

export default TechRefCodeBlock;
