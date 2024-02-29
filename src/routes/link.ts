import {Router} from 'express'
import LinkControllers from '../controllers/link'


const linkRouter = Router()

linkRouter.post('/shorten', LinkControllers.create)


export default linkRouter