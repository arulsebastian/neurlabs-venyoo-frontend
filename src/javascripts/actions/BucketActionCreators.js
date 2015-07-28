import AppDispatcher from "../AppDispatcher";
import VenyooConstants from "../constants/VenyooConstants";
import VenyooWebUtils from "../utils/VenyooWebUtils";

export default {
	getBucket (bucketId) {
		AppDispatcher.dispatch({
			type: VenyooConstants.ActionTypes.GET_BUCKET_DATA
		});

		VenyooWebUtils.getBucketData(bucketId);
	}
}