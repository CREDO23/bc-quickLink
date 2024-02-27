import {Router} from 'express'
import AuthService from '../services/auth'

const authRouter = Router()

authRouter.get('/signup', AuthService.signup)

export default authRouter