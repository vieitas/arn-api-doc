import React from 'react';
import SidebarLink from './SidebarLink';

interface NavLink {
  title: string;
  path: string;
}

interface SidebarSectionProps {
  title: string;
  links: NavLink[];
}

/**
 * A component for rendering a section in the sidebar with a title and links
 */
const SidebarSection: React.FC<SidebarSectionProps> = ({ title, links }) => {
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {links.map((link, index) => (
          <SidebarLink key={index} title={link.title} path={link.path} />
        ))}
      </ul>
    </>
  );
};

export default SidebarSection;
