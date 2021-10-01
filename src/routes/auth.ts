import { Router } from 'express'
import { AuthController } from '../controller/Authcontroller';

const router = Router()

//login
router.post('/login', AuthController.login)

export default router;