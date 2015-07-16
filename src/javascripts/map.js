/* JS dependencies */
import React from 'react';

/* Static dependencies */
import mapImage from '../images/map.jpg';

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
			<div className="map_sec">
				<div ref="mapCanvas" className="map_canvas"></div>
			</div>
		);
	}

	componentDidMount () {
		var mapCanvas = React.findDOMNode(this.refs.mapCanvas);
		var map;
		var twitterMarkers = [];

		map = placeGoogleMaps(mapCanvas);
		twitterMarkers = generateRandomMarkers();
		placeMarkerAndInfoWins(twitterMarkers);

		function placeGoogleMaps (canvas) {
			var mapOptions = {
				center: new google.maps.LatLng(22.5069837,-45.0795827),
				zoom: 2,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			return new google.maps.Map(canvas, mapOptions);			
		}

		function generateRandomMarkers () {
			var resultMarkers = [];

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
			for (var i = 0; i < 100; i++) {
				var personId = Math.floor(Math.random() * handles.length);
				resultMarkers.push({
					handle: handles[personId],
					picUrl: pics[personId],
					tweet: tweets[Math.floor(Math.random() * tweets.length)],
					lat: Math.random() * 180 - 90, // -90 ... +90
					lng: Math.random() * 360 - 180 // -180 ... +180
				});
			}

			return resultMarkers;			
		}

		function placeMarkerAndInfoWins (markers) {
			var twitterIconUrl = 'https://abs.twimg.com/favicons/favicon.ico';
			var infoWins = [];
			markers.forEach(function(markerData) {
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(markerData.lat, markerData.lng),
					map: map,
					// icon: twitterIconUrl
				});
				var infoWin = new google.maps.InfoWindow({
					content: 
						'<h4>' + markerData.handle + '</h4>' +
						'<img style="width:100px" src="' + markerData.picUrl + '" />' +
						'<div style="width:100px">' + markerData.tweet + '</div>' +
						'<button><img style="height:30px" src="https://cdn2.iconfinder.com/data/icons/socal-icon-set/2092/tw.png" /></button>' +
						'<button><img style="height:30px" src="http://simpleicon.com/wp-content/uploads/retweet.png" /></button>'
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
