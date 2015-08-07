/* JS dependencies */
/** React Components **/
import React from "react";
import Map from "./Map";
import TimeSlider from "./TimeSlider";
import DataTable from "./DataTable";
import Filters from "./Filters";
import Actions from "./Actions";
/** Stores **/
import FiltersStore      from "../stores/FiltersStore";
import EventBucketsStore from "../stores/EventBucketsStore";
import BucketStore       from "../stores/BucketStore";
/** Action creators **/
import FiltersActionCreators      from "../actions/FiltersActionCreators";
import EventBucketsActionCreators from "../actions/EventBucketsActionCreators";
import BucketActionCreators       from "../actions/BucketActionCreators";

/* Static dependencies */
// import "stylesheets/modules/container";

function getStoresState (VenyooAppObj) {
	return {
		filters:      FiltersStore.getState(),
		eventBuckets: EventBucketsStore.getState(),
		bucketData:   BucketStore.getState()
	};
}

export default class VenyooApp extends React.Component {
	constructor (...args) {
		super(...args);

		this.state = getStoresState(this);
	}

	render () {
		return (
			<div className="wrapper">
				{/* Map block */}
				<div className="map_block">
					{/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6874863.052680733!2d-117.16151799999996!3d32.71616899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d954a7de4514ad%3A0xc23d2f349e970aed!2sTHE+US+GRANT%2C+a+Luxury+Collection+Hotel%2C+San+Diego!5e0!3m2!1sen!2sin!4v1435239649995" width="100%" height="718" frameborder="0" style={{ border : 0 }} allowfullscreen></iframe> */}
					<Map bucketData={this.state.bucketData} />
					{/* Right block */}
					<div className="map_right">
						
						<div className="inner_block">
							<div className="right_link">
								<ul>
									<li><a href="#" className="select">MAP</a></li>
									<li><a href="#">STADUIM</a></li>
									<li><a href="#">LOGOUT</a></li>
								</ul>
							</div>
							
							<Filters filters={this.state.filters} onFilterClick={this.handleFilterClicked.bind(this)} />
						</div>
						<a href="#" className="map_toggle"><i className="fa fa-bars"></i></a>
					</div>
				</div>
				<div className="detail_main">
					{/* Left block */}
					<div className="left_sec">
						<div className="start_detail">
							<TimeSlider eventBuckets={this.state.eventBuckets} onBucketChange={this.handleBucketChanged.bind(this)} />
						</div>
						<div className="home_detail">
							<DataTable bucketData={this.state.bucketData} onSelectionChange={ this.handleDataTableSelectionChanged.bind(this) } />
						</div>
					</div>
					{/* Right block */}
					<div className="right_sec">
						<div className="duration_sec">
							<div className="title">
								<h3><i className="fa fa-bars"></i>{/**} Event Duration <span>12 hours / 10 min intervals</span>{**/}</h3>
							</div>
							<Actions bucketData={this.state.bucketData} />
							<hr />
							<Actions bucketData={this.state.bucketData} />
						</div>
					</div>
				</div>
			</div>
		);
	}

	componentDidMount () {
		FiltersStore     .addChangeListener(this._onChange.bind(this));
		EventBucketsStore.addChangeListener(this._onChange.bind(this));
		BucketStore      .addChangeListener(this._onChange.bind(this));

		/* Get filters to fill the system with data */
		FiltersActionCreators.getFilters();
	}

	componentWillUnmount () {
		FiltersStore     .removeChangeListener(this._onChange.bind(this));
		EventBucketsStore.removeChangeListener(this._onChange.bind(this));
		BucketStore      .removeChangeListener(this._onChange.bind(this));
	}

	/* Event handlers */

	handleFilterClicked (selectedFilters) {
		console.log("VenyooApp.handleFilterClicked selectedFilters=", selectedFilters);
		FiltersActionCreators.changeFiltersSelection(selectedFilters.eventId,
													 selectedFilters.socialChannelId,
													 selectedFilters.kloutScoreId,
													 selectedFilters.sentimentId,
													 this.state.eventBuckets.selectedBucketId);
	}
	handleBucketChanged (bucketId) {
		console.log("VenyooApp.handleBucketChanged bucketId=", bucketId, ", state.filters.selected=", this.state.filters.selected);
		EventBucketsActionCreators.changeBucketSelection(bucketId,
														 this.state.filters.selected.eventId,
														 this.state.filters.selected.socialChannelId,
														 this.state.filters.selected.kloutScoreId,
														 this.state.filters.selected.sentimentId);
	}
	handleDataTableSelectionChanged (checkedTweets) {
		console.log("VenyooApp.handleDataTableSelectionChanged checkedTweets=", checkedTweets);
		BucketActionCreators.changeTweetsSelection(checkedTweets);
	}

	_onChange () {
		var newState = getStoresState(this);
		this.setState(newState);
	}
};
