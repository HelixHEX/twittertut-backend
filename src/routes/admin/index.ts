//express stuff
import express from 'express'


//setup routes
const router = express.Router();

//define routes
router.post('/login', (req: express.Request, res: express.Response) => {
  res.send("hi")
})

module.exports = router