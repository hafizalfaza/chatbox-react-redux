import express from 'express';
import path from 'path';
import bodyParser from 'body-parser'; 

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';
import config from './config/database';
import message from './routes/message';
const connections = [];

const app = express();
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
	console.log('Connected to database '+ config.database);
});

mongoose.connection.on('error', (err) => {
	console.log('Database error: '+ err);
});

const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler, {
	hot: true,
	publicPath: webpackConfig.output.publicPath,
	noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.json());
app.use('/api/message', message);

const port = 3000;


app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, ('index.html')))
});

const server = app.listen(port, () => {
	console.log("Server running on port: "+ port);
});

const io = require('socket.io')(server);  

io.on('connection', (socket) => {
	
	connections.push(socket);
	console.log('We have %s connection', connections.length);
	
	
	socket.on('disconnect', () => {
		connections.splice(connections.indexOf(socket), 1);
		console.log('User disconnected, now we have %s connections', connections.length)
	});
});


