import AppServer from "./AppServer.js";

var server;

/**
 * Starts webserver to serve files from "/app" folder
 */
function init() {
  // Access command line parameters from start command (see package.json)
  let appDirectory = process.argv[2], // folder with client files
      //appPort = process.argv[3]; // port to use for serving static files
      appPort = process.env.PORT || process.argv[3];
  server = new AppServer(appDirectory);
  server.start(appPort);
}

init();