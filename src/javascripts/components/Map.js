/* JS dependencies */
import React from 'react';
import jQuery from 'jquery';
import _ from "lodash";

/* Static dependencies */
import '../../stylesheets/components/map.scss';
// import tweet_content from '../../tweet_content.html';

/* Constants */
var minZoomLevel = 2;

export default class Map extends React.Component {
	constructor (...args) {
		super(...args);

		this.state = {
			map:           null,
			infowinLayout: null,
			infowins:      [],
			markers:       []
		};
	}

	render () {
		return (
			<div ref="mapCanvas" className="map_canvas"></div>
		);
	}

	componentDidMount () {
		var self = this;
		var mapCanvas = React.findDOMNode(self.refs.mapCanvas);

		self.state.map = placeGoogleMaps(mapCanvas);

		function placeGoogleMaps (canvas) {
			var mapOptions = {
				center:           new google.maps.LatLng(38.6, 41.7),
				zoom:             2,
				scrollwheel:      false,
				disableDefaultUI: true,   // a way to quickly hide all controls
				mapTypeControl:   false,
				scaleControl:     true,
				zoomControl:      true,
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle.LARGE 
				},
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map(canvas, mapOptions);
			return map;
		}

		var mapAdjuster = function () {
			
			// if (strictBounds.contains(self.state.map.getCenter()))
			// 	return;

			// We're out of bounds - Move the map back within the bounds

			var center = self.state.map.getCenter(),
				lng    = center.lng(),
				lat    = center.lat(),
				zoom   = self.state.map.getZoom();

			if (zoom === 2 && lat > 44) lat = 44;
			if (zoom === 3 && lat > 72) lat = 72;
			if (zoom >=  4 && lat > 79) lat = 79;
			if (zoom === 2 && lat < -21) lat = -21;
			if (zoom === 3 && lat < -64) lat = -64;
			if (zoom >=  4 && lat < -77) lat = -77;
			self.state.map.setCenter(new google.maps.LatLng(lat, lng));

			if (zoom < minZoomLevel)
				self.state.map.setZoom(minZoomLevel);
		}

		google.maps.event.addListener(self.state.map, "drag", mapAdjuster);

		google.maps.event.addListener(self.state.map, "zoom_changed", mapAdjuster);
	}

	componentWillReceiveProps (nextProps) {
		var self = this;

		if (!_.isEqual(nextProps.bucketData.tweets, this.props.bucketData.tweets)) {

			/* Remove old markers and infowins */
			self.state.markers.forEach(function (marker) {
				marker.infowin.setMap(null);
				marker.setMap(null);
			});
			self.state.markers = [];

			/* Load layout for infowindow and place markers and infowins upon completion */
			if (self.state.infowinLayout) {
				placeMarkersAndInfoWins(nextProps.bucketData.tweets, self.state.infowinLayout);
			} else {
				// Load info window content if it's not yet loaded
				jQuery.get('tweet_content.html', function (data) {
					if (data) {
						self.state.infowinLayout = data;
						placeMarkersAndInfoWins(nextProps.bucketData.tweets, self.state.infowinLayout);
					}
				});
			}

			function placeMarkersAndInfoWins (tweets, contentLayout) {
				tweets.forEach(function(tweet) {
					/* Prepare infowindow content */
					var content = contentLayout;
					content = content.replace('{{ infowin_username }}', tweet.username);
					content = content.replace('{{ infowin_handle }}',   tweet.socialHandle);
					content = content.replace('{{ infowin_picUrl }}',   tweet.picUrl);
					content = content.replace('{{ infowin_tweet }}',    tweet.message);

					/* Place marker */
					var marker = new google.maps.Marker({
						position: new google.maps.LatLng(tweet.lat, tweet.lng),
						map:      self.state.map
					});
					self.state.markers.push(marker);
					/* Create infowindow */
					var infowin = new google.maps.InfoWindow({
						content: content
					});
					self.state.infowins.push(infowin);
					marker.infowin = infowin;
					/* When user clicks on a marker close all the infowindows and open only one */
					google.maps.event.addListener(marker, 'click', function() {
						self.state.infowins.forEach(function(infowin) {
							infowin.close();
						});
						infowin.open(self.state.map, marker);
					});
				});			
			}
		}
	}

}

Map.propTypes = {
	eventData:  React.PropTypes.object,
	bucketData: React.PropTypes.object
};