/*
 * The ambiguous filename means that ActionCreators are for Actions (like Reply, Favorite etc) in this file
 */

import AppDispatcher from "../AppDispatcher";
import VenyooConstants from "../constants/VenyooConstants";
import VenyooWebUtils from "../utils/VenyooWebUtils";

export default {
	sendReply (username, message) {
		AppDispatcher.dispatch({
			type: VenyooConstants.ActionTypes.SEND_REPLY
		});

		VenyooWebUtils.sendReply(username, message);
	}
}