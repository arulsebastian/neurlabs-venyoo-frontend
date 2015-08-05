/* JS dependencies */
import React from "react";
import ActionsActionCreators from "../actions/ActionsActionCreators";
import DialogBox from "./DialogBox";

/* Static dependencies */
import socialImg from '../../images/social_1.png';

export default class Actions extends React.Component {

	constructor (...args) {
		super(...args);

		this.state = {
			selectedTweets:      [],
			uniqueSelectedUsers: []
		};
	}

	render () {
		var tweetsAmount = this.state.selectedTweets.length;
		var usersAmount  = this.state.uniqueSelectedUsers.length;
		var tweetsModalProp = (tweetsAmount > 0) ? "modal" : "";
		var usersModalProp  = (usersAmount  > 0) ? "modal" : "";

		console.log("Actions.render state = ", this.state);

		return (
			<div className="duration_inner">
				<h2>Actions:</h2>
				<ul className="action_list">
					<li> <a href="#" data-toggle={ usersModalProp } data-target="#followSelected"> <i className="social_icon"><img src={ socialImg } alt="" /></i>
					<p>Follow</p>
					<span className="people">{ usersAmount } people</span> </a> </li>
					<li> <a href="#" data-toggle={ usersModalProp } data-target="#tweetToSelected"> <i className="social_icon"><img src={ socialImg } alt="" /></i>
					<p>Tweet to</p>
					<span className="people">{ usersAmount } people</span> </a> </li>
					<li> <a href="#" data-toggle={ tweetsModalProp } data-target="#favoriteSelected"> <i className="social_icon"><img src={ socialImg } alt="" /></i>
					<p>Favorite</p>
					<span className="people">{ tweetsAmount } tweets</span> </a> </li>
					<li> <a href="#" data-toggle={ usersModalProp } data-target="#directMessageToSelected"> <i className="social_icon"><img src={ socialImg } alt="" /></i>
					<p>Direct Message to</p>
					<span className="people">{ usersAmount } people</span> </a> </li>
					<li> <a href="#" data-toggle={ tweetsModalProp } data-target="#retweetSelected"> <i className="social_icon"><img src={ socialImg } alt="" /></i>
					<p>Retweet</p>
					<span className="people">{ tweetsAmount } tweets</span> </a> </li>
				</ul>
				<DialogBox id="followSelected"
						   isInput={ false }
						   actionName="Follow"
						   onAction={ this.handleFollowClick.bind(this) }>
					<h3>You’ve selected <span>{ usersAmount } users</span><br /><span className="reg_text">Are you sure you want to Follow all the users?</span></h3>
				</DialogBox>
				<DialogBox id="tweetToSelected"
						   isInput={ true }
						   actionName="Tweet"
						   onAction={ this.handleTweetClick.bind(this) }>
					<h3>You’ve selected <span>{ usersAmount } users</span><br /><span className="reg_text">Enter the message to Tweet To all the users:</span></h3>
				</DialogBox>
				<DialogBox id="favoriteSelected"
						   isInput={ false }
						   actionName="Favorite"
						   onAction={ this.handleFavoriteClick.bind(this) }>
					<h3>You’ve selected <span>{ tweetsAmount } tweets</span><br /><span className="reg_text">Are you sure you want to Favorite all the tweets?</span></h3>
				</DialogBox>
				<DialogBox id="directMessageToSelected"
						   isInput={ true }
						   actionName="Direct Message"
						   onAction={ this.handleDirectMessageClick.bind(this) }>
					<h3>You’ve selected <span>{ usersAmount } users</span><br /><span className="reg_text">Enter the message to Direct Message to all the users:</span></h3>
				</DialogBox>
				<DialogBox id="retweetSelected"
						   isInput={ false }
						   actionName="Retweet"
						   onAction={ this.handleRetweetClick.bind(this) }>
					<h3>You’ve selected <span>{ tweetsAmount } tweets</span><br /><span className="reg_text">Are you sure you want to Retweet all the tweets?</span></h3>
				</DialogBox>
			</div>
		);
	}

	componentWillReceiveProps (nextProps) {
		console.log("Actions.componentWillReceiveProps nextProps = ", nextProps);

		var uniqueSelectedUsers = [];
		var selectedTweets      = [];
		nextProps.bucketData.tweets.forEach(function (tweet, i) {
			if (nextProps.selectedTweetsNumbers[i]) {
				selectedTweets.push(tweet);
				if (uniqueSelectedUsers.indexOf(tweet.socialHandle) === -1) {
					uniqueSelectedUsers.push(tweet.socialHandle);
				}
			}
		});

		this.setState({
			selectedTweets:      selectedTweets,
			uniqueSelectedUsers: uniqueSelectedUsers
		});
	}

	/* Event Handlers */

	handleFollowClick () {
		ActionsActionCreators.sendFollow(this.state.selectedTweets[0].tweetId);
	}
	handleTweetClick (message) {
		ActionsActionCreators.sendTweet(this.state.selectedTweets[0].socialHandle, message);
	}
	handleFavoriteClick () {
		ActionsActionCreators.sendFavorite(this.state.selectedTweets[0].tweetId);
	}
	handleDirectMessageClick (message) {
		ActionsActionCreators.sendReply(this.state.selectedTweets[0].username, message);
	}
	handleRetweetClick () {
		ActionsActionCreators.sendRetweet(this.state.selectedTweets[0].tweetId);
	}

};

Actions.PropTypes = {
	bucketData:            React.PropTypes.object.isRequired,
	selectedTweetsNumbers: React.PropTypes.array.isRequired
}