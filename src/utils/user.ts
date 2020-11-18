import express from 'express'
function isLoggedIn(isloggedin:string, uuid:string, res: express.Response) {
  if (isloggedin == "false" || uuid === '') {
    res.json({session: 'user not logged in'}).status(400)
  }

}

export {
  isLoggedIn
}