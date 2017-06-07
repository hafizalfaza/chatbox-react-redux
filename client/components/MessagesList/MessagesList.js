import React from 'react';
import Message from './Message';
import RecentMessage from './RecentMessage';

class MessagesList extends React.Component{
	render(){
		const messages = this.props.messages.map(message => 
			<Message key={message._id} message={message} />
		);
		const recentMessages = this.props.recentMessages.map(recentMessage =>
			<RecentMessage key={recentMessage._id} recentMessage={recentMessage}/>
		)
		return(			
			<div>
				{recentMessages}
				{messages}
			</div>
		);
	}
}

export default MessagesList;