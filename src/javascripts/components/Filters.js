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

		// OLD IMPLEMENTATION
		// {/* Events block */}
		// <div className="event_sec" id="container2">
		// 	{/* Event Select */}
		// 	<div className="event_select">
		// 		<label>Select Event:</label>
		// 		<div className="select-field">
		// 			<select className="selectpicker">
		// 				{options}
		// 			</select>
		// 		</div>
		// 	</div>
		// </div>
		// <div className="filter_btn">
		// 	<a href="#">Filter</a>
		// </div>

		return (
			<div>
				{/* Event Sec */}
				<div className="event_sec" id="divexample2">
					{/* Event Select */}
					<div className="event_select">
						<label>Select Event:</label>
						<div className="select-field">
							<select className="selectpicker">
								<option value="">9.10 vs. Pittsburgh</option>
								<option>9.10 vs. Pittsburgh</option>
								<option>9.10 vs. Pittsburgh</option>
								<option>9.10 vs. Pittsburgh</option>
								<option>9.10 vs. Pittsburgh</option>
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
										<h4 className="panel-title"> <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne"> Social Channel <span>(Instagram)</span> </a> </h4>
									</div>
									<div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
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
								<div className="panel panel-default">
									<div className="panel-heading" role="tab" id="headingTwo">
										<h4 className="panel-title"> <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"> Klout Score <span>(31-40)</span> </a> </h4>
									</div>
									<div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
										<div className="panel-body">
											<div className="check_detail">
												<label id="d">
												<input type="checkbox" name="man" value="man" />
												<span className="lbl">0-30</span> </label>
												<label id="e">
												<input type="checkbox" name="man" value="man" />
												<span className="lbl">31-40</span> </label>
												<label id="f">
												<input type="checkbox" name="man" value="man" />
												<span className="lbl">41-50</span> </label>
												<label id="g">
												<input type="checkbox" name="man" value="man" />
												<span className="lbl">50 +</span> </label>
											</div>
										</div>
									</div>
								</div>
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
								<div className="panel panel-default">
									<div className="panel-heading" role="tab" id="headingfour">
										<h4 className="panel-title"> <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapsefour" aria-expanded="false" aria-controls="collapsefour"> Sentiment <span>(All)</span> </a> </h4>
									</div>
									<div id="collapsefour" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingfour">
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
							</div>
						</div>
					</div>
				</div>
				<div className="filter_btn"><a href="#">Filter</a></div>
			</div>
		);
	}
}