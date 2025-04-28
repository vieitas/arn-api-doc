import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/common/ScrollToTop';
import Analytics from './components/analytics/Analytics';
import Home from './pages/Home';
import GettingStarted from './pages/GettingStarted';
import CitySearch from './pages/endpoints/typeahead/CitySearch';
import LandmarkSearch from './pages/endpoints/typeahead/LandmarkSearch';
import AirportSearch from './pages/endpoints/typeahead/AirportSearch';
import PropertySearch from './pages/endpoints/typeahead/PropertySearch';
import Availability from './pages/endpoints/hotel/Availability';
import RateDetails from './pages/endpoints/hotel/RateDetails';
import ReservationCreation from './pages/endpoints/hotel/ReservationCreation';
import ItineraryByLocator from './pages/endpoints/hotel/ItineraryByLocator';
import ItineraryByNumber from './pages/endpoints/hotel/ItineraryByNumber';
import ReservationCancellation from './pages/endpoints/hotel/ReservationCancellation';
import FeaturedHotelDeals from './pages/endpoints/content/FeaturedHotelDeals';
import FeaturedLocationDeals from './pages/endpoints/content/FeaturedLocationDeals';
import PropertyInfo from './pages/endpoints/content/PropertyInfo';
import ErrorCodes from './pages/technical-reference/ErrorCodes';
import SortTypes from './pages/technical-reference/SortTypes';
import PropertyAmenities from './pages/technical-reference/PropertyAmenities';
import PropertyClasses from './pages/technical-reference/PropertyClasses';
import PropertyTypes from './pages/technical-reference/PropertyTypes';
import AcceptedCreditCardTypes from './pages/technical-reference/AcceptedCreditCardTypes';
import TestCreditCardTriggers from './pages/technical-reference/TestCreditCardTriggers';
import Support from './pages/support/Support';
import ContactSupport from './pages/support/ContactSupport';
import TestingIntegration from './pages/support/TestingIntegration';
import WebhookIntegration from './pages/support/WebhookIntegration';
import Certification from './pages/certification/Certification';
import Resources from './pages/resources/Resources';

const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Analytics />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/getting-started" element={<GettingStarted />} />
          <Route path="/endpoints/typeahead/city-search" element={<CitySearch />} />
          <Route path="/endpoints/typeahead/landmark-search" element={<LandmarkSearch />} />
          <Route path="/endpoints/typeahead/airport-search" element={<AirportSearch />} />
          <Route path="/endpoints/typeahead/property-search" element={<PropertySearch />} />

          {/* Hotel Endpoints */}
          <Route path="/endpoints/hotel/availability" element={<Availability />} />
          <Route path="/endpoints/hotel/rate-details" element={<RateDetails />} />
          <Route path="/endpoints/hotel/reservation-creation" element={<ReservationCreation />} />
          <Route path="/endpoints/hotel/itinerary-by-locator" element={<ItineraryByLocator />} />
          <Route path="/endpoints/hotel/itinerary-by-confirmation" element={<ItineraryByNumber />} />
          <Route path="/endpoints/hotel/reservation-cancellation" element={<ReservationCancellation />} />

          {/* Content Endpoints */}
          <Route path="/endpoints/content/featured-hotel-deals" element={<FeaturedHotelDeals />} />
          <Route path="/endpoints/content/featured-location-deals" element={<FeaturedLocationDeals />} />
          <Route path="/endpoints/content/property-info" element={<PropertyInfo />} />
          <Route path="/technical-reference/sort-types" element={<SortTypes />} />
          <Route path="/technical-reference/property-amenities" element={<PropertyAmenities />} />
          <Route path="/technical-reference/property-classes" element={<PropertyClasses />} />
          <Route path="/technical-reference/property-types" element={<PropertyTypes />} />
          <Route path="/technical-reference/accepted-credit-card-types" element={<AcceptedCreditCardTypes />} />
          <Route path="/technical-reference/test-credit-card-triggers" element={<TestCreditCardTriggers />} />
          <Route path="/technical-reference/error-codes" element={<ErrorCodes />} />

          {/* Support Routes */}
          <Route path="/support" element={<Support />} />
          <Route path="/support/contact" element={<ContactSupport />} />
          <Route path="/support/index" element={<Support />} />
          <Route path="/support/testing-integration" element={<TestingIntegration />} />
          <Route path="/support/webhook-integration" element={<WebhookIntegration />} />

          {/* Certification Routes */}
          <Route path="/certification" element={<Certification />} />

          {/* Resources Routes */}
          <Route path="/resources" element={<Resources />} />

          {/* Add more routes here as we develop them */}
        </Routes>
      </Layout>
    </>
  );
};

export default App;
