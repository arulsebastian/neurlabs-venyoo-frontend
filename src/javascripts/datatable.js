/* JS dependencies */
import React from "react";

/* Stylesheet dependencies */

export default React.createClass({
	render () {
		return (
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
		);
	}
});
