import React from 'react';
import EndpointPage from '../../../components/endpoints/EndpointPage';
import { typeaheadEndpoints } from '../../../data/endpoints/typeahead';

const CitySearch: React.FC = () => {
  const endpoint = typeaheadEndpoints.find(e => e.id === 'city-search');
  
  if (!endpoint) {
    return <div>Endpoint not found</div>;
  }
  
  return <EndpointPage endpoint={endpoint} />;
};

export default CitySearch;
