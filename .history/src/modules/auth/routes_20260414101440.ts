import  {Router} from 'express'
import controller from '../auth/authcontroller.js'


const router = Router()


router.post('register',controller.register().bind)