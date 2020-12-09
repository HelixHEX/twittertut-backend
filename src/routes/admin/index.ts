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
// router.post('/login',  (req: express.Request, res: express.Response) => {
//   console.log(req.body);
//   res.json({success: true}).status(200)
// });

router.post('/checklogin', async (req: express.Request, res: express.Response) => {
  //get data 
  const { body } = req;
  const {uuid} = body;
  console.log(body)
  // const user = await User.findOne({where: {uuid}})

  // if (!user) {
  //   res.json({success: false, error: "User Not Found"}).status
  // }

  // const verify = await argon2.verify(user!.uuid, uuid)
  // if(!verify) {
  //   res.json({success: false, error: "User Not Logged In"}).status(404);
  // }

  // res.json({success: true, uuid: user?.uuid, username: user?.username, name: user?.name}).status(200)
  res.json({success: true}).status(200);
})

router.post('/tweets', async (req: express.Request, res: express.Response) => {
  //get data
  const { body } = req;

  const { uuid, username} = body;

  //check if user is logged in 
  const user = await User.findOne({where: {username}});
  
  if (!user) {
    res.json({success: false, error: 'User Not Logged In'}).status(404);
    console.log('user not found')
  }
  //unhash uuid
  const verify = await argon2.verify(uuid, user!.uuid);
  if (!verify) {
    res.json({success: false, error: 'User Not Logged In'}).status(404);
    console.log('uuid not matched')
  }

  // const tweets = await Tweet.findAndCount({relations: ['creator']})
  // if (!tweets)
  try {
    const tweets = await Tweet.findAndCount({relations:['creator'] });
    console.log('tweets sent')
    res.json({success: true, tweets: tweets[0], tweetCount: tweets[1]}).status(200);
  } catch(err) {
    console.log(err)
    res.json({success: false, error: err}).status(400);
  }
  
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

  const users = await User.findAndCount({relations: ['tweets'], order: {createdAt: 'DESC'}})

  res.json({success: true, users: users[0], usercount: users[1]})
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
