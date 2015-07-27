import AppDispatcher from "../AppDispatcher";
import VenyooConstants from "../constants/VenyooConstants";
import EventBucketsActionCreators from "./EventBucketsActionCreators";

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
	},

	receiveEventBucketsMetadataFailed: function (error, response, body) {
		AppDispatcher.dispatch({
			type:     ActionTypes.RECEIVE_EVENTBUCKETS_FAILED,
			error:    error,
			response: response
		});
	}
}