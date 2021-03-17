import {Router} from 'express'

import indexRoutes from './index.routes'
import userRoutes from './users.routes'
import adminRoutes from './admin.routes'
import calendarRoutes from './calendar.routes'
import authRoutes from './auth.routes'

import bodyParser from 'body-parser'

const router = Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.use(calendarRoutes)
router.use(authRoutes)
router.use(adminRoutes)
router.use(userRoutes)
router.use(indexRoutes)

export default router
