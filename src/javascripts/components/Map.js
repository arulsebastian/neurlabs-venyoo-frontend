/* JS dependencies */
import React from 'react';
import jQuery from 'jquery';
import _ from "lodash";

/* Static dependencies */
import '../../stylesheets/components/map.scss';
import tweet_content from '../../tweet_content.html';

export default class Map extends React.Component {
	constructor (...args) {
		super(...args);

		this.state = {
			map:           null,
			infowinLayout: null,
			infowins:      [],
			markers:       []
		};

		// function generateMarkers (num) {
		// 	var markers = [];

		// 	/* Generate random markers */
		// 	var handles = ['Polina', 'Sri', 'Lev', 'Jim', 'Farid'];
		// 	var pics = [
		// 		'http://images3.alphacoders.com/199/199875.jpg',
		// 		'http://www.unlulerkervani.com/data/media/1021/Sendhil-Ramamurthy_4.jpg',
		// 		'https://s-media-cache-ak0.pinimg.com/236x/75/9a/a6/759aa6249d3c3ffb64b34b53f6697105.jpg',
		// 		'https://s-media-cache-ak0.pinimg.com/474x/bc/9d/5e/bc9d5e337b511530ccc3fe2eff0ca8c1.jpg',
		// 		'http://i.dailymail.co.uk/i/pix/2013/10/10/article-2451604-18A46B5B00000578-415_306x423.jpg'
		// 	];
		// 	var tweets = [
		// 		'Life begins when you can spend your spare time programming instead of watching television.',
		// 		'I\'ve seen the forgeries I\'ve sent out.',
		// 		'jackpot: you may have an unneccessary change record',
		// 		'Success covers a multitude of blunders.',
		// 		'Danger, you haven\'t seen the last of me!',
		// 		'No, but the first of you turns my stomach!'
		// 	];
		// 	for (var i = 0; i < num; i++) {
		// 		var personId = Math.floor(Math.random() * handles.length);
		// 		markers.push({
		// 			position: {
		// 				lat: Math.random() * 180 - 90, // -90 ... +90
		// 				lng: Math.random() * 360 - 180 // -180 ... +180            
		// 			},
		// 			handle: handles[personId],
		// 			picUrl: pics[personId],
		// 			tweet:  tweets[Math.floor(Math.random() * tweets.length)]
		// 		});
		// 	}

		// 	return markers;
		// }
	}

	render () {
		return (
			<div ref="mapCanvas" className="map_canvas"></div>
		);
	}

	componentDidMount () {
		var mapCanvas = React.findDOMNode(this.refs.mapCanvas);

		this.state.map = placeGoogleMaps(mapCanvas);

		function placeGoogleMaps (canvas) {
			var mapOptions = {
				center:    new google.maps.LatLng(22.5069837,-45.0795827),
				zoom:      2,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			return new google.maps.Map(canvas, mapOptions);			
		}

		// function generateRandomMarkers (num) {
		// 	var resultMarkers = [];

		// 	var handles   = ['@polina', '@sri', '@lev', '@jim', '@farid'];
		// 	var usernames = ['Polina', 'Sri', 'Lev', 'Jim', 'Farid'];
		// 	var pics = [
		// 		'http://images3.alphacoders.com/199/199875.jpg',
		// 		'http://www.unlulerkervani.com/data/media/1021/Sendhil-Ramamurthy_4.jpg',
		// 		'https://s-media-cache-ak0.pinimg.com/236x/75/9a/a6/759aa6249d3c3ffb64b34b53f6697105.jpg',
		// 		'https://s-media-cache-ak0.pinimg.com/474x/bc/9d/5e/bc9d5e337b511530ccc3fe2eff0ca8c1.jpg',
		// 		'http://i.dailymail.co.uk/i/pix/2013/10/10/article-2451604-18A46B5B00000578-415_306x423.jpg'
		// 	];
		// 	var tweets = [
		// 		'Life begins when you can spend your spare time programming instead of watching television.',
		// 		'I\'ve seen the forgeries I\'ve sent out.',
		// 		'jackpot: you may have an unneccessary change record',
		// 		'Success covers a multitude of blunders.',
		// 		'Danger, you haven\'t seen the last of me!',
		// 		'No, but the first of you turns my stomach!'
		// 	];
		// 	for (var i = 0; i < num; i++) {
		// 		var personId = Math.floor(Math.random() * handles.length);
		// 		resultMarkers.push({
		// 			handle: handles[personId],
		// 			username: usernames[personId],
		// 			picUrl: pics[personId],
		// 			tweet: tweets[Math.floor(Math.random() * tweets.length)],
		// 			lat: Math.random() * 180 - 90, // -90 ... +90
		// 			lng: Math.random() * 360 - 180 // -180 ... +180
		// 		});
		// 	}

		// 	return resultMarkers;			
		// }
	}

	componentWillReceiveProps (nextProps) {
		var self = this;

		if (!_.isEqual(nextProps.bucketData.tweets, this.props.bucketData.tweets)) {

			/* Remove old markers and infowins */
			console.log("Map.componentWillReceiveProps state=", self.state);
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
				jQuery.get('/tweet_content.html', function (data) {
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
