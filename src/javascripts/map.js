/* JS dependencies */
import React from 'react';
import {GoogleMaps} from 'react-google-maps';

/* Static dependencies */
import mapImage from '../images/map.jpg';

export default class Map extends React.Component {
  render () {
    const {props, state} = this;
          // {googleMapsApi, ...otherProps} = props;

    return (
      <div className='map_sec'>
        {/* <img src={mapImage} alt='' /> */}
        <GoogleMaps
          containerProps = {{
            // ...otherProps,
            style: {
              width: '400px',
              height: '400px'
            }
          }}
          googleMapsApi = {google.maps}
          zoom = {3}
          center = {{ lat: -25.363882, lng: 131.044922 }} />
      </div>
    );
  }
}
