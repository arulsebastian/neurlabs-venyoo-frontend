import events from "events";
import assign from "object-assign";
import _ from "lodash";
import AppDispatcher from "../AppDispatcher";
import VenyooConstants from "../constants/VenyooConstants";
import VenyooWebUtils from "../utils/VenyooWebUtils";

const CHANGE_EVENT = "change";

var ActionTypes = VenyooConstants.ActionTypes;

// var _filters = {
// 	"events": [
// 		{
// 			"id": 0,
// 			"team_home": "Rose Bowl",
// 			"team_away": "Pittsburgh",
// 			"location": "Pittsburgh, CA",
// 			"lng": 20,
// 			"lat": 14,
// 			"start_time": 1437528693,
// 			"end_time": 1437558693
// 		},
// 		{
// 			"id": 1,
// 			"team_home": "Coliseum",
// 			"team_away": "San Jose",
// 			"location": "San Jose, CA",
// 			"lng": 20,
// 			"lat": 14,
// 			"start_time": 1437548693,
// 			"end_time": 1437588693
// 		},
// 		{
// 			"id": 2,
// 			"team_home": "Mountain View Shakers",
// 			"team_away": "San Diego Chargers",
// 			"location": "Mountain View, CA",
// 			"lng": 20,
// 			"lat": 14,
// 			"start_time": 1437529693,
// 			"end_time": 1437538693
// 		}
// 	],
// 	"klout_scores": [
// 		{
// 			"id": 0,
// 			"caption": "10-20"
// 		},
// 		{
// 			"id": 1,
// 			"caption": "21-30"
// 		},
// 		{
// 			"id": 2,
// 			"caption": "31-40"
// 		},
// 		{
// 			"id": 3,
// 			"caption": "41-50+"
// 		}
// 	],
// 	"sentiments": [
// 		{
// 			"id": 0,
// 			"caption": "positive"
// 		},
// 		{
// 			"id": 1,
// 			"caption": "neutral"
// 		},
// 		{
// 			"id": 2,
// 			"caption": "negative"
// 		}
// 	],
// 	"socials": [
// 		{
// 			"id": 0,
// 			"caption": "twitter"
// 		},
// 		{
// 			"id": 1,
// 			"caption": "instagram"
// 		}
// 	]
// };
var _filters = {};
var _isLoading = true;

var FiltersStore = assign({}, events.EventEmitter.prototype, {

	emitChange: function () {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function (callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function (callback) {
		this.removeListener(callback);
	},

	getState: function () {
		var state = _.cloneDeep(_filters);
		state.isLoading = _isLoading;
		return state;
	}

});

FiltersStore.dispatchToken = AppDispatcher.register(function (action) {
	switch (action.type) {
		case ActionTypes.RECEIVE_FILTERS_SENDING:
			_isLoading = true;
			FiltersStore.emitChange();
			break;

		case ActionTypes.RECEIVE_FILTERS_SUCCEEDED:
			_isLoading = false;
			_filters = {
				events:         action.filters.events,
				socialChannels: action.filters.socials,
				kloutScores:    action.filters.klout_scores,
				sentiments:     action.filters.sentiments
			}
			FiltersStore.emitChange();
			break;

		case ActionTypes.RECEIVE_FILTERS_FAILED:
			_isLoading = false;
			FiltersStore.emitChange();
			break;

		default:
			// do nothing
	}
});

// Get Data
VenyooWebUtils.getFilters();

export default FiltersStore;