/* JS dependencies */
import React from "react";

/* Stylesheet dependencies */

export default class DataTable extends React.Component {
	constructor (...args) {
		super(...args);

		this.state = {
			tweets:        [],
			tweetsTotal:   0,
			tweetsPerPage: 20,
			pagesCount:    1,
			pageNumber:    0    // starts from 0
		};

	}

	render () {
		var self = this;

		console.log("DataTable.render props = ", this.props, ", state = ", this.state);

		this.calcPagesCount.bind(this)();

		if (this.props.bucketData.isLoading) {

			return (
				<div>
					{/* Loading bar */}
					<div className="container">
						<img src="http://sierrafire.cr.usgs.gov/images/loading.gif" style={{ width: "100px", height: "100px", position: "relative", left: "50%", top: "200px" }}/>
					</div>
				</div>
			);

		} else {

			var tweetsRows = [];
			var tweetEndNumber = ((this.state.tweetsPerPage * (this.state.pageNumber + 1)) > this.state.tweetsTotal)
								 ? this.state.tweetsTotal
								 : (this.state.tweetsPerPage * (this.state.pageNumber + 1));
			for (var i = (this.state.tweetsPerPage * this.state.pageNumber); i < tweetEndNumber; i++) {
				var tweetData = this.props.bucketData.tweets[i];
				
				tweetsRows.push(
					<tr key={ i }>
						<td><a href="#" className="reply_btn"><i className="fa fa-long-arrow-left"></i> Reply</a></td>
						<td>{ tweetData.message }</td>
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
									<select value={this.state.tweetsPerPage} onChange={this.handleTweetsPerPageChange.bind(this)}>
										<option value="20">20 per page</option>
										<option value="50">50 per page</option>
										<option value="150">150 per page</option>
										<option value="500">500 per page</option>
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
	}

	componentWillReceiveProps (nextProps) {
		console.log("DataTable.componentWillReceiveProps nextProps = ", nextProps);

		this.state.tweetsTotal = nextProps.bucketData.tweets.length;
		this.state.pageNumber  = 0;
	}

	/* Events Handlers */

	handlePageChange (e) {
		this.setState({
			pageNumber : parseInt(e.target.dataset.page)
		});
	}

	handleTweetsPerPageChange (e) {
		this.setState({
			tweetsPerPage: e.target.value
		});
	}

	/* Helper routines */

	calcPagesCount () {
		this.state.pagesCount = Math.ceil(this.state.tweetsTotal / this.state.tweetsPerPage);
		if (this.state.tweetsTotal > 0) {
			if (this.state.pageNumber >= this.state.pagesCount) {
				this.state.pageNumber = this.state.pagesCount - 1;
			}
		} else {
			this.state.pageNumber = 0;
		}
	}
};
