/* Static dependencies */
import '../../stylesheets/components/timeslider.scss';

/* JS dependencies */
import React from 'react';
import _ from "lodash";

/* Constants */
const pointerColor  = '#2E7FB1';
const sliderHeight  = 60;
const barHeight     = sliderHeight * 2/3;
const pointerHeight = sliderHeight - barHeight;
const pointerLength = pointerHeight / 0.866; // 0.866 is sin(pi/3)

// USE THE FUNCTION

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

export default class TimeSlider extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			ctx: null,        // canvas context for 2D drawing
			canvasDim: {      // position and size of the canvas
				x : 0,
				y : 0,
				width  : 0,
				height : 0
			},
			pointerPos: null, // current position of time pointer in pixels
			currBucket: 0     // current bucket number 
		};
	}

	render () {
		console.log("TimeSlider.render props=", this.props, ", state=", this.state);

		var sliderVisibility = (!this.props.eventBuckets.isLoading) ? "visible" : "hidden";
		var loadingDisplay   = (this.props.eventBuckets.isLoading)  ? "block"   : "none";
		var startTime        = null;
		var finishTime       = null;

		if (this.props.eventBuckets.buckets && this.props.eventBuckets.buckets.length > 0) {
			var startTime  = this.props.eventBuckets.buckets[0].bucketTime;
			var finishTime = this.props.eventBuckets.buckets[this.props.eventBuckets.buckets.length - 1].bucketTime;
		}

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

	/*
	 * When component has been mounted
	 * Resizes canvas to fill the whole place
	 * and assigns event handlers
	 */
	componentDidMount () {
		/* Initialization */
		var self = this;
		var timeScale    = React.findDOMNode(self.refs.sliderTimescale);
		var sliderCanvas = React.findDOMNode(self.refs.sliderCanvas);
		self.state.ctx   = sliderCanvas.getContext('2d');

		/* Event handlers */
		attachMouseHandler();
		attachResizeHandler();

		function attachMouseHandler () {
			var isMouseDown = false;
			var mousedownBucketNumber = self.state.currBucket; // value of currBucket when user clicked mouse down

			timeScale.addEventListener('mousedown', function () {
				isMouseDown = true;
				mousedownBucketNumber = self.state.currBucket;
				self.fillCanvas.bind(self)();
			});
			// use window to allow mouse to go out of the element's boundaries
			window.addEventListener('mouseup', function () {
				// Fire event only if position of pointer changed after the previous mouse down
				if (isMouseDown && mousedownBucketNumber !== self.state.currBucket) {
					isMouseDown = false;
					mousedownBucketNumber = self.state.currBucket;

					self.handleBucketChangeOnMouseup.bind(self)(self.state.currBucket);
				}
			});
			window.addEventListener('mousemove', function (event) {
				self.state.pointerPos = event.pageX - self.state.canvasDim.x;

				if (isMouseDown) {
					self.fillCanvas.bind(self)();
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
			self.state.canvasDim.width  = sliderCanvas.width  = timeScaleRect.width;
			self.state.canvasDim.height = sliderCanvas.height = timeScaleRect.height;

			/* Save canvas position in some time to let it be refreshed */
			setTimeout(function () {
				var canvasRect = sliderCanvas.getBoundingClientRect();
				self.state.canvasDim.x = canvasRect.left;
				self.state.canvasDim.y = canvasRect.top;
			}, 100);

			self.state.pointerPos = null;  // To prevent pointer move due to scale change
			self.fillCanvas.bind(self)();
		};
	}

	/*
	 * When new properties come
	 * Resets pointer to the middle and refreshes the canvas
	 */
	componentWillReceiveProps (nextProps) {

		// Reset pointer only if we've got buckets and those buckets are different from what we have already
		if (nextProps.eventBuckets.buckets && nextProps.eventBuckets.buckets.length > 0
			&& !_.isEqual(nextProps.eventBuckets.buckets, this.props.eventBuckets.buckets)) {
			this.state.pointerPos = null;
			this.state.currBucket = 0;

			this.fillCanvas.bind(this)(nextProps);
		}
	}

	/*
	 * Refreshes the full canvas with the latest data from newProps argument or from React this.props
	 */
	fillCanvas (newProps) {
		var self  = this;
		var props = newProps || self.props; // Use new properties if they are provided or fall back to current ones

		if (props.eventBuckets.buckets && props.eventBuckets.buckets.length > 0) {

			var ctx        = self.state.ctx;
			var leftSpace  = 0; // px
			var rightSpace = 0; // px
			var bucketsNumber = props.eventBuckets.buckets.length;
			var bucketWidth   = (self.state.canvasDim.width - (leftSpace + rightSpace)) / bucketsNumber;

			if (normalizePointerPosAndCheckUpdates()) {

				// Clear the canvas
				ctx.clearRect(0, 0, self.state.canvasDim.width, self.state.canvasDim.height);
				
				/* Find max number of tweets for normalization */
				var maxTweetsNumber = props.eventBuckets.buckets.reduce(function (prevValue, currValue, index, array) {
					return Math.max(prevValue, currValue.tweetsNumber);
				}, props.eventBuckets.buckets[0].tweetsNumber);

				drawPlot();
				drawPointer();

			}
			
			function normalizePointerPosAndCheckUpdates () {
				var isUpdated = false;     // Has bucket number been changed due to mouse move
				var newBucket = undefined; // New bucket number

				/* Properties are brand new, use default position */
				if (self.state.pointerPos === null) {
					isUpdated = true;
					self.state.pointerPos = bucketNumberToPos(self.state.currBucket);
				}
				/* Make pointer movement stepwise (by converting mouse pos to bucket number and then back) and check boundaries */
				newBucket = posToBucketNumber(self.state.pointerPos);
				if (newBucket < 0)
					newBucket = 0;
				if (newBucket >= bucketsNumber)
					newBucket =  bucketsNumber - 1;
				self.state.pointerPos = bucketNumberToPos(newBucket);

				isUpdated = (isUpdated || newBucket !== self.state.currBucket);
				self.state.currBucket = newBucket;

				return isUpdated;
			}

			function drawPlot () {
				var plotPath = new Path2D();

				props.eventBuckets.buckets.forEach(function (bucket, index) {
					plotPath.moveTo(bucketNumberToPos(index), barHeight);
					plotPath.lineTo(bucketNumberToPos(index), (barHeight - 1) - bucket.tweetsNumber / maxTweetsNumber * (barHeight * 0.90)); // 90% of the bar height
				});
				ctx.strokeStyle = '#000000';
				ctx.stroke(plotPath);
			}

			function drawPointer () {
				ctx.fillStyle = 'red';
				var pointerPath = new Path2D();
				pointerPath.moveTo(self.state.pointerPos,                     barHeight);
				pointerPath.lineTo(self.state.pointerPos + pointerLength / 2, sliderHeight);
				pointerPath.lineTo(self.state.pointerPos - pointerLength / 2, sliderHeight);
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