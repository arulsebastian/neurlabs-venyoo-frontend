/*
 * STORE DESCRIPTION:
 * Business logic for event buckets metadata
 */

import events from "events";
import assign from "object-assign";
import _ from "lodash";
import AppDispatcher from "../AppDispatcher";
import VenyooConstants from "../constants/VenyooConstants";
import VenyooWebUtils from "../utils/VenyooWebUtils";

const CHANGE_EVENT = "change";

var ActionTypes = VenyooConstants.ActionTypes;

var _eventBuckets = [
	{
		"bucketId": 0,
		"bucketTime": "1pm",
		"tweetsNumber": 10
	},
	{
		"bucketId": 1,
		"bucketTime": "2pm",
		"tweetsNumber": 40
	},
	{
		"bucketId": 2,
		"bucketTime": "3pm",
		"tweetsNumber": 30
	},
	{
		"bucketId": 3,
		"bucketTime": "4pm",
		"tweetsNumber": 60
	},
	{
		"bucketId": 4,
		"bucketTime": "5pm",
		"tweetsNumber": 80
	},
	{
		"bucketId": 5,
		"bucketTime": "6pm",
		"tweetsNumber": 50
	},
	{
		"bucketId": 6,
		"bucketTime": "7pm",
		"tweetsNumber": 60
	},
	{
		"bucketId": 7,
		"bucketTime": "8pm",
		"tweetsNumber": 30
	},
	{
		"bucketId": 8,
		"bucketTime": "9pm",
		"tweetsNumber": 80
	},
	{
		"bucketId": 9,
		"bucketTime": "10pm",
		"tweetsNumber": 10
	}
];
var _isLoading = false;

var EventBucketsStore = assign({}, events.EventEmitter.prototype, {

	emitChange: function () {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function (callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function (callback) {
		this.removeListener(callback);
	},

	getState: function () {
		var state = _.cloneDeep(_eventBuckets);
		state.isLoading = _isLoading;
		return state;
	}

});

EventBucketsStore.dispatchToken = AppDispatcher.register(function (action) {
	switch (action.type) {
		case ActionTypes.RECEIVE_EVENTBUCKETS_SENDING:
			_isLoading = true;
			EventBucketsStore.emitChange();
			break;

		case ActionTypes.RECEIVE_EVENTBUCKETS_SUCCEEDED:
			_isLoading = false;
			_eventBuckets = action.eventBuckets;
			EventBucketsStore.emitChange();
			break;

		case ActionTypes.RECEIVE_EVENTBUCKETS_FAILED:
			_isLoading = false;
			EventBucketsStore.emitChange();
			break;

		default:
			// do nothing

	}
});

export default EventBucketsStore;