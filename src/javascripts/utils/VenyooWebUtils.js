import request from "request";
import ServerActionCreators from "../actions/ServerActionCreators";
import DataFormatAdapter from "./DataFormat/DataFormatAdapter";

const baseUrl = "http://private-23316-venyoo.apiary-mock.com";

class VenyooWebUtils {

	/* Getting data */

	getFilters () {
		var self = this;

		var urlParams = {}

		ServerActionCreators.receiveFiltersSending(urlParams);

		request({
			// url: baseUrl + "/metadata",
			url: "http://52.24.255.84/metadata/",
			withCredentials: false
		}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				ServerActionCreators.receiveFiltersSucceeded(
					urlParams, 
					DataFormatAdapter.adjustFilters(JSON.parse(body)), 
					response, 
					body);
			} else {
				ServerActionCreators.receiveFiltersFailed(urlParams, error, response, body);
			}
		});
	}

	getEventBucketsMetadata (eventId, 
							 socialChannelId = 0,
							 kloutScoreId    = 2,
							 sentimentId     = 0,
							 bucketId        = 0) {
		var self = this;

		var urlParams = {
			eventId:         eventId,
			socialChannelId: socialChannelId,
			kloutScoreId:    kloutScoreId,
			sentimentId:     sentimentId,
			bucketId:        bucketId
		};

		ServerActionCreators.receiveEventBucketsMetadataSending(urlParams);

		request({
			// url: baseUrl + "/buckets/" + eventId,
			url: "http://52.24.255.84/bucket/?event_id=" + eventId,
			withCredentials: false
		}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				ServerActionCreators.receiveEventBucketsMetadataSucceeded(
					urlParams, 
					DataFormatAdapter.adjustEventBuckets(JSON.parse(body)), 
					response, 
					body);
			} else {
				ServerActionCreators.receiveEventBucketsMetadataFailed(urlParams, error, response, body);
			}
		});
	}

	getBucketData (eventId, 
				   bucketId, 
				   socialChannelId, 
				   kloutScoreId, 
				   sentimentId) {
		var self = this;

		var urlParams = {
			eventId:         eventId,
			socialChannelId: socialChannelId,
			kloutScoreId:    kloutScoreId,
			sentimentId:     sentimentId,
			bucketId:        bucketId
		};

		ServerActionCreators.receiveBucketDataSending(urlParams);

		request({
			// url: baseUrl + "/bucket/" + bucketId,
			url: "http://52.24.255.84/filter/?bucket=" + bucketId + "&sentiment=" + sentimentId + "&klout_score=" + kloutScoreId + "&event_id=" + eventId + "&social_id=" + socialChannelId,
			withCredentials: false
		}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				ServerActionCreators.receiveBucketDataSucceeded(
					urlParams, 
					DataFormatAdapter.adjustBucket(JSON.parse(body)), 
					response, 
					body);
			} else {
				ServerActionCreators.receiveBucketDataFailed(urlParams, error, response, body);
			}
		});
	}

	/* Performing actions */

	sendTweet (screenName, message) {
		var self = this;

		var urlParams = {
			screenName: screenName,
			message:    message
		};

		ServerActionCreators.sendTweetSending(urlParams);

		request({
			url: "http://52.24.255.84/tweet/?screenname=" + encodeURIComponent(screenName) + "&message=" + encodeURIComponent(message),
			withCredentials: false
		}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				ServerActionCreators.sendTweetSucceeded(
					urlParams,
					response,
					body);
			} else {
				ServerActionCreators.sendTweetFailed(urlParams, error, response, body);
			}
		});
	}

	sendReply (username, message) {
		var self = this;

		var urlParams = {
			username: username,
			message:  message
		};

		ServerActionCreators.sendReplySending(urlParams);

		request({
			url: "http://52.24.255.84/send/?username=" + encodeURIComponent(username) + "&message=" + encodeURIComponent(message),
			withCredentials: false
		}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				ServerActionCreators.sendReplySucceeded(
					urlParams,
					response,
					body);
			} else {
				ServerActionCreators.sendReplyFailed(urlParams, error, response, body);
			}
		});
	}

	sendFavorite (tweetId) {
		var self = this;

		var urlParams = {
			tweetId: tweetId
		};

		ServerActionCreators.sendFavoriteSending(urlParams);

		request({
			url: "http://52.24.255.84/favorite/?tweet_id=" + tweetId,
			withCredentials: false
		}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				ServerActionCreators.sendFavoriteSucceeded(
					urlParams,
					response,
					body);
			} else {
				ServerActionCreators.sendFavoriteFailed(urlParams, error, response, body);
			}
		});
	}

	sendRetweet (tweetId) {
		var self = this;

		var urlParams = {
			tweetId: tweetId
		};

		ServerActionCreators.sendRetweetSending(urlParams);

		request({
			url: "http://52.24.255.84/retweet/?tweet_id=" + tweetId,
			withCredentials: false
		}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				ServerActionCreators.sendRetweetSucceeded(
					urlParams,
					response,
					body);
			} else {
				ServerActionCreators.sendRetweetFailed(urlParams, error, response, body);
			}
		});
	}

	sendFollow (screenName) {
		var self = this;

		var urlParams = {
			screenName: screenName
		};

		ServerActionCreators.sendFollowSending(urlParams);

		request({
			url: "http://52.24.255.84/follow/?screenname=" + screenName,
			withCredentials: false
		}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				ServerActionCreators.sendFollowSucceeded(
					urlParams,
					response,
					body);
			} else {
				ServerActionCreators.sendFollowFailed(urlParams, error, response, body);
			}
		});
	}
}

export default new VenyooWebUtils();