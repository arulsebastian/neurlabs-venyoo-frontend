import request from "request";
import ServerActionCreators from "../actions/ServerActionCreators";

const baseUrl = "http://private-23316-venyoo.apiary-mock.com";

class VenyooWebUtils {
	getFilters () {
		var self = this;

		ServerActionCreators.receiveFiltersSending();

		request({
			url: baseUrl + "/metadata",
			withCredentials: false
		}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				ServerActionCreators.receiveFiltersSucceeded(JSON.parse(body), response, body);
			} else {
				ServerActionCreators.receiveFiltersFailed(error, response, body);
			}
		});
	}

	getEventBucketsMetadata (eventId) {
		var self = this;

		ServerActionCreators.receiveEventBucketsMetadataSending();

		request({
			url: baseUrl + "/buckets/" + eventId,
			withCredentials: false
		}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				ServerActionCreators.receiveEventBucketsMetadataSucceeded(JSON.parse(body), response, body);
			} else {
				ServerActionCreators.receiveEventBucketsMetadataFailed(error, response, body);
			}
		});
	}

	getBucketData (bucketId) {
		var self = this;

		ServerActionCreators.receiveBucketDataSending();

		request({
			url: baseUrl + "/bucket/" + bucketId,
			withCredentials: false
		}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				ServerActionCreators.receiveBucketDataSucceeded(JSON.parse(body), response, body);
			} else {
				ServerActionCreators.receiveBucketDataFailed(error, response, body);
			}
		});
	}
}

export default new VenyooWebUtils();