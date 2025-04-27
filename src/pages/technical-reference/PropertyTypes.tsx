import React from 'react';
import OnThisPage from '../../components/common/OnThisPage';
import Alert from '../../components/common/Alert';
import TechRefCodeBlock from '../../components/technical-reference/TechRefCodeBlock';
import './PropertyTypes.css';

const PropertyTypes: React.FC = () => {
  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
    },
    {
      id: 'property-types',
      title: 'Property Types',
    },
    {
      id: 'filtering-by-type',
      title: 'Filtering by Type',
    },
  ];

  const propertyTypes = [
    {
      id: '1',
      name: 'Hotel - Limited Service',
      description: 'Hotel with limited services and amenities'
    },
    {
      id: '2',
      name: 'Hotel - Full Service',
      description: 'Hotel with full range of services and amenities'
    },
    {
      id: '3',
      name: 'Hotel/Conference Center',
      description: 'Hotel with conference facilities'
    },
    {
      id: '4',
      name: 'Hotel/Casino',
      description: 'Hotel with casino facilities'
    },
    {
      id: '5',
      name: 'Motel',
      description: 'Roadside accommodation designed for motorists'
    },
    {
      id: '6',
      name: 'Resort',
      description: 'Destination property with recreational facilities and amenities'
    },
    {
      id: '7',
      name: 'Inn & Suites',
      description: 'Small property offering lodging with suite options'
    },
    {
      id: '8',
      name: 'Extended stay property',
      description: 'Property designed for longer stays with kitchen facilities'
    },
    {
      id: '9',
      name: 'Bed and breakfast',
      description: 'Small lodging establishment offering overnight accommodation and breakfast'
    },
    {
      id: '10',
      name: 'Guest Ranch',
      description: 'Ranch that offers guest accommodations and activities'
    },
    {
      id: '11',
      name: 'Boutique',
      description: 'Small, stylish hotel with unique character'
    },
    {
      id: '12',
      name: 'Condo/Vacation Rental',
      description: 'Condominium or vacation rental property'
    }
  ];



  return (
    <>
      <div className="content-header">
        <h1>Property Types</h1>
        <p>Reference information about the different types of properties available through the API</p>
      </div>

      <OnThisPage sections={sections} />

      <div id="introduction" className="section">
        <h2>Introduction</h2>
        <p>
          The ARN API provides access to a wide variety of property types, from traditional hotels to unique
          accommodations like villas and cottages. Understanding the different property types can help you
          filter and present the right options to your users.
        </p>
        <p>
          This page provides reference information about the property types and categories available through the API,
          as well as how to filter search results by property type.
        </p>
      </div>

      <div id="property-types" className="section">
        <h2>Property Types</h2>
        <p>
          The following property types are available through the API. Each property type has a unique ID that can be
          used for filtering search results.
        </p>
        <table className="property-types-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {propertyTypes.map((type) => (
              <tr key={type.id}>
                <td><code>{type.id}</code></td>
                <td>{type.name}</td>
                <td>{type.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



      <div id="filtering-by-type" className="section">
        <h2>Filtering by Type</h2>
        <p>
          You can filter search results by property type using the <code>propertyTypes</code> parameter in the availability search endpoint.
        </p>
        <h3>Example: Filtering by Limited Service Hotels</h3>
        <p>
          To search for only limited service hotels, you would use the following request:
        </p>
        <TechRefCodeBlock
          code="GET https://api.travsrv.com/api/hotel?type=availability&inDate=2025-05-23&outDate=2025-05-24&propertyTypes=1"
          language="http"
          title="HTTP Request"
        />
        <h3>Example: Filtering by Hotels with Conference Centers and Casinos</h3>
        <p>
          To search for hotels with conference centers and casinos, you would use the following request:
        </p>
        <TechRefCodeBlock
          code="GET https://api.travsrv.com/api/hotel?type=availability&inDate=2025-05-23&outDate=2025-05-24&propertyTypes=3,4"
          language="http"
          title="HTTP Request"
        />
        <h3>Example: Filtering by Resorts and Boutique Properties</h3>
        <p>
          To search for resorts and boutique properties, you would use the following request:
        </p>
        <TechRefCodeBlock
          code="GET https://api.travsrv.com/api/hotel?type=availability&inDate=2025-05-23&outDate=2025-05-24&propertyTypes=6,11"
          language="http"
          title="HTTP Request"
        />
        <Alert type="info" title="Multiple Property Types">
          <p>
            You can specify multiple property types by separating them with commas. The API will return properties that match any of the specified types.
          </p>
        </Alert>
      </div>
    </>
  );
};

export default PropertyTypes;
