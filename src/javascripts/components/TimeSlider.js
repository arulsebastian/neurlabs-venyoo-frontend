/* JS dependencies */
import React from 'react';

/* Static dependencies */
import '../../stylesheets/components/timeslider.scss';

/* Constants */
const pointerColor  = '#2E7FB1';
const sliderHeight  = 60;
const barHeight     = sliderHeight * 2/3;
const pointerHeight = sliderHeight - barHeight;
const pointerLength = pointerHeight / 0.866; // 0.866 is sin(pi/3)

export default class TimeSlider extends React.Component {
	constructor (props) {
		super(props);

		var intervalsNum = 72;  // 12 hours of 10min intervals
		var intervals    = [];

		for (var i = 0; i < intervalsNum; i++)
			intervals.push(Math.random());

		this.state = {
			startTime  : '1:00am',
			finishTime : '1:00pm',
			intervals  : intervals
		};
	}

	render () {
		return (
			<div className='start_detail'>
				
				<div className='slider_start_label'>
					<div>Start</div>
				</div>
				<div className='slider_finish_label'>
					<div>Finish</div>
				</div>
				<div className='slider_timescale' ref='sliderTimescale'>
					<span className='slider_start_time'>{this.state.startTime}</span>
					<span className='slider_finish_time'>{this.state.finishTime}</span>
					<canvas ref='sliderCanvas'/>
				</div>

			</div>
		);
	}

	componentDidMount () {
		/* Initialization */
		var self = this;
		var timeScale = React.findDOMNode(self.refs.sliderTimescale);
		var sliderCanvas = React.findDOMNode(self.refs.sliderCanvas);
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
			var leftSpace  = 0; // px
			var rightSpace = 0; // px
			var intervalWidth = (canvasDim.width - (leftSpace + rightSpace)) / self.state.intervals.length;
			var currInterval = 0;

			// Clear the canvas
			ctx.clearRect(0, 0, canvasDim.width, canvasDim.height);
			
			checkAndNormalizePointerPos();
			drawPlot();
			drawPointer();
			
			function checkAndNormalizePointerPos () {
				/* Default value is in the middle */
				if (pointerPos === null)
					pointerPos = canvasDim.width / 2;
				/* Make it stepwise and check boundaries */
				currInterval = posToIntervalNumber(pointerPos);
				if (currInterval < 0)
					currInterval = 0;
				if (currInterval >= self.state.intervals.length)
					currInterval =  self.state.intervals.length - 1;
				pointerPos = intervalNumberToPos(currInterval);
			}

			function drawPlot () {
				var plotPath = new Path2D();
				self.state.intervals.forEach(function (height, index) {
					plotPath.moveTo(intervalNumberToPos(index), barHeight);
					plotPath.lineTo(intervalNumberToPos(index), (barHeight - 1) - height * (barHeight * 0.90)); // 90% of the bar height
				});
				ctx.strokeStyle = '#000000';
				ctx.stroke(plotPath);
			}

			function drawPointer () {
				ctx.fillStyle = 'red';
				var pointerPath = new Path2D();
				pointerPath.moveTo(pointerPos,                     barHeight);
				pointerPath.lineTo(pointerPos + pointerLength / 2, sliderHeight);
				pointerPath.lineTo(pointerPos - pointerLength / 2, sliderHeight);
				ctx.fillStyle = pointerColor;
				ctx.fill(pointerPath);
			}

			function posToIntervalNumber (pos) {
				return Math.round((pos - leftSpace - intervalWidth / 2) / intervalWidth);
			}

			function intervalNumberToPos (intervalNum) {
				return (leftSpace + intervalWidth * (intervalNum + 0.5));
			}
		}		

		function attachMouseHandler () {
			var isMouseDown = false;

			timeScale.addEventListener('mousedown', function () {
				isMouseDown = true;
				drawCanvas();
			});
			// use window to allow mouse to go out of the element's boundaries
			window.addEventListener('mouseup', function () {
				isMouseDown = false;
			});
			window.addEventListener('mousemove', function (event) {
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
			var timeScaleRect = timeScale.getBoundingClientRect();

			/* Adjust canvas size */
			canvasDim.width  = sliderCanvas.width  = timeScaleRect.width;
			canvasDim.height = sliderCanvas.height = timeScaleRect.height;

			/* Save canvas position in 500ms */
			setTimeout(function () {
				var canvasRect = sliderCanvas.getBoundingClientRect();
				canvasDim.x = canvasRect.left;
				canvasDim.y = canvasRect.top;
			}, 100);

			drawCanvas();
		};
	}
}
