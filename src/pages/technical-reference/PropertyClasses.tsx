import React from 'react';
import OnThisPage from '../../components/common/OnThisPage';
import Alert from '../../components/common/Alert';
import TechRefCodeBlock from '../../components/technical-reference/TechRefCodeBlock';
import './PropertyClasses.css';

const PropertyClasses: React.FC = () => {
  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
    },
    {
      id: 'available-property-classes',
      title: 'Available Property Classes',
    },
    {
      id: 'usage-examples',
      title: 'Usage Examples',
    },
  ];

  const propertyClasses = [
    {
      key: '1',
      starRating: '1',
      value: 'Economy',
      description: 'Economy, basic accommodations with limited amenities'
    },
    {
      key: '2',
      starRating: '2',
      value: 'Budget',
      description: 'Budget, affordable accommodations with basic amenities'
    },
    {
      key: '3',
      starRating: '3',
      value: 'Moderate',
      description: 'Moderate, mid-range accommodations with standard amenities'
    },
    {
      key: '4',
      starRating: '4',
      value: 'Premium',
      description: 'Premium, upscale accommodations with enhanced amenities'
    },
    {
      key: '5',
      starRating: '5',
      value: 'Luxury',
      description: 'Luxury, high-end accommodations with exceptional amenities and service'
    }
  ];

  return (
    <>
      <div className="content-header">
        <h1>Property Classes</h1>
        <p>Reference information about the property classes available for filtering properties</p>
      </div>

      <OnThisPage sections={sections} />

      <div id="introduction" className="section">
        <h2>Introduction</h2>
        <p>
          When searching for properties using the availability search endpoint, you can filter the results
          by property class using the <code>propertyClasses</code> parameter. This page provides reference information
          about the available property classes.
        </p>
        <Alert type="info" title="Multiple Property Classes">
          <p>
            You can specify multiple property classes by separating them with commas. For example, <code>propertyClasses=4,5</code>
            will filter for properties that are either Premium or Luxury class.
          </p>
        </Alert>
      </div>

      <div id="available-property-classes" className="section">
        <h2>Available Property Classes</h2>
        <p>
          The following property classes are available for use with the <code>propertyClasses</code> parameter:
        </p>
        <table className="property-classes-table">
          <thead>
            <tr>
              <th>Property Class</th>
              <th>Star Rating</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {propertyClasses.map((propertyClass, index) => (
              <tr key={index}>
                <td><code>{propertyClass.key}</code></td>
                <td>{propertyClass.starRating}</td>
                <td>{propertyClass.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div id="usage-examples" className="section">
        <h2>Usage Examples</h2>
        <p>
          Here are examples of how to use the <code>propertyClasses</code> parameter in API requests:
        </p>
        <h3>Filter for Economy Properties</h3>
        <TechRefCodeBlock
          code="GET https://api.travsrv.com/api/hotel?type=availability&inDate=2025-05-23&outDate=2025-05-24&propertyClasses=1"
          language="http"
          title="HTTP Request"
        />
        <h3>Filter for Premium and Luxury Properties</h3>
        <TechRefCodeBlock
          code="GET https://api.travsrv.com/api/hotel?type=availability&inDate=2025-05-23&outDate=2025-05-24&propertyClasses=4,5"
          language="http"
          title="HTTP Request"
        />
        <h3>Filter for Moderate to Premium Properties</h3>
        <TechRefCodeBlock
          code="GET https://api.travsrv.com/api/hotel?type=availability&inDate=2025-05-23&outDate=2025-05-24&propertyClasses=3,4"
          language="http"
          title="HTTP Request"
        />
        <Alert type="warning" title="Note">
          <p>
            When specifying multiple property classes, the API will return properties that match ANY of the specified classes.
          </p>
        </Alert>
      </div>
    </>
  );
};

export default PropertyClasses;
