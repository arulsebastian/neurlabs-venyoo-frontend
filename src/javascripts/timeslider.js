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
					<div>
					</div>
				</div>

			</div>
		);
	}

	componentDidMount () {
		var timeScale = React.findDOMNode(this.refs.sliderTimescale);

		timeScale.addEventListener("mousedown", function () {
			console.log('mouse is down');
		});
		timeScale.addEventListener("mouseup", function () {
			console.log('mouse is up');
		});
		timeScale.addEventListener("mousemove", function () {
			console.log('mouse is moving');
		});
	}
}
