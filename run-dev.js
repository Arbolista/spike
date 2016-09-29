import Server from "./server/config/development/page.server";

export default function(parameters)
{
	var server = new Server();
	server.run();
}