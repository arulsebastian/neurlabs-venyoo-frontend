import AppDispatcher from "../AppDispatcher";
import VenyooConstants from "../constants/VenyooConstants";
import VenyooWebUtils from "../utils/VenyooWebUtils";

export default {
	getBucket (eventId, bucketId, socialChannelId = 0, kloutScoreId = 4, sentimentId = 0) {
		AppDispatcher.dispatch({
			type: VenyooConstants.ActionTypes.GET_BUCKET_DATA
		});

		VenyooWebUtils.getBucketData(eventId, bucketId, socialChannelId, kloutScoreId, sentimentId);
	}
}