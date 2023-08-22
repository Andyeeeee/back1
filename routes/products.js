import express from 'express'
import * as auth from '../middlewares/auth.js'
import upload from '../middlewares/upload.js'
import admin from '../middlewares/admin.js'
import contentType from '../middlewares/contentType.js'
import { create, getAll, get, getId, edit } from '../controllers/products.js'

const router = express.Router()

router.post('/', auth.jwt, admin, contentType('multipart/form-data'), upload, create)
router.get('/all', auth.jwt, admin, getAll)
router.get('/', get)
router.get('/:id', getId)
router.patch('/:id', auth.jwt, admin, contentType('multipart/form-data'), upload, edit)

export default router
