import AppDispatcher from "../AppDispatcher";
import VenyooConstants from "../constants/VenyooConstants";
import EventBucketsActionCreators from "./EventBucketsActionCreators";
import BucketActionCreators from "./BucketActionCreators";

var ActionTypes = VenyooConstants.ActionTypes;

export default {
	
	/* GET FILTERS */

	receiveFiltersSending: function () {
		AppDispatcher.dispatch({
			type: ActionTypes.RECEIVE_FILTERS_SENDING
		});
	},

	receiveFiltersSucceeded: function (filters, response, body) {
		AppDispatcher.dispatch({
			type:    ActionTypes.RECEIVE_FILTERS_SUCCEEDED,
			filters: filters
		});

		EventBucketsActionCreators.getEventBuckets(filters.events[0].id);
	},

	receiveFiltersFailed: function (error, response, body) {
		AppDispatcher.dispatch({
			type:     ActionTypes.RECEIVE_FILTERS_FAILED,
			error:    error,
			response: response
		});
	},

	/* GET EVENT BUCKETS METADATA */

	receiveEventBucketsMetadataSending: function () {
		AppDispatcher.dispatch({
			type: ActionTypes.RECEIVE_EVENTBUCKETS_SENDING
		});
	},

	receiveEventBucketsMetadataSucceeded: function (eventBuckets, response, body) {
		AppDispatcher.dispatch({
			type:         ActionTypes.RECEIVE_EVENTBUCKETS_SUCCEEDED,
			eventBuckets: eventBuckets
		});

		BucketActionCreators.getBucket(eventBuckets.buckets[0].bucket_id);
	},

	receiveEventBucketsMetadataFailed: function (error, response, body) {
		AppDispatcher.dispatch({
			type:     ActionTypes.RECEIVE_EVENTBUCKETS_FAILED,
			error:    error,
			response: response
		});
	},

	/* GET BUCKET DATA */

	receiveBucketDataSending: function () {
		AppDispatcher.dispatch({
			type: ActionTypes.RECEIVE_BUCKET_SENDING
		});
	},

	receiveBucketDataSucceeded: function (bucket, response, body) {
		AppDispatcher.dispatch({
			type:   ActionTypes.RECEIVE_BUCKET_SUCCEEDED,
			bucket: bucket
		});
	},

	receiveBucketDataFailed: function (error, response, body) {
		AppDispatcher.dispatch({
			type:     ActionTypes.RECEIVE_BUCKET_FAILED,
			error:    error,
			response: response
		});
	}
}