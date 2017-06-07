import axios from 'axios';

export function sendMessage(data){
	return dispatch => {
		return axios.post('/api/message', data);
	}
}