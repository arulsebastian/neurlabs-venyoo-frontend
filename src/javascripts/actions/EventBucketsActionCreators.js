import AppDispatcher from "../AppDispatcher";
import VenyooConstants from "../constants/VenyooConstants";
import VenyooWebUtils from "../utils/VenyooWebUtils";

export default {
	getEventBuckets (eventId) {
		AppDispatcher.dispatch({
			type: VenyooConstants.ActionTypes.GET_EVENTBUCKETS_METADATA
		});

		VenyooWebUtils.getEventBucketsMetadata(eventId);
	}
}