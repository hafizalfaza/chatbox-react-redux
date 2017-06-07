import React from 'react';
import {sendMessage} from '../actions/sendMessage';
import {fetchMessages, updateMessages} from '../actions/fetchMessages';
import {setInitialMessages} from '../actions/fetchMessages';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MessagesList from './MessagesList/MessagesList'; 
import io from 'socket.io-client';

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			chatUsername: '',
			chatMessage: '',
			usernameCharCount: 0,
			textCharCount: 0,
			errors: {},
			submitDisabled: true,
			recentMessages: [],
			socket: window.io('http://localhost:3000')
		}
		this.onTypingUsername = this.onTypingUsername.bind(this);
		this.onTypingMessage = this.onTypingMessage.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	
	componentWillMount(){
		this.props.fetchMessages().then(
			(res) => {
				this.props.setInitialMessages(res.data.messages)
			},
			(err) => console.log(err.response.data)
		);
	}
	
	
	componentDidMount(){
		this.state.socket.on('receive-message', (message) => {
			this.setState({recentMessages: this.state.recentMessages.concat(message)});
			console.log(this.state.recentMessages);
		});		
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
		const textCharCount = this.state.textCharCount;
		
		const data = {username: username, message: message, textCharCount: textCharCount}
		e.preventDefault();
		this.props.sendMessage(data).then(
			(res) => {
				this.state.socket.emit('new-message', res.data.message)
				this.setState({chatMessage: '', charCount: 0})
			},
			(err) => console.log(err.response.data)
		);
	}
	
	
	render(){
		const {textCharCount, error, submitDisabled, recentMessages} = this.state;
		const {messages} = this.props;
		return(
			<div className="container">
				<div className="col-lg-4 col-lg-offset-4">
					<form onSubmit={this.onSubmit}>
						<h1>Chatbox</h1>
						<h3>Let's chat!</h3>
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
						<div className="well" style={{height: 360, overflowY: "auto"}}>
						  <MessagesList messages={messages} recentMessages={recentMessages}/>					
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
	fetchMessages: PropTypes.func.isRequired,
	setInitialMessages: PropTypes.func.isRequired,
	updateMessages: PropTypes.func.isRequired,
}

function mapStateToProps(state){
	return {
		messages: state.message
	}
}

export default connect(mapStateToProps, {sendMessage, fetchMessages, setInitialMessages, updateMessages})(App);