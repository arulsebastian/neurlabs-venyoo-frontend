import AppDispatcher from "../AppDispatcher";
import VenyooConstants from "../constants/VenyooConstants";
import VenyooWebUtils from "../utils/VenyooWebUtils";

export default {
	getFilters () {
		AppDispatcher.dispatch({
			type: VenyooConstants.ActionTypes.GET_FILTERS
		});

		// use VenyooWebUtils.getFilters() instead
		
	}
};