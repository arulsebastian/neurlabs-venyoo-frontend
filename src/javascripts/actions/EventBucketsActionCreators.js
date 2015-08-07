import AppDispatcher from "../AppDispatcher";
import VenyooConstants from "../constants/VenyooConstants";
import VenyooWebUtils from "../utils/VenyooWebUtils";
import BucketActionCreators from "../actions/BucketActionCreators";

export default {
	getEventBuckets (eventId         = 1, 
					 socialChannelId = 0,
					 kloutScoreId    = 2,
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
	},

	changeBucketSelection (nextBucketId        = 0,
						   nextEventId         = 1,
						   nextSocialChannelId = 0,
						   nextKloutScoreId    = 0,
						   nextSentimentId     = 0) {
		AppDispatcher.dispatch({
			type:             VenyooConstants.ActionTypes.CHANGE_BUCKET_SELECTION,
			selectedBucketId: nextBucketId
		});

		BucketActionCreators.getBucket(nextEventId,
									   nextBucketId,
									   nextSocialChannelId,
									   nextKloutScoreId,
									   nextSentimentId);
	}
}