import axios from 'axios';
import {SET_INITIAL_MESSAGES} from './types';


export function updateMessages(){
	return dispatch => {
		dispatch(fetchMessages())
		.then(res => dispatch(setInitialMessages(res.data.messages)))
	}
}


export function fetchMessages(){
	return dispatch => {
		return axios.get('/api/message')
	}
}

export function setInitialMessages(messagesArray){
	return {
		type: SET_INITIAL_MESSAGES,
		messagesArray
	}
}