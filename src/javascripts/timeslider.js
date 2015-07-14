/* JS dependencies */
import React from 'react';
import Slider from 'bootstrap-slider';

/* Static dependencies */
import 'bootstrap-slider/dist/css/bootstrap-slider.min.css';
import sliderImage from '../images/start_image.jpg';

export default class TimeSlider extends React.Component {
	render () {
		return (
			<div className='start_detail'>
				<input 
					id="ex1"
					data-slider-id='ex1Slider'
					type="text"
					data-slider-min="0"
					data-slider-max="20"
					data-slider-step="1"
					data-slider-value="14"
					data-slider-handle="triangle" />
			</div>
		);
	}

	componentDidMount () {
		var slider = new Slider('#ex1', {
			formatter: function (value) {
				return 'Current value: ' + value;
			}
		});
	}
}
