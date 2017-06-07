import React from 'react';

class Message extends React.Component{
	render(){
		const {username, text} = this.props.message;
		return(
			<div>
				<div><span style={{fontWeight: 'bold', fontSize: 16}}>{username}</span>{"\n"}</div>
				<div className="well" style={{wordWrap: "break-word"}}>
					{text}
				</div>
			</div>
		);
	}
}

export default Message;