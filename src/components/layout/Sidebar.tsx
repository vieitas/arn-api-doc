import React from 'react';
import { useLocation } from 'react-router-dom';
import SidebarSection from './SidebarSection';
import navigation from '../../data/navigation';

/**
 * A component for rendering the sidebar navigation
 */
const Sidebar: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  // Determine which section is active based on the current path
  const isApiReference = path.startsWith('/endpoints');
  const isTechnicalReference = path.startsWith('/technical-reference');
  const isSupport = path.startsWith('/support');

  // Get the appropriate navigation data based on the current path
  let activeSections = null;
  if (isApiReference) {
    activeSections = navigation.apiReference.sections;
  } else if (isTechnicalReference) {
    activeSections = navigation.technicalReference.sections;
  } else if (isSupport) {
    activeSections = navigation.support.sections;
  }

  return (
    <aside className="sidebar">
      {activeSections && (
        <div className="sidebar-content">
          {activeSections.map((section, index) => (
            <SidebarSection
              key={index}
              title={section.title}
              links={section.links}
            />
          ))}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
