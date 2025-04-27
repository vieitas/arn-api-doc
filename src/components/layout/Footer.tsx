import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>&copy; {currentYear} Alliance Reservation Network. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
