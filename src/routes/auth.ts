import {Router} from 'express'
import AuthControllers from '../controllers/auth'


const authRouter = Router()

authRouter.post('/signup', AuthControllers.signup)
authRouter.post('/signin', AuthControllers.signin)

export default authRouter