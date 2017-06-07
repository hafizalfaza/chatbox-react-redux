import React from 'react';

class Message extends React.Component{
	render(){
		const {username, text} = this.props.message;
		return(
			
			<div>
				{username}: {text}
			</div>
		);
	}
}

export default Message;