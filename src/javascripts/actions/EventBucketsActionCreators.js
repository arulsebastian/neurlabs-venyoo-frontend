import AppDispatcher from "../AppDispatcher";
import VenyooConstants from "../constants/VenyooConstants";
import VenyooWebUtils from "../utils/VenyooWebUtils";

export default {
	getEventBuckets (eventId, 
					 socialChannelId = 0,
					 kloutScoreId    = 4,
					 sentimentId     = 0,
					 bucketId        = 0) {
		AppDispatcher.dispatch({
			type: VenyooConstants.ActionTypes.GET_EVENTBUCKETS_METADATA
		});

		VenyooWebUtils.getEventBucketsMetadata(eventId, 
											   socialChannelId, 
											   kloutScoreId, 
											   sentimentId,
											   bucketId);
	}
}