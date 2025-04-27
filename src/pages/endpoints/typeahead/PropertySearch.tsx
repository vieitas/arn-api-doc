import React from 'react';
import EndpointPage from '../../../components/endpoints/EndpointPage';
import { typeaheadEndpoints } from '../../../data/endpoints/typeahead';

const PropertySearch: React.FC = () => {
  const endpoint = typeaheadEndpoints.find(e => e.id === 'property-search');

  if (!endpoint) {
    return <div>Endpoint not found</div>;
  }

  return (
    <EndpointPage endpoint={endpoint}>
      <div className="alert alert-warning" style={{ marginBottom: '20px' }}>
        <h4 className="alert-title">Note</h4>
        <p>Unlike other typeahead endpoints, the Property Search endpoint returns a simple array of strings rather than objects with detailed information. This is designed for quick autocomplete functionality where only the property name is needed.</p>
      </div>
      <div className="alert alert-info" style={{ marginTop: '30px', marginBottom: '30px' }}>
        <h4 className="alert-title">Implementation Tips</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.5' }}>
          <li>For best results, send at least 2 characters in the <code>name</code> parameter</li>
          <li>The search is not case-sensitive</li>
          <li>Results are sorted by relevance and popularity</li>
          <li>If the <code>count</code> parameter is not specified, a default value of 10 will be used</li>
          <li>Using the optional <code>locationId</code> parameter can help narrow down results to a specific location</li>
          <li>Consider implementing debouncing in your UI to avoid making too many requests as the user types</li>
          <li>This endpoint is ideal for implementing autocomplete functionality in hotel search forms</li>
        </ul>
      </div>
    </EndpointPage>
  );
};

export default PropertySearch;
