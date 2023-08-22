import express from 'express'
import contentType from '../middlewares/contentType.js'
import { create, login, logout, extend, getProfile, getCart, editCart } from '../controllers/users.js'
import * as auth from '../middlewares/auth.js'

const router = express.Router()

router.post('/', contentType('application/json'), create)
router.post('/login', contentType('application/json'), auth.login, login)
router.delete('/logout', auth.jwt, logout)
router.patch('/extend', auth.jwt, extend)
router.get('/me', auth.jwt, getProfile)
router.get('/cart', auth.jwt, getCart)
router.post('/cart', contentType('application/json'), auth.jwt, editCart)

export default router
