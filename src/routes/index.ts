import { Router } from 'express'

import auth from './auth'
import user from './user'
import news from './new'


const routes = Router();

routes.use('/auth', auth)
routes.use('/users', user)
routes.use('news', news )

export default routes;