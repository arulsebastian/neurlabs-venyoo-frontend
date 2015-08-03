import React from "react";

export default class DialogBox extends React.Component {
	constructor (...args) {
		super(...args);

		this.state = {
			message: ""
		};
	}

	render () {
		return (
			<div key={ this.props.key } className="modal fade custommodal" id={ this.props.id } tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-body">
							<div className="entry_popup">
								{ this.props.title }
								<input type="text" name="" className="input_field" value={ this.state.message } onChange={ this.handleMessageChange.bind(this) } />
								<div className="button_block">
									<button className="direct_msg" onClick={ this.handleReplyClick.bind(this) }>{ this.props.actionName }</button>
									<button className="cancel_btn" data-dismiss="modal">Cancel</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	handleMessageChange (e) {
		this.setState({
			message: e.target.value
		});
	}

	handleReplyClick (e) {
		console.log("DialogBox.handleReplyClick state.message = ", this.state.message);
		if (this.state.message !== "") {
			$("#" + this.props.id).modal("hide");
			if (this.props.onAction)
				this.props.onAction(this.state.message);
		}
	}
}

DialogBox.propTypes = {
	id:         React.PropTypes.string.isRequired,
	title:      React.PropTypes.object.isRequired,
	actionName: React.PropTypes.string.isRequired,
	onAction:   React.PropTypes.func
}