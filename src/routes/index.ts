import {Router} from 'express'
import { redirect } from '../controllers'


const router = Router()

router.get('/:maker', redirect)

export default router