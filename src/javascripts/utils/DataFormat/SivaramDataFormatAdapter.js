/*
 * Adapter to convert Sivaram's data format to app's interval one
 */

import PassThroughDataFormatAdapter from "./PassThroughDataFormatAdapter";

export default class SivaramDataFormatAdapter extends PassThroughDataFormatAdapter {

	adjustFilters (originalFilters) {
		return {
			events:         originalFilters.events,
			socialChannels: originalFilters.social,
			kloutScores:    originalFilters.klout_scores,
			sentiments:     originalFilters.sentiments
		};
	}

	adjustEventBuckets (originalEventBuckets) {
		var result = [];
		originalEventBuckets.bucket.forEach(function (bucket) {
			result.push({
				bucketId:     bucket.id,
				bucketTime:   bucket.start_time,
				tweetsNumber: bucket.number_of_tweets
			});
		});
		return result;
	}

	adjustBucket (originalBucket) {

	}

}