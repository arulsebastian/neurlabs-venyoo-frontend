/* JS dependencies */
import React from 'react';
import {GoogleMaps, Marker, InfoWindow} from 'react-google-maps';

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

      /* Generate random markers */
      var handles = ['Polina', 'Sri', 'Lev', 'Jim', 'Farid'];
      var pics = [
        'http://images3.alphacoders.com/199/199875.jpg',
        'http://www.unlulerkervani.com/data/media/1021/Sendhil-Ramamurthy_4.jpg',
        'https://s-media-cache-ak0.pinimg.com/236x/75/9a/a6/759aa6249d3c3ffb64b34b53f6697105.jpg',
        'https://s-media-cache-ak0.pinimg.com/474x/bc/9d/5e/bc9d5e337b511530ccc3fe2eff0ca8c1.jpg',
        'http://i.dailymail.co.uk/i/pix/2013/10/10/article-2451604-18A46B5B00000578-415_306x423.jpg'
      ];
      var tweets = [
        'Life begins when you can spend your spare time programming instead of watching television.',
        'I\'ve seen the forgeries I\'ve sent out.',
        'jackpot: you may have an unneccessary change record',
        'Success covers a multitude of blunders.',
        'Danger, you haven\'t seen the last of me!',
        'No, but the first of you turns my stomach!'
      ];
      for (var i = 0; i < 2; i++) {
        var personId = Math.floor(Math.random() * handles.length);
        markers.push({
          position: {
            lat: Math.random() * 180 - 90, // -90 ... +90
            lng: Math.random() * 360 - 180 // -180 ... +180            
          },
          handle: handles[personId],
          picUrl: pics[personId],
          tweet:  tweets[Math.floor(Math.random() * tweets.length)]
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
      var infoWindowContent = 
              '<h4>' + marker.handle + '</h4>' +
              '<img width="100px" src="' + marker.picUrl + '" />' +
              '<div style="width:100px">' + marker.tweet + '</div>' +
              '<button><img height="30px" src="https://cdn2.iconfinder.com/data/icons/socal-icon-set/2092/tw.png" /></button>' +
              '<button><img height="30px" src="http://simpleicon.com/wp-content/uploads/retweet.png" /></button>';

      return (
        <Marker
          position={marker.position}
          icon="https://abs.twimg.com/favicons/favicon.ico">
          <InfoWindow
            content={infoWindowContent} />
        </Marker>
      );
    }
  }


}
