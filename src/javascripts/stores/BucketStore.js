/*
 * STORE DESCRIPTION:
 * Business logic for managing messages data for a specific bucket
 */

/* JS dependencies */
import events from "events";
import assign from "object-assign";
import _ from "lodash";
import AppDispatcher from "../AppDispatcher";
import VenyooConstants from "../constants/VenyooConstants";
import VenyooWebUtils from "../utils/VenyooWebUtils";
import DataFormatAdapter from "../utils/DataFormat/DataFormatAdapter";
import Routines from "../utils/Routines";

/* Static dependencies */

/* Constants */
const CHANGE_EVENT = "change";
const ActionTypes  = VenyooConstants.ActionTypes;

/* Store State */
var _tweets         = [];
var _checkedTweets = [];
var _isLoading      = true;

var BucketStore = assign({}, events.EventEmitter.prototype, {

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
			tweets:        _.cloneDeep(_tweets),
			checkedTweets: _checkedTweets,
			isLoading:     _isLoading
		};
		return state;
	}

});

BucketStore.dispatchToken = AppDispatcher.register(function (action) {
	switch (action.type) {
		/* UI events */
		case ActionTypes.CHANGE_TWEETS_SELECTION:
			_checkedTweets = action.checkedTweets;
			BucketStore.emitChange();
			break;

		/* API events */
		case ActionTypes.RECEIVE_BUCKET_SENDING:
			_isLoading = true;
			BucketStore.emitChange();
			break;

		case ActionTypes.RECEIVE_BUCKET_SUCCEEDED:
		 	_isLoading = false;
		 	_tweets        = action.bucket.tweets;
		 	_checkedTweets = Routines.fill(_tweets.length, false);
		 	BucketStore.emitChange();
		 	break;

		case ActionTypes.RECEIVE_BUCKET_FAILED:
			_isLoading = false;
			BucketStore.emitChange();
			break;

		default:
			// do nothing

	}
});

export default BucketStore;