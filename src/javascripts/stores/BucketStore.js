/*
 * STORE DESCRIPTION:
 * Business logic for managing messages data for a specific bucket
 */

import events from "events";
import assign from "object-assign";
import _ from "lodash";
import AppDispatcher from "../AppDispatcher";
import VenyooConstants from "../constants/VenyooConstants";
import VenyooWebUtils from "../utils/VenyooWebUtils";

const CHANGE_EVENT = "change";

var ActionTypes = VenyooConstants.ActionTypes;

// var _tweets = [
// 	{
// 		"lat": 50.7306,
// 		"lng": -53.9866,
// 		"email":         "hello@email.com",
// 		"message":       "Full read by eBay",
// 		"username":      "Fiuxdo Duisca",
// 		"socialHandle":  "@Fiuxdo__Duisca",
// 		"picUrl":        "http://www.unlulerkervani.com/data/media/1021/Sendhil-Ramamurthy_4.jpg",
// 		"mediaLink":     "Image",
// 		"sentiment":     "14",
// 		"follower":      "N",
// 		"following":     "N",

// 		"completed": 1,
// 		"distance": 0.0000,
// 		"klout_bucket_id": 0,
// 		"klout_score": 47.7406,
// 		"label": "neg",
// 		"neg_prob": 0.531439,
// 		"neu_prob": 0.370371,
// 		"pos_prob": 0.468561,
// 		"time_stamp": "Thu, 01 Oct 2009 12:23:43 GMT",
// 		"tweet_id": "608834370997252096",
// 		"type_of_tweet": 1,
// 		"user_description": "Nothing",
// 		"user_followers_count": 56,
// 		"user_following": 49,
// 		"user_id": "3279810099",
// 		"user_location": "New York",
// 		"user_number_of_tweets": 44264
// 	},
// ];
var _tweets = [];
var _isLoading = true;

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
			tweets: _.cloneDeep(_tweets)
		};
		state.isLoading = _isLoading;
		return state;
	}

});

BucketStore.dispatchToken = AppDispatcher.register(function (action) {
	switch (action.type) {
		case ActionTypes.RECEIVE_BUCKET_SENDING:
			_isLoading = true;
			BucketStore.emitChange();
			break;

		case ActionTypes.RECEIVE_BUCKET_SUCCEEDED:
		 	_isLoading = false;
		 	_tweets = action.bucket.tweets;
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