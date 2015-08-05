/* JS dependencies */
import React from "react";
import DialogBox from "./DialogBox";
import ActionsActionCreators from "../actions/ActionsActionCreators";
import _ from "lodash";

/* Stylesheet dependencies */

export default class DataTable extends React.Component {
	constructor (...args) {
		super(...args);

		this.state = {
			selectedTweets: [],   // All the checkboxes across all the pages
			tweetsTotal:    0,
			tweetsPerPage:  5,
			pagesCount:     1,
			pageNumber:     0,    // starts from 0
			tweetsOnPage:   0
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

			var tweetsRows  = [];
			var replyPopups = [];
			for (var i = this.state.startTweetNumber; i < this.state.endTweetNumber; i++) {
				var tweetData = this.props.bucketData.tweets[i];
				
				tweetsRows.push(
					<tr key={ i }>
						<td><label id="a">
							<input type="checkbox" checked={ this.state.selectedTweets[i] } data-tweet-number={ i } onChange={ this.handleCheckBoxClick.bind(this) } />
							<span className="lbl"></span> </label>
						</td>
						<td><a href="#" className="reply_btn" data-toggle="modal" data-target={ "#Reply" + i } data-tweet-number={ i }><i className="fa fa-long-arrow-left"></i> Reply</a></td>
						<td>{ tweetData.message }</td>
						<td>{ tweetData.mediaLink }</td>
						<td>{ tweetData.email }</td>
						<td>{ tweetData.socialHandle }</td>
						<td>{ tweetData.sentiment }</td>
						<td>{ tweetData.follower }</td>
						<td>{ tweetData.following }</td>
					</tr>
				);

				replyPopups.push(
					<DialogBox key={ i }
							   id={ "Reply" + i }
							   isInput={ true }
							   actionName="Reply"
							   onAction={ this.factoryHandleReply(tweetData.socialHandle).bind(this) }>
						<h3>Reply to: <span>{ tweetData.socialHandle }</span><br />{ tweetData.message }</h3>
					</DialogBox>
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

			var timeLabel = null;
			if (this.props.bucketData.tweets.length !== 0)
				timeLabel = <a className="btn btn-sm grey_bg">{ this.props.bucketData.tweets[0].timeStamp }</a>

			return (
				<div className="container">
					<div id="container">
						<h3 className="grey-color">{ this.state.tweetsTotal } entries {timeLabel} <a href="#" className="full_screen"><i className="fa fa-arrows-alt"></i> Full Screen</a> </h3>
						<table className="table table-hover table-striped">
							<tbody>
								<tr>
									<th> <label id="a">
										<input type="checkbox" onChange={ this.handleCheckAllClick.bind(this) } />
										<span className="lbl"></span> </label>
									</th>
									<th>Reply</th>
									<th>Tweet</th>
									<th>Media Link</th>
									<th>Email</th>
									<th>Social Handle</th>
									<th>Sentiment</th>
									<th>Follower</th>
									<th>Following</th>
								</tr>
								{ tweetsRows }
							</tbody>
						</table>
						{ replyPopups }
					</div>
					<div className="clearfix">&nbsp;</div>
					<div className="row">
						<div className="col-md-2">
							<div className="select_detail">
								<div className="select-field">
									<select value={this.state.tweetsPerPage} onChange={this.handleTweetsPerPageChange.bind(this)}>
										<option value="5">5 per page</option>
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

		if (!_.isEqual(nextProps.bucketData, this.props.bucketData)) {
			this.state.tweetsTotal = nextProps.bucketData.tweets.length;
			this.state.pageNumber  = 0;
			this.calculateTweetNumbers();
			this.fillSelectedTweets();

			if (this.props.onSelectionChange) {
				this.props.onSelectionChange(this.state.selectedTweets);
			}
		}
	}

	calculateTweetNumbers () {
		this.state.startTweetNumber = this.state.tweetsPerPage * this.state.pageNumber;
		this.state.endTweetNumber   = ((this.state.tweetsPerPage * (this.state.pageNumber + 1)) > this.state.tweetsTotal)
								      ? this.state.tweetsTotal
								      : (this.state.tweetsPerPage * (this.state.pageNumber + 1));
		this.state.tweetsOnPage = this.state.endTweetNumber - this.state.startTweetNumber + 1;
	}

	fillSelectedTweets (value = false) {
		this.state.selectedTweets = new Array(this.state.tweetsTotal);
		// Assign value to all the checkboxes
		for (var i = 0; i < this.state.tweetsTotal; i++) {
			this.state.selectedTweets[i] = value;
		}
	}

	/* Events Handlers */

	handlePageChange (e) {
		this.state.pageNumber = parseInt(e.target.dataset.page);
		this.calculateTweetNumbers();
		this.setState({
			pageNumber : this.state.pageNumber
		});
	}

	handleTweetsPerPageChange (e) {
		this.state.tweetsPerPage = e.target.value;
		this.calculateTweetNumbers();
		this.setState({
			tweetsPerPage: this.state.tweetsPerPage
		});
	}

	factoryHandleReply (username) {
		return function (message) {
			console.log("DataTable.handleReply username = ", username, ", message = ", message);
			ActionsActionCreators.sendReply(username, message);
		}
	}

	handleCheckBoxClick (e) {
		this.state.selectedTweets[e.target.dataset.tweetNumber] = e.target.checked;
		if (this.props.onSelectionChange) {
			this.props.onSelectionChange(this.state.selectedTweets);
		}
		this.forceUpdate();
	}
	handleCheckAllClick (e) {
		this.fillSelectedTweets(e.target.checked);
		if (this.props.onSelectionChange) {
			this.props.onSelectionChange(this.state.selectedTweets);
		}
		this.forceUpdate();
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

DataTable.propTypes = {
	bucketData:        React.PropTypes.object.isRequired,
	onSelectionChange: React.PropTypes.func
};