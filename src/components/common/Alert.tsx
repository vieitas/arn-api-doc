import React from 'react';

interface AlertProps {
  type: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Alert: React.FC<AlertProps> = ({ type, title, children, style }) => {
  return (
    <div className={`alert alert-${type}`} style={{ marginTop: '20px', ...style }}>
      {title && <h4 className="alert-title">{title}</h4>}
      {children}
    </div>
  );
};

export default Alert;
