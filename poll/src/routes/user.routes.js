import {Router} from "express"
import {registerUser , checkUsername} from "../controllers/user.controller.js"
const router = Router()

router.route('/register').post(registerUser)
router.route('/check-username').post(checkUsername)


// router.route('/login').post(loginUser)


//secured routes
// router.route('/logout').post(verifyJWT , logoutUser)
// router.route('/refreshyourtokens')
// .post(refreshAccessToken)

export default router