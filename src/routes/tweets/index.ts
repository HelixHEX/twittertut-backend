//express (server stuff)
import express from "express";

//router for routing routes
const router = express.Router();

//typeorm entities
import Tweet from "../../entities/Tweet";
import User from "../../entities/User";

//logged in funciton
import { isLoggedIn } from "../../utils/user";

//create tweets
router.get("/create", async (req: express.Request, res: express.Response) => {
  //query the variables from the front end
  const { query } = req;

  //get variables and convert to string
  const uuid = query.currentUser as string;
  const tweet = query.tweet as string;

  //check if user is logged in
  isLoggedIn(uuid, res);

  //try to create tweet
  try {
    //find user
    const user = await User.findOne({ where: { uuid } });

    //crete tweet and save in database
    const createdTweet = await Tweet.create({
      tweet: tweet,
      userUUID: uuid,
    }).save();

    //log that a tweet was created
    console.log(`${user?.username} tweeted - ${createdTweet.tweet}`);

    //return success to front end
    res.json({ success: "tweet created" }).status(200);
  } catch (err) {
    //log error
    console.log(err);

    //return error to front end
    res.json({ error: "error creating tweet" }).status(400);
  }
});

//display all tweets
router.get("/feed", async (req: express.Request, res: express.Response) => {
  //query the variables from the front end
  const { query } = req;

  //get variables and convert to string
  const uuid = query.currentUser as string;

  //check if user is logged in
  const isloggedin = await isLoggedIn(uuid, res);

  if (isloggedin) {
    // //retrieve tweets
    const tweets = await Tweet.find({ relations: ["creator"] });

    // //send tweets to frontend
    res.json({ success: true, tweets: tweets }).status(200);
  }
});

//view specific user tweets
router.get(
  "/usertweets",
  async (req: express.Request, res: express.Response) => {
    //query the variables from the front end
    const { query } = req;

    //get variables and convert to string
    const uuid = query.uuid as string;

    //check if user is logged in
    isLoggedIn(uuid, res);

    //retrieve tweets
    const user = await User.findOne({ relations: ["tweets"], where: { uuid } });
    if (!user) {
      res.json({ error: "unable to find user" }).status(404);
    }
    const tweets = user?.tweets;

    //return tweets to front end
    //github test
    res.json({ tweets: tweets }).json(200);
  }
);

//export the router variable so it's seeable to other files
module.exports = router;
