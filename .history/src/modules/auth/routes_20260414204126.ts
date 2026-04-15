import  {Router} from 'express'
import {controller} from '../auth/authcontroller.js'


const router = Router()


router.post('register',controller.register().bind)

router.post('login',controller.login().bind)

router.post('refresh',controller.refresh().bind)

router.delete('logout',controller.logout().bind)


