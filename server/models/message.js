import mongoose from 'mongoose';
import config from '../config/database';


const MessageSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	textCharCount: {
		type: Number,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now,
		required: true
	}	
});

export const Message = mongoose.model('Message', MessageSchema);

export function addMessageToDB(newMessage, callback){
	newMessage.save(callback);
}

export function getMessages(callback){
	Message.find(callback).sort({createdAt: -1});
}
