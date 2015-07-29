import request from "request";
import ServerActionCreators from "../actions/ServerActionCreators";

const baseUrl = "http://private-23316-venyoo.apiary-mock.com";

class VenyooWebUtils {
	getFilters () {
		var self = this;

		var urlParams = {}

		ServerActionCreators.receiveFiltersSending(urlParams);

		request({
			url: baseUrl + "/metadata",
			// url: "http://52.24.255.84/metadata/"
			withCredentials: false
		}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				ServerActionCreators.receiveFiltersSucceeded(urlParams, JSON.parse(body), response, body);
			} else {
				ServerActionCreators.receiveFiltersFailed(urlParams, error, response, body);
			}
		});
	}

	getEventBucketsMetadata (eventId) {
		var self = this;

		var urlParams = {
			eventId: eventId
		};

		ServerActionCreators.receiveEventBucketsMetadataSending(urlParams);

		request({
			url: baseUrl + "/buckets/" + eventId,
			// url: "http://52.24.255.84/bucket/?event_id=" + eventId,
			withCredentials: false
		}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				ServerActionCreators.receiveEventBucketsMetadataSucceeded(urlParams, JSON.parse(body), response, body);
			} else {
				ServerActionCreators.receiveEventBucketsMetadataFailed(urlParams, error, response, body);
			}
		});
	}

	getBucketData (eventId, bucketId) {
		var self = this;

		var urlParams = {
			eventId:  eventId,
			bucketId: bucketId
		};

		ServerActionCreators.receiveBucketDataSending(urlParams);

		request({
			url: baseUrl + "/bucket/" + bucketId,
			// url: "http://52.24.255.84/filter/?bucket=" + bucketId + "&sentiment=0&klout_score=4&event_id=" + eventId + "&social_id=0"
			withCredentials: false
		}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				ServerActionCreators.receiveBucketDataSucceeded(urlParams, JSON.parse(body), response, body);
			} else {
				ServerActionCreators.receiveBucketDataFailed(urlParams, error, response, body);
			}
		});
	}
}

export default new VenyooWebUtils();