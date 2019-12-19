/*
  Container for Map component
  Contains required sharable states for Map components
*/

// React
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Components
import Map from './Map';

const MapContainer = props => {
  // lat, lng info from redux
  const { lat, lng } = props;

  // google map services
  const [mapsApi, setMapsApi] = useState(null);
  const [autoCompleteService, setAutoCompleteService] = useState(null);
  const [placesServices, setPlacesServices] = useState(null);
  const [directionService, setDirectionService] = useState(null);
  const [geoCoderService, setGeoCoderService] = useState(null);

  // determine if map is loaded
  const [mapLoaded, setMapLoaded] = useState(false);
  // center lat lng position
  const [centerMarker, setCenterMarker] = useState({});

  // get the center marker after lat and lng is set in redux
  useEffect(() => {
    setCenterMarker({ lat, lng });
  }, [lat, lng]);

  // Initiate google map services after map is loaded
  const handleMapApiLoaded = (map, maps) => {
    setMapsApi(maps);
    setAutoCompleteService(new maps.places.AutocompleteService());
    setPlacesServices(new maps.places.PlacesService(map));
    setDirectionService(new maps.DirectionsService());
    setGeoCoderService(new maps.Geocoder());
    setMapLoaded(true);
  };

  const handleRestaurantSearch = () => {
    // 1. Create places request
    const placesRequest = {
      location: new mapsApi.LatLng(centerMarker.lat, centerMarker.lng),
      type: ['restaurant', 'cafe'],
      query: 'ice cream',
      rankBy: mapsApi.places.RankBy.DISTANCE
      // radius: 30000,
    };

    placesServices.textSearch(placesRequest, (h1, h2, h3, h4) =>
      console.log(h1, h2, h3, h4)
    );
  };

  return (
    <Map
      {...props}
      mapsApi={mapsApi}
      handleMapApiLoaded={handleMapApiLoaded}
      autoCompleteService={autoCompleteService}
      placesServices={placesServices}
      directionService={directionService}
      geoCoderService={geoCoderService}
      mapLoaded={mapLoaded}
      centerMarker={centerMarker}
      setCenterMarker={setCenterMarker}
      handleRestaurantSearch={handleRestaurantSearch}
    />
  );
};

// connect to redux
const mapStateToProps = state => {
  return {
    lat: state.Location.latitude,
    lng: state.Location.longitude
  };
};

MapContainer.propTypes = {
  lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  lng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};

export default connect(mapStateToProps, null)(MapContainer);
