interface NavLink {
  title: string;
  path: string;
}

interface NavSection {
  title: string;
  links: NavLink[];
}

interface NavigationConfig {
  [key: string]: {
    sections: NavSection[];
  };
}

const navigation: NavigationConfig = {
  apiReference: {
    sections: [
      {
        title: "Typeahead Endpoints",
        links: [
          { title: "City Search", path: "/endpoints/typeahead/city-search" },
          { title: "Landmark Search", path: "/endpoints/typeahead/landmark-search" },
          { title: "Airport Search", path: "/endpoints/typeahead/airport-search" },
          { title: "Property Search", path: "/endpoints/typeahead/property-search" }
        ]
      },
      {
        title: "Hotel Endpoints",
        links: [
          { title: "Availability Search", path: "/endpoints/hotel/availability" },
          { title: "Rate Details", path: "/endpoints/hotel/rate-details" },
          { title: "Reservation Creation", path: "/endpoints/hotel/reservation-creation" },
          { title: "Itinerary by Reservation Locator", path: "/endpoints/hotel/itinerary-by-locator" },
          { title: "Itinerary by Confirmation Number", path: "/endpoints/hotel/itinerary-by-confirmation" },
          { title: "Reservation Cancellation", path: "/endpoints/hotel/reservation-cancellation" }
        ]
      },
      {
        title: "Content Endpoints",
        links: [
          { title: "Featured Hotel Deals", path: "/endpoints/content/featured-hotel-deals" },
          { title: "Featured Location Deals", path: "/endpoints/content/featured-location-deals" },
          { title: "Property Info", path: "/endpoints/content/property-info" }
        ]
      }
    ]
  },
  technicalReference: {
    sections: [
      {
        title: "Technical Reference",
        links: [
          { title: "Sort Types", path: "/technical-reference/sort-types" },
          { title: "Property Amenities", path: "/technical-reference/property-amenities" },
          { title: "Property Classes", path: "/technical-reference/property-classes" },
          { title: "Property Types", path: "/technical-reference/property-types" },
          { title: "Accepted Credit Card Types", path: "/technical-reference/accepted-credit-card-types" },
          { title: "Test Credit Card Triggers", path: "/technical-reference/test-credit-card-triggers" },
          { title: "Error Codes", path: "/technical-reference/error-codes" }
        ]
      }
    ]
  },
  support: {
    sections: [
      {
        title: "Support",
        links: [
          { title: "Contacting Support", path: "/support/contact" },
          { title: "Testing Your Integration", path: "/support/testing-integration" },
          { title: "Webhook Integration", path: "/support/webhook-integration" }
        ]
      }
    ]
  }
};

export default navigation;
