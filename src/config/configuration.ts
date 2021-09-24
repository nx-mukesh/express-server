import { config } from 'dotenv';
import { IConfig } from './IConfig';
config();
const version = require('../../package.json').version;
export const SwaggerURL = '/api-docs';

export const SwaggerSetup = {
	description: 'API with Swagger',
	title: 'Training-API',
};

const configuration: IConfig = Object.freeze({
	env: process.env.NODE_ENV,
	port: process.env.PORT,
	secret: process.env.TOKEN,
	mongoURL: process.env.MONGO_URL,
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			...SwaggerSetup,
			version,
		},
		servers: [{url: 'http://localhost:9000/api'}],
		components:{
			securitySchema:{
				bearerAuth: {
					type:"http",
					schema:'bearer',
					bearerFormat:"JWT",
				}
			}
		},
		security:[{
			bearerAuth:[]
		}],
	},
  swaggerUrl: SwaggerURL,
});

export default configuration;
