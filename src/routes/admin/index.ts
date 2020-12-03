//express stuff
import express from "express";

//entities
import User from "../../entities/User";
import Tweet from "../../entities/Tweet";

//argon2
import argon2 from 'argon2'

//setup routes
const router = express.Router();

//define routes
router.post("/login", async (req: express.Request, res: express.Response) => {
  //get data
  const { body } = req;
  const { username, password } = body.values;

  //attempt to log user in
  try {
    const user2 = await User.findOne({
      where: {username}
    })
    user2!.role = 'admin'
    user2!.save()
    console.log(user2)
    const user = await User.findOne({
      where: {
        username,
        role: 'admin'
      },
      select: ["uuid", "username", "password", "name", "role"]
    });
    
    //add admin user role

    //if no user is found
    if(!user) {
      res.json({success: false, error: "Incorrect Username/Password"}).status(404);
    }

    //if passwords dont match
    const verify = await argon2.verify(user!.password, password);
    if(!verify) {
      res.json({success: false, error: "Incorrect Username/Password"}).status(404);
    }

    //send success if no errors
    //hash uuid
    const hashUUID = await argon2.hash(user!.uuid)
    res.json({success: true, uuid: hashUUID, name: user?.name, username: user?.username}).status(200);
    
  } catch (err) {
    res.json({success: false, error: err}).status(404);
  }
});

router.post('/tweets', async (req: express.Request, res: express.Response) => {
  //get data
  const { body } = req;

  const { uuid, username} = body;

  //check if user is logged in 
  const user = await User.findOne({where: {username}});
  
  if (!user) {
    res.json({success: false, error: 'User Not Logged In'}).status(404);
  }
  //unhash uuid
  const verify = await argon2.verify(uuid, user!.uuid);
  if (!verify) {
    res.json({success: false, error: 'User Not Logged In'}).status(404);
  }

  const tweets = await Tweet.findAndCount({relations: ['creator']})

  res.json({success: true, tweets: tweets[0], tweetCount: tweets[1]})
})

router.post('/users', async (req: express.Request, res: express.Response) => {
  //get data
  const { body } = req;

  const { uuid, username} = body;

  //check if user is logged in 
  const user = await User.findOne({where: {username}});
  
  if (!user) {
    res.json({success: false, error: 'User Not Logged In'}).status(404);
  }
  //unhash uuid
  const verify = await argon2.verify(uuid, user!.uuid);
  if (!verify) {
    res.json({success: false, error: 'User Not Logged In'}).status(404);
  }

  const tweets = await User.findAndCount({relations: ['tweets']})

  res.json({success: true, users: tweets[0], usercount: tweets[1]})
})

router.post('/deletetweet', async (req: express.Request, res: express.Response) => {
  //get data
  const { body } = req;

  const { uuid, username, tweetuuid } = body;

  //check if user is logged in 
  const user = await User.findOne({where: {username}});
  
  if (!user) {
    res.json({success: false, error: 'User Not Logged In'}).status(404);
  }
  //unhash uuid
  const verify = await argon2.verify(uuid, user!.uuid);
  if (!verify) {
    res.json({success: false, error: 'User Not Logged In'}).status(404);
  }

  //delete tweet
  const tweet = await Tweet.findOne({where: {uuid: tweetuuid}})

  if(!tweet) {
    res.json({success: false, error: "Tweet Not Found"}).status(404);
  }
  
   tweet?.remove()
   tweet?.save()

  //get all tweets

  const tweets = await Tweet.findAndCount({relations: ['creator']})
  const users = await User.findAndCount({relations: ['tweets']});
  // console.log(tweets)
  res.json({success: true, tweets: tweets[0], tweetcount: tweets[1], users: users[0], usercount: users[1]})
})

module.exports = router;
