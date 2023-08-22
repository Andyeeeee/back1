// 訂單次由有三個
// 使用者自己新增
// 使勇者取自己
// 管理員曲全部人訂單
import express from 'express'
import * as auth from '../middlewares/auth.js'
import admin from '../middlewares/admin.js'
import { create, get, getAll, edit } from '../controllers/orders.js'

const router = express.Router()

router.patch('/:id', auth.jwt, admin, edit)
router.post('/', auth.jwt, create)
router.get('/', auth.jwt, get)
router.get('/all', auth.jwt, admin, getAll)

export default router
