import {Router} from 'express'
import AuthControllers from '../controllers/auth'


const authRouter = Router()

authRouter.post('/signup', AuthControllers.signup)

export default authRouter