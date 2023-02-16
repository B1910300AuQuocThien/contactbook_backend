const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");

async function startServer() {
  try {
    await MongoDB.connect(config.db.uri);
    console.log("connect to the database");
    console.log(config.db.uri);
    const PORT = config.app.port;
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("cannot connect to the database \n", error);
    process.exit();
  }
}
startServer();
