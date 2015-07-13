/* JS dependencies */
import React from 'react';
import {GoogleMaps, Marker} from 'react-google-maps';

/* Static dependencies */
import mapImage from '../images/map.jpg';

export default class Map extends React.Component {
  constructor (...args) {
    super(...args);
    var markers = generateMarkers(20);

    this.state = {
      markers: markers
    };

    function generateMarkers (num) {
      var markers = [];
      for (var i = 0; i < num; i++) {
        markers.push({
          position: {
            lat: Math.random() * 180 - 90,
            lng: Math.random() * 360 - 180
          },
          key: "Marker #" + i,
          animation: 3
        });
      }
      return markers;
    }
  }

  render () {
    const {props, state} = this;
          // {googleMapsApi, ...otherProps} = props;

    return (
      <div className='map_sec'>
        <GoogleMaps
          containerProps = {{
            // ...otherProps,
            style: {
              width: '400px',
              height: '400px'
            }
          }}
          googleMapsApi = { google.maps }
          zoom = { 1 }
          center = {{ lat: 25.363882, lng: 131.044922 }}>
          { state.markers.map(toMarker) }
        </GoogleMaps>
      </div>
    );

    function toMarker (marker, index) {
      return (
        <Marker
        position={marker.position}
        key={marker.key}
        animation={marker.animation} />
      );
    }
  }


}
