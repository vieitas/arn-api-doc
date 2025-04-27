import React from 'react';
import OnThisPage from '../../components/common/OnThisPage';
import Alert from '../../components/common/Alert';
import TechRefCodeBlock from '../../components/technical-reference/TechRefCodeBlock';
import './SortTypes.css';

const SortTypes: React.FC = () => {
  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
    },
    {
      id: 'available-sort-types',
      title: 'Available Sort Types',
    },
    {
      id: 'usage-examples',
      title: 'Usage Examples',
    },
  ];

  const sortTypes = [
    {
      key: 'bestvalue',
      value: 'Best Value',
      description: 'Default sort based on previous booking trends and manual sorting options.'
    },
    {
      key: 'dealpercent',
      value: 'Deal Percent',
      description: 'Sorts the hotel results based on prices last seen and returns the best percentage savings we have found in the city historically and for those dates.'
    },
    {
      key: 'dealamount',
      value: 'Deal Amount',
      description: 'Sorts the hotel results based on prices last seen and returns the best amount savings we have found in the city historically and for those dates.'
    },
    {
      key: 'rebateamount',
      value: 'Rebate Amount',
      description: 'Sorts the hotel results based on best rebate dollar amount we have found in the city historically and for those dates. For use in conjunction with elective rebate percent configuration settings.'
    },
    {
      key: 'bestdeal',
      value: 'Best Deal',
      description: 'Sorts the hotel results based on largest/highest wholesale to retail margin. It also instructs our system on the backend to prioritize the supply returned.'
    }
  ];

  return (
    <>
      <div className="content-header">
        <h1>Sort Types</h1>
        <p>Reference information about the sort types available for search results</p>
      </div>

      <OnThisPage sections={sections} />

      <div id="introduction" className="section">
        <h2>Introduction</h2>
        <p>
          When searching for properties using the availability search endpoint, you can specify how the results
          should be sorted using the <code>sortType</code> parameter. This page provides reference information
          about the available sort types.
        </p>
        <Alert type="info" title="Default Sort Order">
          <p>
            If no sort type is specified, the API will use the <code>bestvalue</code> sort type by default.
          </p>
        </Alert>
      </div>

      <div id="available-sort-types" className="section">
        <h2>Available Sort Types</h2>
        <p>
          The following sort types are available for use with the <code>sortType</code> parameter:
        </p>
        <table className="sort-types-table">
          <thead>
            <tr>
              <th>Key</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {sortTypes.map((type, index) => (
              <tr key={index}>
                <td><code>{type.key}</code></td>
                <td>{type.value}</td>
                <td>{type.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div id="usage-examples" className="section">
        <h2>Usage Examples</h2>
        <p>
          Here are examples of how to use the <code>sortType</code> parameter in API requests:
        </p>
        <h3>Sort by Best Value (Default)</h3>
        <TechRefCodeBlock
          code="GET https://api.travsrv.com/api/hotel?type=availability&inDate=2025-05-23&outDate=2025-05-24&sortType=bestvalue"
          language="http"
          title="HTTP Request"
        />
        <h3>Sort by Deal Percent</h3>
        <TechRefCodeBlock
          code="GET https://api.travsrv.com/api/hotel?type=availability&inDate=2025-05-23&outDate=2025-05-24&sortType=dealpercent"
          language="http"
          title="HTTP Request"
        />
        <h3>Sort by Deal Amount</h3>
        <TechRefCodeBlock
          code="GET https://api.travsrv.com/api/hotel?type=availability&inDate=2025-05-23&outDate=2025-05-24&sortType=dealamount"
          language="http"
          title="HTTP Request"
        />
        <h3>Sort by Best Deal</h3>
        <TechRefCodeBlock
          code="GET https://api.travsrv.com/api/hotel?type=availability&inDate=2025-05-23&outDate=2025-05-24&sortType=bestdeal"
          language="http"
          title="HTTP Request"
        />
      </div>
    </>
  );
};

export default SortTypes;
