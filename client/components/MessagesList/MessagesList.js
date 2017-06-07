import React from 'react';
import Message from './Message';

class MessagesList extends React.Component{
	render(){
		const messages = this.props.messages.map(message => 
			<Message key={message._id} message={message} />
		);
		return(			
			<div>
				{messages}
			</div>
		);
	}
}

export default MessagesList;