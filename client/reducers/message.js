import {SET_INITIAL_MESSAGES} from '../actions/types';

export default (state=[], action={}) => {
	switch(action.type){
		case SET_INITIAL_MESSAGES:
			return action.messagesArray
		default: return state;
	}
}