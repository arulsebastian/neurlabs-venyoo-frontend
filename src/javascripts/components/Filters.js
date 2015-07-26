/* JS dependencies */
import React from "react"

/* Stylesheet dependencies */

export default class Filters extends React.Component {
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

			var events = [];
			if (this.props.filters.events) {
				this.props.filters.events.forEach(function (event, index) {
					events.push(
						<option value={event.id} key={index}>{event.team_home + " vs " + event.team_away}</option>
					);
				});
			}

			var socialChannels = [];
			if (this.props.filters.socialChannels) {
				this.props.filters.socialChannels.forEach(function (socialChannel, index) {
					socialChannels.push(
						<label id={socialChannel.id} key={index}>
							<input type="checkbox" name="man" value="man" />
							<span className="lbl">{socialChannel.caption}</span>
						</label>
					);
				});
			}

			var kloutScores = [];
			if (this.props.filters.kloutScores) {
				this.props.filters.kloutScores.forEach(function (kloutScore, index) {
					kloutScores.push(
						<label id={kloutScore.id} key={index}>
							<input type="checkbox" name="man" value="man" />
							<span className="lbl">{kloutScore.caption}</span>
						</label>
					);
				});
			}

			var sentiments = [];
			if (this.props.filters.sentiments) {
				this.props.filters.sentiments.forEach(function (sentiment, index) {
					sentiments.push(
						<label id={sentiment.id} key={index}>
							<input type="checkbox" name="man" value="man" />
							<span className="lbl">{sentiment.caption}</span>
						</label>
					);
				});
			}

			// 

			return (
				<div>
					{/* Event Sec */}
					<div className="event_sec" id="container2">
						{/* Event Select */}
						<div className="event_select">
							<label>Select Event:</label>
							<div className="select-field">
								{/* React approach to change state on onChange event is not applicable cause onChange does not work here */}
								<select className="selectpicker" ref="eventSelector">
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
											<h4 className="panel-title"> <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne"> Social Channel <span>(Twitter)</span> </a> </h4>
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
											<h4 className="panel-title"> <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"> Klout Score <span>(31-40)</span> </a> </h4>
										</div>
										<div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
											<div className="panel-body">
												<div className="check_detail">
													{kloutScores}
												</div>
											</div>
										</div>
									</div>
									{/*
									<div className="panel panel-default">
										<div className="panel-heading" role="tab" id="headingThree">
											<h4 className="panel-title"> <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree"> Social Relationship <span>(All)</span> </a> </h4>
										</div>
										<div id="collapseThree" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
											<div className="panel-body">
												<div className="check_detail">
													<label id="a">
													<input type="checkbox" name="man" value="man" />
													<span className="lbl">Twitter</span> </label>
													<label id="b">
													<input type="checkbox" name="man" value="man" />
													<span className="lbl">Instagram</span> </label>
													<label id="c">
													<input type="checkbox" name="man" value="man" />
													<span className="lbl">Facebook</span> </label>
												</div>
											</div>
										</div>
									</div>
									*/}
									<div className="panel panel-default">
										<div className="panel-heading" role="tab" id="headingfour">
											<h4 className="panel-title"> <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapsefour" aria-expanded="false" aria-controls="collapsefour"> Sentiment <span>(All)</span> </a> </h4>
										</div>
										<div id="collapsefour" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingfour">
											<div className="panel-body">
												<div className="check_detail">
													{sentiments}
												</div>
											</div>
										</div>
									</div>
									{/*
									<div className="panel panel-default">
										<div className="panel-heading" role="tab" id="headingfive">
											<h4 className="panel-title"> <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapsefive" aria-expanded="false" aria-controls="collapsefive"> Keywords <span>(All)</span> </a> </h4>
										</div>
										<div id="collapsefive" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingfive">
											<div className="panel-body">
												<div className="check_detail">
													<label id="a">
													<input type="checkbox" name="man" value="man" />
													<span className="lbl">Twitter</span> </label>
													<label id="b">
													<input type="checkbox" name="man" value="man" />
													<span className="lbl">Instagram</span> </label>
													<label id="c">
													<input type="checkbox" name="man" value="man" />
													<span className="lbl">Facebook</span> </label>
												</div>
											</div>
										</div>
									</div>
									*/}
								</div>
							</div>
						</div>
					</div>
					<div className="filter_btn">
						<a href="#" onClick={this.handleFilterClick.bind(this)}>Filter</a>
					</div>
				</div>
			);
		}
	}

	handleFilterClick () {
		if (this.props.onFilterClick) {
			this.props.onFilterClick({
				eventId: React.findDOMNode(this.refs.eventSelector).value
			});
		}
	}
}
Filters.propTypes = {
	filters:       React.PropTypes.object.isRequired,
	onFilterClick: React.PropTypes.func
};