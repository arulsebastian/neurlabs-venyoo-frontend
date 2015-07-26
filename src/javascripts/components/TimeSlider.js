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

	// THE NEXT STEP IS TO
	// get data from EventBucketsStore through VenyooApp and show it on the Slider,
	// EventBucketsStore contains mock data that is enough for testing,
	// use data FROM API after the step described above is implemented


	// constructor (props) {
	// 	super(props);

	// 	var intervalsNum = 72;  // 12 hours of 10min intervals
	// 	var intervals    = [];

	// 	for (var i = 0; i < intervalsNum; i++)
	// 		intervals.push(Math.random());

	// 	this.state = {
	// 		startTime  : '1:00am',
	// 		finishTime : '1:00pm',
	// 		intervals  : intervals
	// 	};
	// }

	render () {
		var startTime      = this.props.eventBuckets.buckets[0].bucketTime;
		var finishTime     = this.props.eventBuckets.buckets[this.props.eventBuckets.buckets.length - 1].bucketTime;
		var sliderVisibility = (!this.props.eventBuckets.isLoading) ? "visible" : "hidden";
		var loadingDisplay   = (this.props.eventBuckets.isLoading)  ? "block"   : "none";

		return (
			<div className='start_detail' style={{ position: "relative" }}>
				
				<img src="http://sierrafire.cr.usgs.gov/images/loading.gif" style={{ display: loadingDisplay, height: "100px", left: "50%", position: "absolute" }}/>

				<div className='slider_start_label' style={{ visibility: sliderVisibility }}>
					<div>Start</div>
				</div>
				<div className='slider_finish_label' style={{ visibility: sliderVisibility }}>
					<div>Finish</div>
				</div>
				<div className='slider_timescale' ref='sliderTimescale' style={{ visibility: sliderVisibility }}>
					<span className='slider_start_time'>{startTime}</span>
					<span className='slider_finish_time'>{finishTime}</span>
					<canvas ref='sliderCanvas'/>
				</div>

			</div>
		);
	}

	componentDidMount () {
		/* Initialization */
		var self = this;
		var timeScale    = React.findDOMNode(self.refs.sliderTimescale);
		var sliderCanvas = React.findDOMNode(self.refs.sliderCanvas);
		var ctx          = sliderCanvas.getContext('2d');
		var canvasDim = {
			x : 0,
			y : 0,
			width  : 0,
			height : 0
		};
		var pointerPos = null; // current position of time pointer
		var currBucket = Math.ceil(self.props.eventBuckets.buckets.length / 2);

		/* Event handlers */
		attachMouseHandler();
		attachResizeHandler();

		function drawCanvas () {
			var leftSpace  = 0; // px
			var rightSpace = 0; // px
			var bucketsNumber = self.props.eventBuckets.buckets.length;
			var bucketWidth   = (canvasDim.width - (leftSpace + rightSpace)) / bucketsNumber;

			// Clear the canvas
			ctx.clearRect(0, 0, canvasDim.width, canvasDim.height);
			
			/* Find max number of tweets for normalization */
			var maxTweetsNumber = self.props.eventBuckets.buckets.reduce(function (prevValue, currValue, index, array) {
				return Math.max(prevValue, currValue.tweetsNumber);
			}, self.props.eventBuckets.buckets[0].tweetsNumber);

			checkAndNormalizePointerPos();
			drawPlot();
			drawPointer();
			
			function checkAndNormalizePointerPos () {
				/* Default value is in the middle */
				if (pointerPos === null)
					pointerPos = bucketNumberToPos(currBucket);
				/* Make it stepwise and check boundaries */
				currBucket = posToBucketNumber(pointerPos);
				if (currBucket < 0)
					currBucket = 0;
				if (currBucket >= bucketsNumber)
					currBucket =  bucketsNumber - 1;
				pointerPos = bucketNumberToPos(currBucket);
			}

			function drawPlot () {
				var plotPath = new Path2D();

				self.props.eventBuckets.buckets.forEach(function (bucket, index) {
					plotPath.moveTo(bucketNumberToPos(index), barHeight);
					plotPath.lineTo(bucketNumberToPos(index), (barHeight - 1) - bucket.tweetsNumber / maxTweetsNumber * (barHeight * 0.90)); // 90% of the bar height
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

			function posToBucketNumber (pos) {
				return Math.round((pos - leftSpace - bucketWidth / 2) / bucketWidth);
			}

			function bucketNumberToPos (bucketNum) {
				return (leftSpace + bucketWidth * (bucketNum + 0.5));
			}
		}		

		function attachMouseHandler () {
			var isMouseDown = false;
			var mousedownBucketNumber = currBucket; // value of currBucket when user clicked mouse down

			timeScale.addEventListener('mousedown', function () {
				isMouseDown = true;
				mousedownBucketNumber = currBucket;
				drawCanvas();
			});
			// use window to allow mouse to go out of the element's boundaries
			window.addEventListener('mouseup', function () {
				isMouseDown = false;
				// Fire event only 
				if (mousedownBucketNumber !== currBucket) {
					self.handleBucketChangeOnMouseup.bind(self)(currBucket);
				}
				mousedownBucketNumber = currBucket;
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

	handleBucketChangeOnMouseup (currBucketNumber) {
		if (this.props.onBucketChange) {
			this.props.onBucketChange(this.props.eventBuckets.buckets[currBucketNumber].bucketId);
		}
	}
}
TimeSlider.propTypes = {
	eventBuckets:   React.PropTypes.object.isRequired,
	onBucketChange: React.PropTypes.func
};