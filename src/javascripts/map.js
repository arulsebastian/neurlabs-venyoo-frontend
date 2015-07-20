/* JS dependencies */
import React from 'react';
import jQuery from 'jquery';

/* Static dependencies */
import tweet_content from '../tweet_content.html';

export default class Map extends React.Component {
	constructor (...args) {
		super(...args);
		var markers = generateMarkers(5);

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
			for (var i = 0; i < num; i++) {
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
		return (
			<div ref="mapCanvas" className="map_canvas" style="width: 100%; height: 718px;"></div>
		);
	}

	componentDidMount () {
		var mapCanvas = React.findDOMNode(this.refs.mapCanvas);
		var map;
		var twitterMarkers = [];

		map = placeGoogleMaps(mapCanvas);
		twitterMarkers = generateRandomMarkers(4);
		// Load info window content and place markers
		jQuery.get('/tweet_content.html', function (data) {
			if (data) {
				placeMarkerAndInfoWins(twitterMarkers, data);
			}
		});

		function placeGoogleMaps (canvas) {
			var mapOptions = {
				center: new google.maps.LatLng(22.5069837,-45.0795827),
				zoom: 2,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			return new google.maps.Map(canvas, mapOptions);			
		}

		function generateRandomMarkers (num) {
			var resultMarkers = [];

			var handles   = ['@polina', '@sri', '@lev', '@jim', '@farid'];
			var usernames = ['Polina', 'Sri', 'Lev', 'Jim', 'Farid'];
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
			for (var i = 0; i < num; i++) {
				var personId = Math.floor(Math.random() * handles.length);
				resultMarkers.push({
					handle: handles[personId],
					username: usernames[personId],
					picUrl: pics[personId],
					tweet: tweets[Math.floor(Math.random() * tweets.length)],
					lat: Math.random() * 180 - 90, // -90 ... +90
					lng: Math.random() * 360 - 180 // -180 ... +180
				});
			}

			return resultMarkers;			
		}

		function placeMarkerAndInfoWins (markers, contentLayout) {
			var twitterIconUrl = 'https://abs.twimg.com/favicons/favicon.ico';
			var infoWins = [];
			markers.forEach(function(markerData) {
				var content = contentLayout;
				content = content.replace('{{ infowin_username }}', markerData.username);
				content = content.replace('{{ infowin_handle }}', markerData.handle);
				content = content.replace('{{ infowin_picUrl }}', markerData.picUrl);
				content = content.replace('{{ infowin_tweet }}',  markerData.tweet);

				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(markerData.lat, markerData.lng),
					map: map
				});
				var infoWin = new google.maps.InfoWindow({
					content: content
				});
				infoWins.push(infoWin);
				google.maps.event.addListener(marker, 'click', function() {
					infoWins.forEach(function(infoWin) {
						infoWin.close();
					});
					infoWin.open(map, marker);
				});
			});			
		}

	}

}
