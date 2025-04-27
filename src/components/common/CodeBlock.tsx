import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/code-block.css';

/**
 * Supported programming languages for syntax highlighting
 */
export type CodeLanguage =
  | 'http'
  | 'json'
  | 'javascript'
  | 'typescript'
  | 'html'
  | 'css'
  | 'bash'
  | 'python'
  | 'php'
  | 'csharp'
  | 'java'
  | 'ruby'
  | 'go'
  | 'xml'
  | 'sql'
  | 'plaintext';

/**
 * Props for the CodeBlock component
 */
export interface CodeBlockProps {
  /**
   * The code to display
   */
  code: string;

  /**
   * The programming language of the code
   */
  language: CodeLanguage | string;

  /**
   * The title to display in the header
   */
  title?: string;

  /**
   * Whether to show line numbers
   * @default false
   */
  showLineNumbers?: boolean;

  /**
   * Whether to initially wrap lines
   * @default false
   */
  initiallyWrapped?: boolean;

  /**
   * Whether to show the copy button
   * @default true
   */
  showCopyButton?: boolean;

  /**
   * Whether to show the wrap lines button
   * @default true
   */
  showWrapButton?: boolean;

  /**
   * Custom CSS class for the code container
   */
  className?: string;

  /**
   * Callback function when code is copied
   */
  onCopy?: (code: string) => void;
}

/**
 * A component for displaying code with syntax highlighting
 */
const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  title,
  showLineNumbers = false,
  initiallyWrapped = false,
  showCopyButton = true,
  showWrapButton = true,
  className = '',
  onCopy
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isWrapped, setIsWrapped] = useState(initiallyWrapped);

  // Update wrap state when initiallyWrapped prop changes
  useEffect(() => {
    setIsWrapped(initiallyWrapped);
  }, [initiallyWrapped]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);

    // Call onCopy callback if provided
    if (onCopy) {
      onCopy(code);
    }
  }, [code, onCopy]);

  const toggleWrap = useCallback(() => {
    setIsWrapped(prev => !prev);
  }, []);

  // Clean up code by removing undefined values and duplicate headers
  const cleanupCode = useCallback((codeText: string): string => {
    if (!codeText) return '';

    // Fix for duplicate HTTP methods
    let cleanedCode = codeText.replace(/^(GET|POST|PUT|DELETE|PATCH)\s+(GET|POST|PUT|DELETE|PATCH)\s+/gm, '$1 ');

    // Remove duplicate headers with undefined values
    const lines = cleanedCode.split('\n');
    const uniqueLines: string[] = [];
    const seenHeaders = new Set<string>();

    for (const line of lines) {
      // Check if it's a header line with undefined value
      const headerMatch = line.match(/^([^:]+):\s*undefined\s*$/);
      if (headerMatch) {
        const headerName = headerMatch[1].trim();
        if (seenHeaders.has(headerName)) {
          continue; // Skip duplicate header
        }
        seenHeaders.add(headerName);
      }
      uniqueLines.push(line);
    }

    return uniqueLines.join('\n');
  }, []);

  // Highlight HTTP methods
  const highlightHttpMethod = useCallback((codeText: string): string => {
    if (!codeText) return '';

    if (language === 'http' || language === 'bash') {
      return codeText.replace(
        /(GET|POST|PUT|DELETE|PATCH|OPTIONS|HEAD)/g,
        (match) => {
          let className = '';
          switch (match) {
            case 'GET':
              className = 'http-method-get';
              break;
            case 'POST':
              className = 'http-method-post';
              break;
            case 'PUT':
              className = 'http-method-put';
              break;
            case 'DELETE':
              className = 'http-method-delete';
              break;
            case 'PATCH':
              className = 'http-method-patch';
              break;
            default:
              className = 'http-method-other';
          }
          return `<span class="${className}">${match}</span>`;
        }
      );
    }
    return codeText;
  }, [language]);

  // Highlight JSON syntax
  const highlightJson = useCallback((codeText: string): string => {
    if (!codeText || language !== 'json') return codeText;

    return codeText
      .replace(/"([^"]+)":/g, '<span class="property">"$1"</span>:') // Properties
      .replace(/: "([^"]+)"/g, ': <span class="string">"$1"</span>') // Strings
      .replace(/: ([0-9]+)/g, ': <span class="number">$1</span>') // Numbers
      .replace(/: (true|false)/g, ': <span class="boolean">$1</span>') // Booleans
      .replace(/: (null)/g, ': <span class="null">$1</span>'); // Null
  }, [language]);

  // Apply all highlighting
  const applyHighlighting = useCallback((codeText: string): string => {
    const cleanedCode = cleanupCode(codeText || '');
    let result = highlightHttpMethod(cleanedCode);
    result = highlightJson(result);
    return result;
  }, [cleanupCode, highlightHttpMethod, highlightJson]);

  // Memoize the highlighted code
  const highlightedCode = React.useMemo(() => {
    return applyHighlighting(code || '');
  }, [code, applyHighlighting]);

  return (
    <div className={`code-container ${className}`}>
      <div className="code-header">
        <span>{title || language}</span>
        <div className="code-actions">
          {showWrapButton && (
            <button
              className={`wrap-lines-button ${isWrapped ? 'wrap-lines-active' : ''}`}
              onClick={toggleWrap}
              title="Toggle line wrapping"
              aria-label="Toggle line wrapping"
            >
              <i className="fas fa-align-left"></i> Wrap lines
            </button>
          )}
          {showCopyButton && (
            <button
              className={`copy-button ${isCopied ? 'copy-success' : ''}`}
              onClick={copyToClipboard}
              title="Copy code to clipboard"
              aria-label="Copy code to clipboard"
            >
              <i className={`fas ${isCopied ? 'fa-check' : 'fa-copy'}`}></i> {isCopied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
      </div>
      <pre className={`code-block ${isWrapped ? 'wrap-lines' : ''} ${showLineNumbers ? 'code-block-with-line-numbers' : ''}`}>
        <code
          className={`language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        ></code>
      </pre>
    </div>
  );
};

export default CodeBlock;
