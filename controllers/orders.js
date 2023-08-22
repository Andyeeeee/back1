import orders from '../models/orders.js'
import users from '../models/users.js'
import { getMessageFromValidationError } from '../utils/error.js'
import { StatusCodes } from 'http-status-codes'

export const create = async (req, res) => {
  try {
    // 檢查購物車是不是空的
    if (req.user.cart.length === 0) {
      throw new Error('EMPTY')
    }
    // 檢查是否有下架商品
    const user = await users.findById(req.user._id, 'cart').populate('cart.product')
    const canCheckout = user.cart.every(cart => cart.product.sell)
    if (!canCheckout) {
      throw new Error('SELL')
    }
    // 建立訂單
    await orders.create({
      user: req.user._id,
      cart: req.user.cart
    })
    // 清空購物車
    req.user.cart = []
    await req.user.save()
    res.status(StatusCodes.OK).json({
      success: true,
      message: ''
    })
  } catch (error) {
    if (error.message === 'EMPTY') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: '購物車為空'
      })
    } else if (error.message === 'SELL') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: '包含下架商品'
      })
    } else if (error.name === 'ValidationError') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: getMessageFromValidationError(error)
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '發生錯誤'
      })
    }
  }
}

export const get = async (req, res) => {
  try {
    const result = await orders.find({ user: req.user._id }).populate('cart.product')
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '發生錯誤'
    })
  }
}

export const getAll = async (req, res) => {
  try {
    const result = await orders.find().populate('cart.product').populate('user', 'account')
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '發生錯誤'
    })
  }
}

export const edit = async (req, res) => {
  try {
    const result = await orders.findByIdAndUpdate(req.params.id, {
      status: req.body.status
    }
    )
    if (!result) {
      throw new Error('NOT FOUND')
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: getMessageFromValidationError(error)
      })
    } else if (error.name === 'CastError') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: '格式錯誤'
      })
    } else if (error.message === 'NOT FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: '找不到'
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '發生錯誤'
      })
    }
  }
}
