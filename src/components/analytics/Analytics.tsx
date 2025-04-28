import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Declare o tipo para a função gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: {
        page_path?: string;
        page_title?: string;
        [key: string]: any;
      }
    ) => void;
  }
}

const Analytics: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Quando a localização muda, envie um evento de visualização de página para o GA
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search + location.hash,
        page_title: document.title,
      });
      
      console.log('Analytics: Page view tracked', location.pathname + location.search + location.hash);
    }
  }, [location]);

  // Este componente não renderiza nada visível
  return null;
};

export default Analytics;
