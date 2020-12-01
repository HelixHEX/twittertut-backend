import express from 'express'
import User from '../entities/User'
const isLoggedIn = async (uuid:string, res: express.Response) => {
  console.log(uuid)
  if (uuid == undefined || uuid == "") {
    return res.json({session: 'user not logged in'}).status(400)
  } else {
    const user = await User.findOne({where: {uuid}})
    if (!user) {
      return res.json({session: 'user not logged in'}).status(400)
    } else {
      return true
    }
  }
}

export {
  isLoggedIn
}