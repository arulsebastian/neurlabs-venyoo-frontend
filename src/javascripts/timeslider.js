/* JS dependencies */
import React from 'react';
import Slider from 'bootstrap-slider';

/* Static dependencies */
import sliderImage from '../images/start_image.jpg';

export default class TimeSlider extends React.Component {
	render () {
		return (
			<div className='start_detail'>
				<img src={sliderImage} />
				
				<div className='slider_start_label'>
					Start
				</div>
				<div className='slider_finish_label'>
					Finish
				</div>
				<div className='slider_timescale' ref='sliderTimescale'>
					<canvas ref='sliderCanvas'/>
				</div>

			</div>
		);
	}

	componentDidMount () {
		var timeScale = React.findDOMNode(this.refs.sliderTimescale);
		var sliderCanvas = React.findDOMNode(this.refs.sliderCanvas);

		console.log('timeScale = ', timeScale);
		console.log('sliderCanvas = ', sliderCanvas);

		timeScale.addEventListener('mousedown', function () {
			console.log('mouse is down');
		});
		timeScale.addEventListener('mouseup', function () {
			console.log('mouse is up');
		});
		timeScale.addEventListener('mousemove', function () {
			console.log('mouse is moving');
		});
		window.addEventListener('resize', adjustCanvas);
		adjustCanvas();

		function adjustCanvas () {
			console.log('the div\'s size: ' + timeScale.offsetWidth + 'x' + timeScale.offsetHeight);
			sliderCanvas.width = timeScale.offsetWidth;
			sliderCanvas.height = timeScale.offsetHeight;

			/* Draw on a canvas */
			var ctx = sliderCanvas.getContext('2d');
			ctx.rect(10, 10, timeScale.offsetWidth - 20, 10);
			ctx.fillStyle = 'blue';
			ctx.fill();
		};
	}
}
