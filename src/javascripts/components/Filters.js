/* JS dependencies */
import React from "react"

/* Stylesheet dependencies */

export default class Filters extends React.Component {
	render () {
		var options = [];
		this.props.filters.events.forEach(function (event, index) {
			options.push(
				<option value={event.id} key={index}>{event.team_home + " vs " + event.team_away}</option>
			);
		});

		return (
			<div>
				{/* Events block */}
				<div className="event_sec" id="container2">
					{/* Event Select */}
					<div className="event_select">
						<label>Select Event:</label>
						<div className="select-field">
							<select className="selectpicker">
								{options}
							</select>
						</div>
					</div>
				</div>
				<div className="filter_btn">
					<a href="#">Filter</a>
				</div>
			</div>
		);
	}
}