import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarLinkProps {
  title: string;
  path: string;
}

/**
 * A component for rendering a single link in the sidebar
 */
const SidebarLink: React.FC<SidebarLinkProps> = ({ title, path }) => {
  return (
    <li>
      <NavLink to={path}>{title}</NavLink>
    </li>
  );
};

export default SidebarLink;
