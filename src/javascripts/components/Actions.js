/* JS dependencies */
import React from "react";

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

		console.log("Actions.render state = ", this.state);

		return (
			<div className="duration_inner">
				<h2>Actions:</h2>
				<ul className="action_list">
					<li> <a href="#"> <i className="social_icon"><img src={ socialImg } alt="" /></i>
					<p>Follow</p>
					<span className="people">{ usersAmount } people</span> </a> </li>
					<li> <a href="#"> <i className="social_icon"><img src={ socialImg } alt="" /></i>
					<p>Tweet to</p>
					<span className="people">{ usersAmount } people</span> </a> </li>
					<li> <a href="#"> <i className="social_icon"><img src={ socialImg } alt="" /></i>
					<p>Favorite</p>
					<span className="people">{ tweetsAmount } tweets</span> </a> </li>
					<li> <a href="#"> <i className="social_icon"><img src={ socialImg } alt="" /></i>
					<p>Direct Message to</p>
					<span className="people">{ usersAmount } people</span> </a> </li>
					<li> <a href="#"> <i className="social_icon"><img src={ socialImg } alt="" /></i>
					<p>Retweet</p>
					<span className="people">{ tweetsAmount } tweets</span> </a> </li>
				</ul>
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
				if (uniqueSelectedUsers.indexOf(tweet.socialHandle) !== -1) {
					uniqueSelectedUsers.push(tweet.socialHandle);
				}
			}
		});

		this.setState({
			selectedTweets:      selectedTweets,
			uniqueSelectedUsers: uniqueSelectedUsers
		});
	}

};

Actions.PropTypes = {
	bucketData:            React.PropTypes.object.isRequired,
	selectedTweetsNumbers: React.PropTypes.array.isRequired
}