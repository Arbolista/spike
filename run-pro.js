import Server from "./server/config/production/server";

export default function(parameters)
{
	var server = new Server();
	server.run();
}