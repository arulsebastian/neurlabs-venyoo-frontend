/*
 * STORE DESCRIPTION:
 * Manages list of filters
 */

/* JS dependencies */
import events from "events";
import assign from "object-assign";
import _ from "lodash";
import AppDispatcher from "../AppDispatcher";
import VenyooConstants from "../constants/VenyooConstants";
import VenyooWebUtils from "../utils/VenyooWebUtils";

/* Constants */
const CHANGE_EVENT = "change";
const ActionTypes = VenyooConstants.ActionTypes;

/* Store State */
var _filters   = {};
var _selected  = {
	/* Default values */
	eventId:         1, 
	socialChannelId: 0,
	kloutScoreId:    2,
	sentimentId:     0
};
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
		state.selected = _selected;
		state.isLoading = _isLoading;
		return state;
	}

});

FiltersStore.dispatchToken = AppDispatcher.register(function (action) {
	switch (action.type) {
		/* UI events */
		case ActionTypes.CHANGE_FILTERS_SELECTION:
			_selected = action.selectedFilters;
			FiltersStore.emitChange();
			break;

		/* API events */
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

		case ActionTypes.

		default:
			// do nothing
	}
});

export default FiltersStore;