/* JS dependencies */
import React from "react";

/* Stylesheet dependencies */

export default class DataTable extends React.Component {
	constructor (...args) {
		super(...args);

		this.state = {
			tweets:        generateTweets(35),
			tweetsTotal:   35,
			tweetsPerPage: 20,
			pagesCount:    2,
			pageNumber:    1
		};

		function generateTweets (tweetsNumber) {
			var exampleTweets = [
				{
					tweet:        "Go Partiots! #Ptriots #Boston",
					mediaLink:    "Video",
					email:        "hello@email.com",
					socialHandle: "@hello_partiots",
					sentiment:    "positive",
					follower:     "N",
					following:    "N"
				},
				{
					tweet:        "Just an example tweet",
					mediaLink:    "Image",
					email:        "test@e.com",
					socialHandle: "@testing",
					sentiment:    "50",
					follower:     "Y",
					following:    "Y"
				},
				{
					tweet:        "Another example of a longer teet message",
					mediaLink:    "",
					email:        "mylongemail@testing.com",
					socialHandle: "@mylongnamehandle",
					sentiment:    "14",
					follower:     "N",
					following:    "N"
				}
			];

			var tweets = [];
			
			for (var i = 0; i < tweetsNumber; i++) {
				tweets.push(exampleTweets[Math.floor(Math.random() * exampleTweets.length)]);
			}

			return tweets;
		}
	}

	render () {
		var self = this;

		var tweetsRows = [];
		var tweetEndNumber = ((this.state.tweetsPerPage * (this.state.pageNumber + 1)) > this.state.tweetsTotal)
							 ? this.state.tweetsTotal
							 : (this.state.tweetsPerPage * (this.state.pageNumber + 1));
		for (var i = (this.state.tweetsPerPage * this.state.pageNumber); i < tweetEndNumber; i++) {
			var tweetData = this.state.tweets[i];
			
			tweetsRows.push(
				<tr key={ i }>
					<td><a href="#" className="reply_btn"><i className="fa fa-long-arrow-left"></i> Reply</a></td>
					<td>{ tweetData.tweet + " " + this.state.pageNumber }</td>
					<td>{ tweetData.mediaLink }</td>
					<td>{ tweetData.email }</td>
					<td>{ tweetData.socialHandle }</td>
					<td>{ tweetData.sentiment }</td>
					<td>{ tweetData.follower }</td>
					<td>{ tweetData.following }</td>
					<td><label id="a">
						<input type="checkbox" name="man" value="man" />
						<span className="lbl"></span> </label>
					</td>
				</tr>
			);
		}

		var pagesLabels = [];
		for (var currPage = 0; currPage < this.state.pagesCount; currPage++) {
			if (currPage === this.state.pageNumber) {
				pagesLabels.push(<li className="active" key={ currPage }><a data-page={ currPage } onClick={ this.handlePageChange.bind(self) }>{ currPage + 1 }</a></li>);
			} else {
				pagesLabels.push(<li key={ currPage }><a data-page={ currPage } onClick={ this.handlePageChange.bind(self) }>{ currPage + 1 }</a></li>);
			}
		}

		return (
			<div className="container">
				<div id="container">
					<h3 className="grey-color">{ this.state.tweetsTotal } entries <a className="btn btn-sm grey_bg">12:45pm - 1:00pm </a> <a href="#" className="full_screen"><i className="fa fa-arrows-alt"></i> Full Screen</a> </h3>
					<table className="table table-hover table-striped">
						<tbody>
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
							{ tweetsRows }
						</tbody>
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
							{ pagesLabels }
						</ul>
					</div>
					<div className="col-md-2">
						<button className="btn btn-default pull-right export_btn">Export Selected</button>
					</div>
				</div>
			</div>
		);
	}

	handlePageChange (e) {
		this.setState({ pageNumber : parseInt(e.target.dataset.page) });
	}

	handleTweetsPerPageChange () {

	}
};
