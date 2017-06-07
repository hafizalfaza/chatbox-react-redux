import axios from 'axios';

export function fetchMessages(){
	return dispatch => {
		return axios.get('/api/message')
	}
}