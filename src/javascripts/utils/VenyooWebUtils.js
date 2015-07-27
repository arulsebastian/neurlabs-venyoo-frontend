import request from "request";
import ServerActionCreators from "../actions/ServerActionCreators";

const baseUrl = "http://private-23316-venyoo.apiary-mock.com";

class VenyooWebUtils {
	getFilters () {
		var self = this;

		ServerActionCreators.receiveFiltersSending();

		request({
			url: baseUrl + "/appmetadata", // Should be changed to /filters
			withCredentials: false
		}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				ServerActionCreators.receiveFiltersSucceeded(JSON.parse(body), response, body);
			} else {
				ServerActionCreators.receiveFiltersFailed(error, response, body);
			}
		});
	}

	getEventBucketsMetadata (eventId) {
		ServerActionCreators.receiveEventBucketsMetadataSending();

		request({
			url: baseUrl + "/bucketsmetadata", // Should be changed to /buckets
			withCredentials: false
		}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				ServerActionCreators.receiveEventBucketsMetadataSucceeded(JSON.parse(body), response, body);
			} else {
				ServerActionCreators.receiveEventBucketsMetadataFailed(error, response, body);
			}
		});
	}
}

export default new VenyooWebUtils();