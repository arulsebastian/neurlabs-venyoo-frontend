import request from "request";

const baseUrl = "http://private-23316-venyoo.apiary-mock.com";

export default class VenyooWebUtils {
	getAppMetadata (cb) {
		request({
			url: baseUrl + "/appmetadata",
			withCredentials: false
		}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				cb(JSON.parse(body));
			}
		});
	}
}