import React from "react";

export default class DialogBox extends React.Component {
	render () {
		return (
			<div key={ this.props.key } className="modal fade custommodal" id={ this.props.id } tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-body">
							<div className="entry_popup">
								{ this.props.title }
								<input type="text" name="" className="input_field" />
								<div className="button_block">
									<button className="direct_msg" onClick={ this.sendReply }>Reply</button>
										<button className="cancel_btn" data-dismiss="modal">Cancel</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

DialogBox.propTypes = {
	title: React.PropTypes.object.isRequired
}