/*
 * STORE DESCRIPTION:
 * Business logic for managing buckets data for a specific event
 */

/* JS dependencies */
import events from "events";
import assign from "object-assign";
import _ from "lodash";
import AppDispatcher from "../AppDispatcher";
import VenyooConstants from "../constants/VenyooConstants";
import VenyooWebUtils from "../utils/VenyooWebUtils";
import DataFormatAdapter from "../utils/DataFormat/DataFormatAdapter";

/* Static dependencies */

/* Constants */
const CHANGE_EVENT = "change";
const ActionTypes  = VenyooConstants.ActionTypes;

/* Store State */
var _selectedBucketId = 0;
var _eventBuckets     = {};
var _isLoading        = true;

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
			buckets:          _.cloneDeep(_eventBuckets.buckets),
			selectedBucketId: _selectedBucketId,
			isLoading:        _isLoading
		};
		return state;
	}

});

EventBucketsStore.dispatchToken = AppDispatcher.register(function (action) {
	switch (action.type) {
		/* UI events */
		case ActionTypes.CHANGE_BUCKET_SELECTION:
			_selectedBucketId = action.selectedBucketId;
			EventBucketsStore.emitChange();
			break;

		/* API events */
		case ActionTypes.RECEIVE_EVENTBUCKETS_SENDING:
			_isLoading = true;
			EventBucketsStore.emitChange();
			break;

		case ActionTypes.RECEIVE_EVENTBUCKETS_SUCCEEDED:
			_isLoading = false;
			_eventBuckets.buckets = action.eventBuckets.buckets;
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