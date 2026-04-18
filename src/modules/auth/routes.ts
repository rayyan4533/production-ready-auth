import { Router } from 'express'
import { controller } from '../auth/authcontroller.js'
import upload from '../../common/utils/multer.middleware.js'

const router: Router = Router()

router.post('/register', controller.register)

router.post('/login', controller.login)

router.post('/refresh', controller.refresh)

router.delete('/logout', controller.logout)

router.get("/verify-email/:token", controller.verifyEmail);
router.post(
  "/forgot-password",

  controller.forgotPassword,
);
router.put(
  "/reset-password",
  controller.resetPassword,
);

router.post("/upload-avatar",upload.single("avatar"),controller.uploadAvatar);



export default router;


