import React from 'react';
import {sendMessage} from '../actions/sendMessage';
import {fetchMessages} from '../actions/fetchMessages';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			chatUsername: '',
			chatMessage: '',
			usernameCharCount: 0,
			textCharCount: 0,
			errors: {},
			submitDisabled: true
		}
		this.onTypingUsername = this.onTypingUsername.bind(this);
		this.onTypingMessage = this.onTypingMessage.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	
	componentWillMount(){
		this.props.fetchMessages().then(
			(res) => console.log(res.data)
		);
	}
	
	onTypingMessage(e){
		const textCharCount = e.target.value.length;
		if(textCharCount<=140){
			this.setState({[e.target.name]: e.target.value, textCharCount: textCharCount})
				if(this.state.chatUsername!=''){
					this.setState({submitDisabled: false})
				}
		}
		if(textCharCount==0){
			this.setState({submitDisabled: true})
		}			
	}
	
	onTypingUsername(e){
		const usernameCharCount = e.target.value.length;
		if(usernameCharCount <= 25){
			this.setState({[e.target.name]: e.target.value, usernameCharCount: usernameCharCount})
			if(this.state.chatMessage!=''){
					this.setState({submitDisabled: false})
				}
		}
		if(usernameCharCount==0){
			this.setState({submitDisabled: true})
		}
	}
	
	onSubmit(e){
		const username = this.state.chatUsername;
		const message = this.state.chatMessage;
		const charCount = this.state.charCount;
		
		const data = {username: username, message: message, charCount: charCount}
		e.preventDefault();
		this.props.sendMessage(data);		
	}
	
	
	render(){
		const {textCharCount, error, submitDisabled} = this.state;
		return(
			<div className="container">
				<div className="col-md-4 col-md-offset-4">
					<form onSubmit={this.onSubmit}>
						<h1>Let's chat!</h1>
						<div className="form-group">
							<input 
								type="text" 
								name="chatUsername" 
								className="form-control" 
								placeholder="Type your name..." 
								value={this.state.chatUsername}
								onChange={this.onTypingUsername}
							/>
						</div>
						<div className="well" style={{height: 300, overflowY: "auto"}}>
						  <h4>Hello</h4>						
						</div>
						<div className="form-group">
							<input 
								type="text" 
								name="chatMessage" 
								className="form-control" 
								placeholder="Type your message..." 
								value={this.state.chatMessage}
								onChange={this.onTypingMessage}
							/>
						</div>
						{error && <span className="text-danger">{error}</span>}
						<div>
							<span className="text-danger">{textCharCount}/140</span>
							<button className="btn btn-primary btn-md pull-right" disabled={submitDisabled}>
								Send
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

App.propTYpes = {
	sendMessage: PropTypes.func.isRequired,
	fetchMessages: PropTypes.func.isRequired
}

export default connect(null, {sendMessage, fetchMessages})(App);