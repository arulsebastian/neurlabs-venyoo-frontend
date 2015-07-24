import AppDispatcher from "../AppDispatcher";
import VenyooConstants from "../constants/VenyooConstants";
import events from "events";
import assign from "object-assign";

const CHANGE_EVENT = "change";

var ActionTypes = VenyooConstants.ActionTypes;

var _filters = {
	events: [],
	klout_scores: [],
	sentiments: [],
	socials: []
};
var _isLoading = false;

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

	getFilters: function () {
		return _filters;
	},
	getIsLoading: function () {
		return _isLoading;
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
			_filters = action.filters;
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

export default FiltersStore;