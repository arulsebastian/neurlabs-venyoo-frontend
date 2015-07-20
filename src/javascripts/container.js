/* JS dependencies */
import React from "react";
import Map from "./map";
import TimeSlider from "./timeslider";
import DataTable from "./datatable";
import Filters from "./filters";
import Actions from "./actions";

/* Static dependencies */
// import "stylesheets/modules/container";
import sliderImg from '../images/start_image.jpg';
import socialImg from '../images/social_1.png';

// My old implementation (replaced by Polina's raw design)
// <div className="wrapper">
//  <Map />
//  <div className="map_right">
			
//    <Filters />
//  </div>
//  <div className="left_sec">
//    <TimeSlider />
//    <DataTable />
//    <Actions />
//  </div>
// </div>

export default React.createClass({
	render () {
		return (
			<div className="wrapper">
				{/* Map block */}
				<div className="map_block">
					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6874863.052680733!2d-117.16151799999996!3d32.71616899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d954a7de4514ad%3A0xc23d2f349e970aed!2sTHE+US+GRANT%2C+a+Luxury+Collection+Hotel%2C+San+Diego!5e0!3m2!1sen!2sin!4v1435239649995" width="100%" height="718" frameborder="0" style={{ border : 0 }} allowfullscreen></iframe>
					{/* Right block */}
					<div className="map_right">
						<a href="#" className="map_toggle"><i className="fa fa-bars"></i></a>
						<div className="inner_block">
							<div className="right_link">
								<ul>
									<li><a href="#" className="select">MAP</a></li>
									<li><a href="#">STADUIM</a></li>
									<li><a href="#">LOGOUT</a></li>
								</ul>
							</div>
							{/* Events block */}
							<div className="event_sec" id="container2">
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
							</div>
							<div className="filter_btn">
								<a href="#">Filter</a>
							</div>
						</div>
					</div>
				</div>
				<div className="detail_main">
					{/* Left block */}
					<div className="left_sec">
						<div className="start_detail"><img src={sliderImg} alt="" /></div>
						<div className="home_detail">
							<div className="container">
								<div id="container">
									<h3 className="grey-color">1,000 entries <a className="btn btn-sm grey_bg">12:45pm - 1:00pm </a> <a href="#" className="full_screen"><i className="fa fa-arrows-alt"></i> Full Screen</a> </h3>
									<table className="table table-hover table-striped">
										<tr>
											<th>Reply</th>
											<th>Tweet</th>
											<th>Media Link</th>
											<th>Email</th>
											<th>Social Handle</th>
											<th>Sentiment</th>
											<th>Follower</th>
											<th>Following</th>
											<th> <label id="a">
												<input type="checkbox" name="man" value="man" />
												<span className="lbl"></span> </label>
											</th>
										</tr>
										<tr>
											<td><a href="#" className="reply_btn"><i className="fa fa-long-arrow-left"></i> Reply</a></td>
											<td>Go Partiots! #Ptriots #Boston</td>
											<td>Video</td>
											<td>hello@email.com</td>
											<td>@hello_partiots</td>
											<td>positive</td>
											<td>N</td>
											<td>N</td>
											<td><label id="a">
												<input type="checkbox" name="man" value="man" />
												<span className="lbl"></span> </label>
											</td>
										</tr>
										<tr>
											<td><a href="#" className="reply_btn"><i className="fa fa-long-arrow-left"></i> Reply</a></td>
											<td>Just an example tweet</td>
											<td>Image</td>
											<td>test@e.com</td>
											<td>@testing</td>
											<td>50</td>
											<td>Y</td>
											<td>Y</td>
											<td><label id="a">
												<input type="checkbox" name="man" value="man" />
												<span className="lbl"></span> </label>
											</td>
										</tr>
										<tr>
											<td><a href="#" className="reply_btn"><i className="fa fa-long-arrow-left"></i> Reply</a></td>
											<td>Another example of a longer teet message</td>
											<td>&nbsp;</td>
											<td>mylongemail@testing.com</td>
											<td>@mylongnamehandle</td>
											<td>14</td>
											<td>N</td>
											<td>N</td>
											<td><label id="a">
												<input type="checkbox" name="man" value="man" />
												<span className="lbl"></span> </label>
											</td>
										</tr>
									</table>
								</div>
								<div className="clearfix">&nbsp;</div>
								<div className="row">
									<div className="col-md-2">
										<div className="select_detail">
											<div className="select-field">
												<select className="selectpicker">
													<option value="">20 per page</option>
													<option value="">50 per page</option>
													<option value="">150 per page</option>
													<option value="">500 per page</option>
												</select>
											</div>
										</div>
									</div>
									<div className="col-md-8 paging">
										<ul className="pagination">
											<li className="page"><a href="">Page</a></li>
											<li className="active"><a href="#">1</a></li>
											<li><a href="#">2</a></li>
										</ul>
									</div>
									<div className="col-md-2">
										<button className="btn btn-default pull-right export_btn">Export Selected</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* Right block */}
					<div className="right_sec">
						<div className="duration_sec">
							<div className="title">
								<h3><i className="fa fa-bars"></i> Event Duration <span>12 hours / 10 min intervals</span></h3>
							</div>
							<div className="duration_inner">
								<h2>Actions:</h2>
								<ul className="action_list">
									<li> <a href="#"> <i className="social_icon"><img src={socialImg} alt="" /></i>
									<p>Follow</p>
									<span className="people">100 people</span> </a> </li>
									<li> <a href="#"> <i className="social_icon"><img src={socialImg} alt="" /></i>
									<p>Tweet to</p>
									<span className="people">100 people</span> </a> </li>
									<li> <a href="#"> <i className="social_icon"><img src={socialImg} alt="" /></i>
									<p>Favorite</p>
									<span className="people">100 people</span> </a> </li>
									<li> <a href="#"> <i className="social_icon"><img src={socialImg} alt="" /></i>
									<p>Direct Message</p>
									<span className="people">10 people</span> </a> </li>
									<li> <a href="#"> <i className="social_icon"><img src={socialImg} alt="" /></i>
									<p>Retweet</p>
									<span className="people">10 people</span> </a> </li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
