/* JS dependencies */
import React from "react";
import _ from "lodash";
import FiltersActionCreators from "../actions/FiltersActionCreators";

/* Stylesheet dependencies */

export default class Filters extends React.Component {

	constructor (...args) {
		super(...args);

		this.state = {
			currEventNumber:         null, // is not used
			currSocialChannelNumber: null,
			currKloutScoreNumber:    null,
			currSentimentNumber:     null
		}
	}

	render () {
		if (this.props.filters.isLoading) {

			return (
				<div>
					{/* Loading bar */}
					<div className="event_sec" id="container2">
						<img src="http://sierrafire.cr.usgs.gov/images/loading.gif" />
					</div>
				</div>
			);

		} else {

			var self = this;

			var events         = assembleEventOptions();
			var socialChannels = assembleSocialChannelRadios();
			var kloutScores    = assembleKloutScoreRadios();
			var sentiments     = assembleSentimentRadios();

			return (
				<div>
					{/* Event Sec */}
					<div className="event_sec" id="container2">
						{/* Event Select */}
						<div className="event_select">
							<label>Select Event:</label>
							<div className="select-field">
								{/* React approach to change state on onChange event is not applicable cause onChange does not work here */}
								<select className="selectpicker" ref="eventSelector" onChange={ this.handleEventChange }>
									{events}
								</select>
							</div>
						</div>
						{/* Filter */}
						<div className="filter">
							<h3>Filters:</h3>
							{/* Collapse */}
							<div className="collapse_sec">
								<div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
									<div className="panel panel-default">
										<div className="panel-heading" role="tab" id="headingOne">
											<h4 className="panel-title"> <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne"> Social Channel {/*<span>(Twitter)</span>*/} </a> </h4>
										</div>
										<div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
											<div className="panel-body">
												<div className="check_detail">
													{socialChannels}
												</div>
											</div>
										</div>
									</div>
									<div className="panel panel-default">
										<div className="panel-heading" role="tab" id="headingTwo">
											<h4 className="panel-title"> <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"> Klout Score {/*<span>(31-40)</span>*/} </a> </h4>
										</div>
										<div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
											<div className="panel-body">
												<div className="check_detail">
													{ kloutScores }
												</div>
											</div>
										</div>
									</div>
									<div className="panel panel-default">
										<div className="panel-heading" role="tab" id="headingfour">
											<h4 className="panel-title"> <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapsefour" aria-expanded="false" aria-controls="collapsefour"> Sentiment {/*<span>(All)</span>*/} </a> </h4>
										</div>
										<div id="collapsefour" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingfour">
											<div className="panel-body">
												<div className="check_detail">
													{ sentiments }
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="filter_btn">
						<a href="#" onClick={ this.handleFilterClick.bind(this) }>Filter</a>
					</div>
				</div>
			);

			function assembleEventOptions () {
				var events = [];
				if (self.props.filters.events) {
					self.props.filters.events.forEach(function (event, index) {
						events.push(
							<option value={index} key={index}>{event.team_home + " vs " + event.team_away}</option>
						);
					});
				}
				return events;
			}

			function assembleSocialChannelRadios () {
				var socialChannels = [];
				if (self.props.filters.socialChannels) {
					self.props.filters.socialChannels.forEach(function (socialChannel, index) {
						var checked = false;
						if (index === self.state.currSocialChannelNumber) {
							checked = true;
						}
						socialChannels.push(
							<label key={index}>
								<input type="radio" checked={ checked } name="socialChannel" data-id={index} onClick={self.handleFilterChange.bind(self)} />
								<span className="lbl">{socialChannel.caption}</span>
							</label>
						);
					});
				}
				return socialChannels;
			}

			function assembleKloutScoreRadios () {
				var kloutScores = [];
				if (self.props.filters.kloutScores) {
					self.props.filters.kloutScores.forEach(function (kloutScore, index) {
						var checked = false;
						if (index === self.state.currKloutScoreNumber) {
							checked = true;
						}
						kloutScores.push(
							<label key={index}>
								<input type="radio" checked={ checked } name="kloutScore" data-id={index} onClick={self.handleFilterChange.bind(self)} />
								<span className="lbl">{kloutScore.caption}</span>
							</label>
						);
					});
				}
				return kloutScores;
			}

			function assembleSentimentRadios () {
				var sentiments = [];
				if (self.props.filters.sentiments) {
					self.props.filters.sentiments.forEach(function (sentiment, index) {
						var checked = false;
						if (index === self.state.currSentimentNumber) {
							checked = true;
						}
						sentiments.push(
							<label key={index}>
								<input type="radio" checked={ checked } name="sentiment" data-id={index} onClick={self.handleFilterChange.bind(self)} />
								<span className="lbl">{sentiment.caption}</span>
							</label>
						);
					});
				}
				return sentiments;
			}
		}
	}

	componentDidMount () {
		FiltersActionCreators.getFilters();
	}

	componentWillReceiveProps (nextProps) {
		console.log("Filters.componentWillReceiveProps nextProps = ", nextProps);

		if (!_.isEqual(nextProps.filters, this.props.filters)) {
			var currEventNumber         = null; // is not used
			var currSocialChannelNumber = null;
			var currKloutScoreNumber    = null;
			var currSentimentNumber     = null;

			// FIXME: state.currEventNumber is not used
			// if (nextProps.filters.events.length > 0) {
			// 	currEventNumber = 0;
			// }
			if (nextProps.filters.socialChannels.length > 0) {
				currSocialChannelNumber = 0;
			}
			if (nextProps.filters.kloutScores.length > 0) {
				currKloutScoreNumber = 0;
			}
			if (nextProps.filters.sentiments.length > 0) {
				currSentimentNumber = 0;
			}

			this.setState({
				currEventNumber:         currEventNumber, // is not used
				currSocialChannelNumber: currSocialChannelNumber,
				currKloutScoreNumber:    currKloutScoreNumber,
				currSentimentNumber:     currSentimentNumber
			});
		}
	}

	/* Event Handlers */

	handleEventChange () {
		console.log("Filters.handleEventChange");
	}

	handleFilterChange () {
		var socialChannels = document.getElementsByName("socialChannel");
		var kloutScores    = document.getElementsByName("kloutScore");
		var sentiments     = document.getElementsByName("sentiment");

		/* Get selected filters ids */
		var currSocialChannelNumber = parseInt(FindSelectedRadioElement(socialChannels).dataset.id);
		var currKloutScoreNumber    = parseInt(FindSelectedRadioElement(kloutScores).dataset.id);
		var currSentimentNumber     = parseInt(FindSelectedRadioElement(sentiments).dataset.id);

		console.log("Filters.handleFilterChange currSocialChannelNumber=", currSocialChannelNumber,
					", currKloutScoreNumber=", currKloutScoreNumber,
					", currSentimentNumber=", currSentimentNumber);

		this.setState({
			currSocialChannelNumber: currSocialChannelNumber,
			currKloutScoreNumber:    currKloutScoreNumber,
			currSentimentNumber:     currSentimentNumber
		});

		function FindSelectedRadioElement (radioGroupNodeList) {
			for (var i = 0; i < radioGroupNodeList.length; i++) {
				if (radioGroupNodeList[i].checked) {
					return radioGroupNodeList[i];
				}
			}
			return null;
		}
	}

	handleFilterClick () {
		if (this.props.onFilterClick) {
			this.props.onFilterClick({
				event:         this.props.filters.events[React.findDOMNode(this.refs.eventSelector).value],
				socialChannel: this.props.filters.socialChannels[this.state.currSocialChannelNumber],
				kloutScore:    this.props.filters.kloutScores   [this.state.currKloutScoreNumber],
				sentiment:     this.props.filters.sentiments    [this.state.currSentimentNumber]
			});
		}
	}
}

Filters.propTypes = {
	filters:       React.PropTypes.object.isRequired,
	onFilterClick: React.PropTypes.func
};