// Funções de utilidade para rastrear eventos personalizados no Google Analytics

// Rastreia cliques em links externos
export const trackExternalLinkClick = (linkUrl: string, linkText: string) => {
  if (window.gtag) {
    window.gtag('event', 'click_external_link', {
      link_url: linkUrl,
      link_text: linkText
    });
  }
};

// Rastreia cliques no botão "Run in Postman"
export const trackPostmanButtonClick = () => {
  if (window.gtag) {
    window.gtag('event', 'click_postman_button');
  }
};

// Rastreia visualizações de endpoints específicos
export const trackEndpointView = (endpointName: string, endpointCategory: string) => {
  if (window.gtag) {
    window.gtag('event', 'view_endpoint', {
      endpoint_name: endpointName,
      endpoint_category: endpointCategory
    });
  }
};

// Rastreia pesquisas no site
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  if (window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchTerm,
      results_count: resultsCount
    });
  }
};

// Rastreia downloads de recursos
export const trackResourceDownload = (resourceName: string, resourceType: string) => {
  if (window.gtag) {
    window.gtag('event', 'download_resource', {
      resource_name: resourceName,
      resource_type: resourceType
    });
  }
};

// Rastreia erros de formulário
export const trackFormError = (formName: string, errorField: string, errorMessage: string) => {
  if (window.gtag) {
    window.gtag('event', 'form_error', {
      form_name: formName,
      error_field: errorField,
      error_message: errorMessage
    });
  }
};

// Rastreia envios de formulário bem-sucedidos
export const trackFormSubmission = (formName: string) => {
  if (window.gtag) {
    window.gtag('event', 'form_submission', {
      form_name: formName
    });
  }
};
