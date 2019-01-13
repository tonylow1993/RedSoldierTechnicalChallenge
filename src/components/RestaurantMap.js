import React from "react";
import { compose, withProps, withHandlers, withState } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow 
} from "react-google-maps";
import './index.css';

const google = window.google;

class RetaurantMap extends React.Component {

  render() {
    const { marker, refreshList } = this.props;
    
    const GoogleMapComponent = compose(
      withProps( () => ({
        googleMapURL:
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyD51SLrypF3VY59zkp42N5nFAm63G5RGVI&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `800px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
        marker
      })),
      withScriptjs,
      withGoogleMap,
      withState('places', 'updatePlaces', ''),
      withState('selectedPlace', 'updateSelectedPlace', null),
      withHandlers(() => {
        const refs = {
            map: undefined,
        }
    
        return {
          onMapMounted: () => ref => {
              refs.map = ref
          },
          fetchPlaces: ({ updatePlaces }) => {
            const bounds = refs.map.getBounds();
            const service = new google.maps.places.PlacesService(refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
            const request = {
                bounds: bounds,
                type: ['restaurant']
            };
            service.nearbySearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {

                    let sortedResult = results.map((restaurant) => {
                      let distance = Math.sqrt( Math.pow((restaurant.geometry.location.lat()-22.337406), 2) + Math.pow((restaurant.geometry.location.lng()-114.1485533), 2) );
                      return { ...restaurant, distance};
                    });

                    updatePlaces(sortedResult);
                    refreshList(sortedResult);
                    
                }
            })
          },
          onToggleOpen: ({ updateSelectedPlace }) => key => {
              updateSelectedPlace(key);
          }
        }
      })
    )(props => (
      <GoogleMap 
        defaultZoom={17}
        defaultCenter={{ lat: 22.337406, lng: 114.1485533 }}
        onTilesLoaded={props.fetchPlaces}
        ref={props.onMapMounted}
        onBoundsChanged={props.fetchPlaces}
      >
        {props.marker && 
            <Marker onClick={() => props.onToggleOpen(props.marker.name)} key={props.marker.name} position={{ lat: props.marker.lat, lng: props.marker.lng }}>
                {props.selectedPlace === props.marker.name && <InfoWindow onCloseClick={props.onToggleOpen}>
                    <div>
                        {props.marker.name}
                    </div>
                </InfoWindow>}
            </Marker>
        }
      </GoogleMap>
    ));

    return <GoogleMapComponent/>; 
  }
}

export default RetaurantMap;