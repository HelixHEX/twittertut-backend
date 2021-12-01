//express (server stuff)
import "reflect-metadata";
import "dotenv-safe/config";
import express from "express";
import path = require("path");
//ranom comment
//another random comment
//log all requests from front end
const morgan = require("morgan");

//typeorm (database connection)
import { createConnection } from "typeorm";

//entities (how information is stored within the database)
import Tweet from "./entities/Tweet";
import User from "./entities/User";

//routes (similar to how urls work)
const user = require("./routes/user");
const tweets = require("./routes/tweets");
const admin = require("./routes/admin");
const test = require('./routes/test')

//cron
import cron from 'cron'

//fetch
import fetch from 'node-fetch'

//cors
const cors = require("cors");

//server/database initialization
const main = async () => {
  //connect to the database
  // await createConnection()
  // await createConnection({
  //   type: "postgres",
  //   url: process.env.DATABASE_URL,
  //   logging: false,
  //   synchronize: true,
  //   migrations: [path.join(__dirname, "./migrations/*")],
  //   entities: [Tweet, User],
  //   extra: { ssl: true, rejectUnauthorized: false },
  // });
  await createConnection({
    type: 'postgres',
    synchronize: true,
    logging: false,
    extra: {
      ssl: true,
    },
    url: process.env.DATABASE_URL,
    entities: [Tweet, User],
    // entities: ['dist/entity/*.*'],
  });

  //setup server
  const app = express();

  //setup morgan
  app.use(morgan("dev"));

  //json parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //headers config
  // app.use(function(req, res, next) {
  //   // res.header("Access-Control-Allow-Origin", "*");
  //   // res.header(
  //   //   "Access-Control-Allow-Headers",
  //   //   "Origin, X-Requested-With, Content-Type, Accept"
  //   // );
  //   // res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  //   // res.header("Access-Control-Allow-Credentials", true);
  //   if (req.method === "OPTIONS") {
  //     return res.sendStatus(204);
  //   }
  //   next();
  // });

  //cors
  app.use(cors())
  //connect routes
  app.get("/", (_, res: express.Response) => {
    res.json({ success: "hello world" }).status(200);
  });
  app.use("/api/v1/user", user);
  app.use("/api/v1/tweets", tweets);
  app.use("/api/v1/admin", admin);
  app.use('/test', test);

  //if someome attempts to access a route that doesn't exist
  app.use((_, res: express.Response) => {
    res.status(404).json({ status: "404" });
  });

  //cron job to keep sever alive on heroku
  // const cronJob = new cron.CronJob('0 */25 * * * *', () => {
  //   fetch('https://twitter-tut-backapp.herokuapp.com/')
  //     .then(res => console.log(`response-ok: ${res.ok}, status: ${res.status}`))
  //     .catch(error => console.log(error))
  // });

  // //start cron job
  // cronJob.start()

  //start server
  app.listen(process.env.PORT || 8081, () => {
    console.log(`🚀 Server started at http://localhost:${process.env.PORT}`);
  });
};

main();
