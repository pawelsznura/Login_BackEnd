import express from 'express'
import userCtrl from './user.controller.js'
import authCtrl from './auth.controller.js'

const router = express.Router()

router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create)

//router.route('/api/users/:userId')
//  .get(userCtrl.read)
//  .put(userCtrl.update)
//  .delete(userCtrl.remove)

router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

/// Leaving this one insecure for now...
router.route('/api/userbyname/:userName')
  .get(userCtrl.read)
  .put(userCtrl.update)
  .delete(userCtrl.remove)

  router.param('userId', userCtrl.userByID)
  router.param('userName', userCtrl.userByName)
  
export default router
