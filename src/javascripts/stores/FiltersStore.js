import AppDispatcher from "../AppDispatcher";
import VenyooConstants from "../constants/VenyooConstants";
import events from "events";

const CHANGE_EVENT = "change";

var ActionTypes = VenyooConstants.ActionTypes;

var _filters = {
	events: [],
	klout_scores: [],
	sentiments: [],
	socials: []
};
var _isLoading = false;

var FiltersStore = Object.assign({}, events.EventEmitter.prototype, {

	emitChange () {
		this.emit(CHANGE_EVENT);
	}

	addChangeListener (callback) {
		this.on(CHANGE_EVENT, callback);
	}

	removeChangeListener (callback) {
		this.removeListener(callback);
	}

	getFilters () {
		return _filters;
	}
	getIsLoading () {
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