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
		"bucketId": 10,
		"bucketTime": "1pm",
		"tweetsNumber": 10
	},
	{
		"bucketId": 11,
		"bucketTime": "2pm",
		"tweetsNumber": 40
	},
	{
		"bucketId": 12,
		"bucketTime": "3pm",
		"tweetsNumber": 30
	},
	{
		"bucketId": 13,
		"bucketTime": "4pm",
		"tweetsNumber": 60
	},
	{
		"bucketId": 14,
		"bucketTime": "5pm",
		"tweetsNumber": 80
	},
	{
		"bucketId": 15,
		"bucketTime": "6pm",
		"tweetsNumber": 50
	},
	{
		"bucketId": 16,
		"bucketTime": "7pm",
		"tweetsNumber": 60
	},
	{
		"bucketId": 17,
		"bucketTime": "8pm",
		"tweetsNumber": 30
	},
	{
		"bucketId": 18,
		"bucketTime": "9pm",
		"tweetsNumber": 80
	},
	{
		"bucketId": 19,
		"bucketTime": "10pm",
		"tweetsNumber": 10
	},
	{
		"bucketId": 20,
		"bucketTime": "11pm",
		"tweetsNumber": 5
	}
];
var _isLoading = true;

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
		var state = {
			buckets: _.cloneDeep(_eventBuckets)
		};
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