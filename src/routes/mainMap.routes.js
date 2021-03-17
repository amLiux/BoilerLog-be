const express = require('express')

const indexRoutes = require ('./index.routes')
const adminRoutes = require ('./admin.routes')
const authRoutes = require ('./auth.routes')
const citasRoutes = require ('./citas.routes')

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.use(authRoutes)
router.use(adminRoutes)
router.use(indexRoutes)
router.use(citasRoutes)

module.exports = router
