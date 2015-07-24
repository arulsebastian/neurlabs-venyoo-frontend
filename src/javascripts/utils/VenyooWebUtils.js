import request from "request";
import ServerActionCreators from "../actions/ServerActionCreators";

const baseUrl = "http://private-23316-venyoo.apiary-mock.com";

export default {
	getFilters: function () {
		ServerActionCreators.receiveFiltersSending();

		request({
			url: baseUrl + "/appmetadata",
			withCredentials: false
		}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				ServerActionCreators.receiveFiltersSucceeded(JSON.parse(body), response, body);
			} else {
				ServerActionCreators.receiveFiltersFailed(error, response, body);
			}
		});
	}
}