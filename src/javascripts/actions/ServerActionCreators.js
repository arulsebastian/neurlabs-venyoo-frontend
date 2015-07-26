import AppDispatcher from "../AppDispatcher";
import VenyooConstants from "../constants/VenyooConstants";

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
	},

	receiveEventBucketsMetadataFailed: function (error, response, body) {
		AppDispatcher.dispatch({
			type:     ActionTypes.RECEIVE_EVENTBUCKETS_FAILED,
			error:    error,
			response: response
		});
	}
}