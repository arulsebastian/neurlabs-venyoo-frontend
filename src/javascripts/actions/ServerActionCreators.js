import AppDispatcher from "../AppDispatcher";
import VenyooConstants from "../constants/VenyooConstants";
import EventBucketsActionCreators from "./EventBucketsActionCreators";
import BucketActionCreators from "./BucketActionCreators";

var ActionTypes = VenyooConstants.ActionTypes;

export default {
	
	/* GET FILTERS */

	receiveFiltersSending: function (urlParams) {
		AppDispatcher.dispatch({
			type: ActionTypes.RECEIVE_FILTERS_SENDING
		});
	},

	receiveFiltersSucceeded: function (urlParams, filters, response, body) {
		AppDispatcher.dispatch({
			type:    ActionTypes.RECEIVE_FILTERS_SUCCEEDED,
			filters: filters
		});

		EventBucketsActionCreators.getEventBuckets(filters.events[0].id);
	},

	receiveFiltersFailed: function (urlParams, error, response, body) {
		AppDispatcher.dispatch({
			type:     ActionTypes.RECEIVE_FILTERS_FAILED,
			error:    error,
			response: response
		});
	},

	/* GET EVENT BUCKETS METADATA */

	receiveEventBucketsMetadataSending: function (urlParams) {
		AppDispatcher.dispatch({
			type: ActionTypes.RECEIVE_EVENTBUCKETS_SENDING
		});
	},

	receiveEventBucketsMetadataSucceeded: function (urlParams, eventBuckets, response, body) {
		AppDispatcher.dispatch({
			type:         ActionTypes.RECEIVE_EVENTBUCKETS_SUCCEEDED,
			eventBuckets: eventBuckets
		});

		BucketActionCreators.getBucket(urlParams.eventId, eventBuckets.buckets[0].bucketId);
	},

	receiveEventBucketsMetadataFailed: function (urlParams, error, response, body) {
		AppDispatcher.dispatch({
			type:     ActionTypes.RECEIVE_EVENTBUCKETS_FAILED,
			error:    error,
			response: response
		});
	},

	/* GET BUCKET DATA */

	receiveBucketDataSending: function (urlParams) {
		AppDispatcher.dispatch({
			type: ActionTypes.RECEIVE_BUCKET_SENDING
		});
	},

	receiveBucketDataSucceeded: function (urlParams, bucket, response, body) {
		AppDispatcher.dispatch({
			type:   ActionTypes.RECEIVE_BUCKET_SUCCEEDED,
			bucket: bucket
		});
	},

	receiveBucketDataFailed: function (urlParams, error, response, body) {
		AppDispatcher.dispatch({
			type:     ActionTypes.RECEIVE_BUCKET_FAILED,
			error:    error,
			response: response
		});
	}
}