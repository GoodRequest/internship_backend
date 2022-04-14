import config from 'config'
import http from 'http'
import app from './app'
import sequelize from "./db";

const httpServer = http.createServer(app);
const serverConfig: {port: number} = config.get('server');

httpServer.listen(serverConfig.port).on('listening', () => {
	console.log(`Server successfully started at port: ${serverConfig.port}`);
});

sequelize.sync();