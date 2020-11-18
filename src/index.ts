//express (server stuff)
import "reflect-metadata";
import "dotenv-safe/config";
import express from "express";
import path = require("path");

//log all requests from front end
const morgan = require("morgan");

//typeorm (database connection)
import { createConnection } from "typeorm";

//entities (how information is stored within the database)
import Tweet from './entities/Tweet'
import User from './entities/User'

//routes (similar to how urls work)
const user = require("./routes/user");
const tweets = require("./routes/tweets");

//server/database initialization
const main = async () => {
  //connect to the database
  await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Tweet, User],
  });

  //setup server
  const app = express();

  //setup morgan
  app.use(morgan("dev"));

  //connect routes
  app.use("/api/v1/user", user);
  app.use("/api/v1/tweets", tweets);

  //if someome attempts to access a route that doesn't exist
  app.use((_, res: express.Response) => {
    res.status(404).json({ status: "404" });
  });

  //start server
  app.listen(process.env.PORT || 8081, () => {
    console.log(`🚀 Server started at http://localhost:${process.env.PORT}`);
  });
};

main();