import React from 'react';
import OnThisPage from '../../components/common/OnThisPage';
import Alert from '../../components/common/Alert';
import TechRefCodeBlock from '../../components/technical-reference/TechRefCodeBlock';
import './PropertyAmenities.css';

const PropertyAmenities: React.FC = () => {
  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
    },
    {
      id: 'available-amenities',
      title: 'Available Amenities',
    },
    {
      id: 'usage-examples',
      title: 'Usage Examples',
    },
  ];

  const amenities = [
    {
      key: '1',
      value: 'Airport shuttle',
      description: 'Property offers an airport shuttle service'
    },
    {
      key: '2',
      value: 'Social hour',
      description: 'Property offers social hour events'
    },
    {
      key: '3',
      value: 'Fitness center',
      description: 'Property has a fitness center or gym'
    },
    {
      key: '4',
      value: 'Internet access',
      description: 'Property offers internet access'
    },
    {
      key: '5',
      value: 'Free local calls',
      description: 'Property offers free local calls'
    },
    {
      key: '6',
      value: 'Complimentary breakfast',
      description: 'Property offers complimentary breakfast'
    },
    {
      key: '7',
      value: 'Pets allowed',
      description: 'Property allows pets'
    },
    {
      key: '8',
      value: 'Pool',
      description: 'Property has a swimming pool'
    },
    {
      key: '9',
      value: 'Restaurant on-site',
      description: 'Property has an on-site restaurant'
    },
    {
      key: '10',
      value: 'Kitchen / kitchenette',
      description: 'Property offers kitchen or kitchenette facilities'
    }
  ];

  return (
    <>
      <div className="content-header">
        <h1>Property Amenities</h1>
        <p>Reference information about the amenities available for filtering properties</p>
      </div>

      <OnThisPage sections={sections} />

      <div id="introduction" className="section">
        <h2>Introduction</h2>
        <p>
          When searching for properties using the availability search endpoint, you can filter the results
          by amenities using the <code>propertyAmenities</code> parameter. This page provides reference information
          about the available amenities.
        </p>
        <Alert type="info" title="Multiple Amenities">
          <p>
            You can specify multiple amenities by separating them with commas. For example, &nbsp;<code>propertyAmenities=6,7,8</code>&nbsp;
            will filter for properties that have all three amenities.
          </p>
        </Alert>
      </div>

      <div id="available-amenities" className="section">
        <h2>Available Amenities</h2>
        <p>
          The following amenities are available for use with the <code>propertyAmenities</code> parameter:
        </p>
        <table className="amenities-table">
          <thead>
            <tr>
              <th>Key</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {amenities.map((amenity, index) => (
              <tr key={index}>
                <td><code>{amenity.key}</code></td>
                <td>{amenity.value}</td>
                <td>{amenity.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div id="usage-examples" className="section">
        <h2>Usage Examples</h2>
        <p>
          Here are examples of how to use the <code>propertyAmenities</code> parameter in API requests:
        </p>
        <h3>Filter for Properties with a Pool</h3>
        <TechRefCodeBlock
          code="GET https://api.travsrv.com/api/hotel?type=availability&inDate=2025-05-23&outDate=2025-05-24&propertyAmenities=8"
          language="http"
          title="HTTP Request"
        />
        <h3>Filter for Properties with Airport Shuttle and Restaurant</h3>
        <TechRefCodeBlock
          code="GET https://api.travsrv.com/api/hotel?type=availability&inDate=2025-05-23&outDate=2025-05-24&propertyAmenities=1,9"
          language="http"
          title="HTTP Request"
        />
        <h3>Filter for Properties with Multiple Amenities</h3>
        <TechRefCodeBlock
          code="GET https://api.travsrv.com/api/hotel?type=availability&inDate=2025-05-23&outDate=2025-05-24&propertyAmenities=6,7,8,9"
          language="http"
          title="HTTP Request"
        />
        <Alert type="warning" title="Note">
          <p>
            When specifying multiple amenities, the API will return only properties that have ALL of the specified amenities.
          </p>
        </Alert>
      </div>
    </>
  );
};

export default PropertyAmenities;
