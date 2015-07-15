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
		/* Initialization */
		var timeScale = React.findDOMNode(this.refs.sliderTimescale);
		var sliderCanvas = React.findDOMNode(this.refs.sliderCanvas);
		var ctx = sliderCanvas.getContext('2d');
		var canvasDim = {
			x : 0,
			y : 0,
			width  : 0,
			height : 0
		};
		var pointerPos = null; // current position of time pointer

		/* Event handlers */
		attachMouseHandler();
		attachResizeHandler();

		function drawCanvas () {
			var leftSpace = 10; // px
			var rightSpace = 10; // px

			if (pointerPos === null)
				pointerPos = canvasDim.width / 2;
			if (pointerPos < leftSpace)
				pointerPos = leftSpace;
			if (pointerPos > (canvasDim.width - rightSpace))
				pointerPos =  canvasDim.width - rightSpace;

			// Clear the canvas
			ctx.clearRect(0, 0, canvasDim.width, canvasDim.height);
			// Big blue rect :)
			ctx.fillStyle = 'blue';
			ctx.fillRect(10, 10, timeScale.offsetWidth - 20, 10);
			// Draw a triangle
			ctx.fillStyle = 'red';
			var path = new Path2D();
			path.moveTo(pointerPos,      20);
			path.lineTo(pointerPos + 10, 30);
			path.lineTo(pointerPos - 10, 30);
			ctx.fill(path);
		}		

		function attachMouseHandler () {
			var isMouseDown = false;

			timeScale.addEventListener('mousedown', function () {
				isMouseDown = true;
				drawCanvas();
			});
			timeScale.addEventListener('mouseup', function () {
				isMouseDown = false;
			});
			timeScale.addEventListener('mousemove', function (event) {
				pointerPos = event.pageX - canvasDim.x;

				if (isMouseDown) {
					drawCanvas();
				}
			});
		}

		function attachResizeHandler () {
			window.addEventListener('resize', resizeCanvas);
			resizeCanvas();
		}

		function resizeCanvas () {
			/* Adjust canvas size */
			canvasDim.width  = sliderCanvas.width  = timeScale.offsetWidth;
			canvasDim.height = sliderCanvas.height = timeScale.offsetHeight;

			/* Save canvas position */
			canvasDim.x = sliderCanvas.offsetLeft;
			canvasDim.y = sliderCanvas.offsetTop;

			drawCanvas();
		};
	}
}
