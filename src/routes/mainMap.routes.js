import {Router} from 'express'

import indexRoutes from './index.routes'
import proyectRoutes from './proyect.routes'
import todoRoutes from './todo.routes'
import userRoutes from './users.routes'
import adminRoutes from './admin.routes'
import bodyParser from 'body-parser'

const router = Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.use(adminRoutes)
router.use(userRoutes)
router.use(indexRoutes)
router.use(proyectRoutes)
router.use(todoRoutes)

export default router