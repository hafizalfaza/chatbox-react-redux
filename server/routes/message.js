import express from 'express';
import {Message} from '../models/message';
import {addMessageToDB,getMessages} from '../models/message';
const router = express.Router();



router.get('/', (req, res) => {
	const newMessage = Message({
		username: req.body.username,
		text: req.body.message,
		textCharCount: req.body.textCharCount
	})
	
	getMessages((err, messages) => {
		if(err){
			res.status(500).json(err)
		}else{
			res.status(200).json({messages: messages});
		}
	});
	
});


router.post('/', (req, res) => {
	const newMessage = Message({
		username: req.body.username,
		text: req.body.message,
		textCharCount: req.body.textCharCount
	})
	
	addMessageToDB(newMessage, (err, message) => {
		if(err){
			res.status(500).json(err)
		}else{
			res.status(200).json(message)
		}
	});
	
});

export default router;