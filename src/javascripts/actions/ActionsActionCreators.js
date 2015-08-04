/*
 * The ambiguous filename means that ActionCreators are for Actions (like Reply, Favorite etc) in this file
 */

import AppDispatcher from "../AppDispatcher";
import VenyooConstants from "../constants/VenyooConstants";
import VenyooWebUtils from "../utils/VenyooWebUtils";

export default {
	sendTweet (screenName, message) {
		AppDispatcher.dispatch({
			type: VenyooConstants.ActionTypes.SEND_TWEET
		});

		VenyooWebUtils.sendTweet(screenName, message);
	},

	/* Direct message */
	sendReply (username, message) {
		AppDispatcher.dispatch({
			type: VenyooConstants.ActionTypes.SEND_REPLY
		});

		VenyooWebUtils.sendReply(username, message);
	},

	sendFavorite (tweetId) {
		AppDispatcher.dispatch({
			type: VenyooConstants.ActionTypes.SEND_FAVORITE
		});

		VenyooWebUtils.sendFavorite(tweetId);
	},

	sendRetweet (tweetId) {
		AppDispatcher.dispatch({
			type: VenyooConstants.ActionTypes.SEND_RETWEET
		});

		VenyooWebUtils.sendRetweet(tweetId);
	},

	sendFollow (tweetId) {
		AppDispatcher.dispatch({
			type: VenyooConstants.ActionTypes.SEND_FOLLOW
		});

		VenyooWebUtils.sendFollow(tweetId);
	},
}