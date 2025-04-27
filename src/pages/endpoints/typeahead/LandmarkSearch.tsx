import React from 'react';
import EndpointPage from '../../../components/endpoints/EndpointPage';
import { typeaheadEndpoints } from '../../../data/endpoints/typeahead';

const LandmarkSearch: React.FC = () => {
  const endpoint = typeaheadEndpoints.find(e => e.id === 'landmark-search');

  if (!endpoint) {
    return <div>Endpoint not found</div>;
  }

  return (
    <EndpointPage endpoint={endpoint}>
      <div className="alert alert-info" style={{ marginTop: '30px', marginBottom: '30px' }}>
        <h4 className="alert-title">Implementation Tips</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.5' }}>
          <li>For best results, send at least 2 characters in the <code>name</code> parameter</li>
          <li>The search is not case-sensitive</li>
          <li>Results are sorted by relevance</li>
          <li>The Radius value (250) represents the distance in meters used to search for hotels near the landmark</li>
          <li>The geographic coordinates (Latitude and Longitude) can be used to display landmarks on a map interface</li>
          <li>Consider implementing debouncing in your UI to avoid making too many requests as the user types</li>
          <li>This endpoint is ideal for implementing autocomplete functionality for landmark searches</li>
        </ul>
      </div>
    </EndpointPage>
  );
};

export default LandmarkSearch;
