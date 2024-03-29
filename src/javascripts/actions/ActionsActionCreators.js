/*
 * The ambiguous filename means that ActionCreators are for Actions (like Reply, Favorite etc) in this file
 */

import AppDispatcher from "../AppDispatcher";
import VenyooConstants from "../constants/VenyooConstants";
import VenyooWebUtils from "../utils/VenyooWebUtils";

export default {
	sendTweet (screenNames, message) {
		AppDispatcher.dispatch({
			type: VenyooConstants.ActionTypes.SEND_TWEET
		});

		VenyooWebUtils.sendTweet(screenNames, message);
	},

	/* Direct message */
	sendReply (screenNames, message) {
		AppDispatcher.dispatch({
			type: VenyooConstants.ActionTypes.SEND_REPLY
		});

		VenyooWebUtils.sendReply(screenNames, message);
	},

	sendFavorite (tweetIds) {
		AppDispatcher.dispatch({
			type: VenyooConstants.ActionTypes.SEND_FAVORITE
		});

		VenyooWebUtils.sendFavorite(tweetIds);
	},

	sendRetweet (tweetIds) {
		AppDispatcher.dispatch({
			type: VenyooConstants.ActionTypes.SEND_RETWEET
		});

		VenyooWebUtils.sendRetweet(tweetIds);
	},

	sendFollow (screenNames) {
		AppDispatcher.dispatch({
			type: VenyooConstants.ActionTypes.SEND_FOLLOW
		});

		VenyooWebUtils.sendFollow(screenNames);
	},
}