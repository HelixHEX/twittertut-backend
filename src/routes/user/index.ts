//express (server stuff)
import express from "express";

//typeorm user entity
import User from "../../entities/User";

//router for routing routes
const router = express.Router();

//password hasher
import argon2 from "argon2";

//logged in funciton
import { isLoggedIn } from "../../utils/user";

//get current user route
router.get("/me", async (req: express.Request, res: express.Response) => {
  //query the variables from the front end
  const { query } = req;

  //get variables and convert to string
  const uuid = query.currentUser as string;

  //check if user is logged in
  isLoggedIn(uuid, res);

  //retrieve user
  const user = await User.findOne({ relations: ["tweets"], where: { uuid } });

  //if the user is not found
  if (!user) {
    res.json({ uuid: "user not found" }).status(404);
  }

  //return user to front end
  res.json({ user: user }).status(200);
});

//create new user route
router.get("/signup", async (req: express.Request, res: express.Response) => {
  //query the variables from the front end
  const { query } = req;

  //get variables and convert to string
  const name = query.name as string;
  const email = query.email as string;
  let username = query.username as string;
  const password = query.password as string;

  //convert username to lowercase
  username = username.toLowerCase();
  //hash the password
  const hashPw = await argon2.hash(password);

  //try to signup user
  try {
    //create user and save in databse
    const user = await User.create({
      name,
      email,
      username,
      password: hashPw,
    }).save();

    //log that a user has created an account
    console.log(`${user?.username} has created an account`);

    //send success back to front end
    res
      .json({
        success: true,
        uuid: user.uuid
      })
      .status(200);
  } catch (err) {
    //catch if there is an error
    //log error
    console.log(err);
    if (err.message.includes("duplicate")) {
      //check if email is duplicate
      if (err.detail.includes("email")) {
        res.json({success: false, error: "email" }).status(404);
      }

      //check if username is duplicate
      if (err.detail.includes("username")) {
        res.json({success: false, error: "username" }).status(404);
      }
    } else {
      //if it's not a duplicate error
      res.json({success: false, error: err.message }).status(400);
    }
  }
});

//user login route
router.get("/login", async (req: express.Request, res: express.Response) => {
  //query the variables from the front end
  const { query } = req;

  //get variables and convert to string
  let username = query.username as string;
  const password = query.password as string;

  //convert username to lowercase
  username = username.toLowerCase();

  //look for user
  const user = await User.findOne({
    where: { username },
    select: ["uuid", "username", "password"],
  });

  //if the user is not found
  if (!user) {
    res.json({ success: false, error: "Incorrect Username/Password" }).status(404);
  }

  //verify passowrd
  const verify = await argon2.verify(user!.password, password);

  //if the passwords don't match
  if (!verify) {
    res.json({ success: false, error: "Incorrect Username/Password" }).status(404);
  }

  //log user has logged in
  console.log(`${user?.username} has logged`);

  //send success
  res.json({ success: true, uuid: user?.uuid, name: user?.name }).status(200);
});

//view specific user profile
router.get("/user", async (req: express.Request, res: express.Response) => {
  //query the variables from the front end
  const { query } = req;

  //get variables and convert to string
  const uuid = query.uuid as string;

  //check if user is logged in
  isLoggedIn(uuid, res);
  //look for user
  const user = await User.findOne({ relations: ["tweets"], where: { uuid } });

  //if the user is not found
  if (!user) {
    //send error back to front end
    res.json({ error: "error loading user" }).status(400);
  }

  //send data back to front end
  res.json({ user: user }).status(200);
});

//export the router variable so it's seeable to other files
module.exports = router;
