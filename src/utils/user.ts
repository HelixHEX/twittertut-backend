import express from 'express'
import User from '../entities/User'

var onlineusers = [] as any

const isLoggedIn = async (uuid:string, res: express.Response) => {
  console.log(uuid)
  if (uuid == undefined || uuid == "") {
    return res.json({success: false, error: 'user not logged in'}).status(400)
  } else {
    const user = await User.findOne({where: {uuid}})
    if (user) {
      return true
    } else {
      return res.json({success: false, error: 'user not logged in'}).status(400)
    }
  }
}

const getusers = () => {
  return onlineusers.length
}

const adduser = (uuid: string) => {
  const check = checkuser(uuid);
  if(!check) {
    onlineusers.push(uuid);
    return true;
  } else {
    return false;
  }
}

const checkuser = (uuid: string) => {
  for(var i=0; i<onlineusers.length; i++) {
    if (onlineusers[i] === uuid) {
      return true;
    }
  }
  return false;
}

const removeuser = (uuid: string) => {
  const check = checkuser(uuid);
  if (check) {
    for(var i=0; i<onlineusers.length; i++) {
      if(onlineusers[i] === uuid) {
        onlineusers.splice(i, 1);
        return true;
      }
    }
  }
  return false
}

export {
  isLoggedIn,
  adduser,
  checkuser,
  removeuser,
  getusers
}