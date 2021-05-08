const express = require('express')

const indexRoutes = require ('./index.routes')
const authRoutes = require ('./auth.routes')
const citasRoutes = require ('./citas.routes')
const pacientesRoutes = require ('./pacientes.routes')
const filesRoutes = require ('./files.routes')
const reportesRoutes = require ('./reportes.routes')

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.use(authRoutes)
router.use(indexRoutes)
router.use(citasRoutes)
router.use(pacientesRoutes)
router.use(filesRoutes)
router.use(reportesRoutes)


module.exports = router
