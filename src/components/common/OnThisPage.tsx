import React, { useState, useEffect } from 'react';
import './OnThisPage.css';

/**
 * Interface for a subsection in the OnThisPage component
 */
export interface OnThisPageSubsection {
  id: string;
  title: string;
}

/**
 * Interface for a section in the OnThisPage component
 */
export interface OnThisPageSection {
  id: string;
  title: string;
  subsections?: OnThisPageSubsection[];
}

/**
 * Props for the OnThisPage component
 */
export interface OnThisPageProps {
  /**
   * The sections to display in the OnThisPage component
   */
  sections: OnThisPageSection[];

  /**
   * Whether the component should be initially collapsed
   * @default false
   */
  initiallyCollapsed?: boolean;

  /**
   * Custom title for the component
   * @default "On This Page"
   */
  title?: string;

  /**
   * Custom CSS class for the component
   */
  className?: string;
}

/**
 * A component that displays a table of contents for a page
 */
const OnThisPage: React.FC<OnThisPageProps> = ({
  sections,
  initiallyCollapsed = false,
  title = "On This Page",
  className = ""
}) => {
  const [isCollapsed, setIsCollapsed] = useState(initiallyCollapsed);

  // Update collapse state when initiallyCollapsed prop changes
  useEffect(() => {
    setIsCollapsed(initiallyCollapsed);
  }, [initiallyCollapsed]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Don't render if there are no sections
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <div className={`on-this-page ${isCollapsed ? 'collapsed' : ''} ${className}`}>
      <div className="on-this-page-header">
        <h3>{title}</h3>
        <button
          className="toggle-button"
          onClick={toggleCollapse}
          aria-label={isCollapsed ? "Expand" : "Collapse"}
        >
          {isCollapsed ? '+' : '-'}
        </button>
      </div>
      <div className="on-this-page-content">
        <ul>
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.title}</a>
              {section.subsections && section.subsections.length > 0 && (
                <ul className="submenu">
                  {section.subsections.map((subsection) => (
                    <li key={subsection.id}>
                      <a href={`#${subsection.id}`}>{subsection.title}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OnThisPage;
