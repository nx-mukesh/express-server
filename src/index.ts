import config from "./config/configuration";
import Server from "./Server";

const server = new Server(config)
server.bootstrap()
server.run()


// console.log("hello world")